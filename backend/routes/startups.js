const express = require('express');
const { supabase } = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all startups (public data)
router.get('/', async (req, res) => {
  try {
    const { data: startups, error } = await supabase
      .from('startups')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching startups:', error);
      return res.status(500).json({ error: 'Failed to fetch startups' });
    }

    res.json({ startups });
  } catch (error) {
    console.error('Startups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get startup by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: startup, error } = await supabase
      .from('startups')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    res.json({ startup });
  } catch (error) {
    console.error('Startup detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's tracked startups
router.get('/tracked/list', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: trackedStartups, error } = await supabase
      .from('user_startups')
      .select(`
        startup_id,
        startups (
          id,
          name,
          description,
          industry,
          founded_year,
          funding_total,
          last_funding_round,
          last_funding_date,
          twitter_handle,
          website
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching tracked startups:', error);
      return res.status(500).json({ error: 'Failed to fetch tracked startups' });
    }

    const startups = trackedStartups.map(item => item.startups);
    res.json({ startups });
  } catch (error) {
    console.error('Tracked startups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Track a startup
router.post('/track/:startupId', authenticateToken, async (req, res) => {
  try {
    const { startupId } = req.params;
    const userId = req.user.id;

    // Check if startup exists
    const { data: startup, error: startupError } = await supabase
      .from('startups')
      .select('id')
      .eq('id', startupId)
      .single();

    if (startupError || !startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    // Check if already tracked
    const { data: existing, error: checkError } = await supabase
      .from('user_startups')
      .select('id')
      .eq('user_id', userId)
      .eq('startup_id', startupId)
      .single();

    if (existing) {
      return res.status(400).json({ error: 'Startup already tracked' });
    }

    // Add to tracked startups
    const { error: insertError } = await supabase
      .from('user_startups')
      .insert([
        {
          user_id: userId,
          startup_id: startupId,
          tracked_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Error tracking startup:', insertError);
      return res.status(500).json({ error: 'Failed to track startup' });
    }

    res.json({ message: 'Startup tracked successfully' });
  } catch (error) {
    console.error('Track startup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Untrack a startup
router.delete('/track/:startupId', authenticateToken, async (req, res) => {
  try {
    const { startupId } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
      .from('user_startups')
      .delete()
      .eq('user_id', userId)
      .eq('startup_id', startupId);

    if (error) {
      console.error('Error untracking startup:', error);
      return res.status(500).json({ error: 'Failed to untrack startup' });
    }

    res.json({ message: 'Startup untracked successfully' });
  } catch (error) {
    console.error('Untrack startup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get startup metrics (funding, social, news)
router.get('/:id/metrics', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get funding data
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_rounds')
      .select('*')
      .eq('startup_id', id)
      .order('date', { ascending: false });

    // Get social media data
    const { data: socialData, error: socialError } = await supabase
      .from('social_metrics')
      .select('*')
      .eq('startup_id', id)
      .order('date', { ascending: false })
      .limit(30);

    // Get news mentions
    const { data: newsData, error: newsError } = await supabase
      .from('news_mentions')
      .select('*')
      .eq('startup_id', id)
      .order('published_date', { ascending: false })
      .limit(20);

    const metrics = {
      funding: fundingData || [],
      social: socialData || [],
      news: newsData || []
    };

    res.json({ metrics });
  } catch (error) {
    console.error('Startup metrics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 