"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Building2, Globe, Twitter } from "lucide-react"

interface AddStartupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStartupDialog({ open, onOpenChange }: AddStartupDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    twitter_handle: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend API
    console.log("Adding startup:", formData)

    // Reset form and close dialog
    setFormData({ name: "", website: "", twitter_handle: "" })
    onOpenChange(false)

    // Show success message (you could use a toast here)
    alert("Startup added successfully!")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Add New Startup</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a startup to your tracking dashboard. We'll start monitoring their funding, news, and social activity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                placeholder="e.g., Stripe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium text-gray-700">
              Website
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="website"
                placeholder="e.g., stripe.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="text-sm font-medium text-gray-700">
              Twitter Handle (Optional)
            </Label>
            <div className="relative">
              <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="twitter"
                placeholder="e.g., @stripe"
                value={formData.twitter_handle}
                onChange={(e) => handleInputChange("twitter_handle", e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white">
              Add Startup
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
