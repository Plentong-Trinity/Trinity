"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, Copy, Check } from "lucide-react"

export function PinterestImageUploader() {
  const [imageUrl, setImageUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const suggestedServices = [
    {
      name: "Imgur",
      url: "https://imgur.com/upload",
      description: "Free image hosting, works well with Pinterest",
    },
    {
      name: "Postimages",
      url: "https://postimages.org/",
      description: "Free image hosting with direct links",
    },
    {
      name: "ImageBB",
      url: "https://imgbb.com/",
      description: "Free image hosting service",
    },
  ]

  const testPinterestUrl = imageUrl
    ? `https://pinterest.com/pin/create/button/?url=${encodeURIComponent("https://historictruth.org")}&description=${encodeURIComponent("Test - Immutable Archive | Historical documents at historictruth.org")}&media=${encodeURIComponent(imageUrl)}`
    : ""

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pinterest Image Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Step 1: Upload Immutable Logo</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload the Immutable logo to a reliable image hosting service:
          </p>
          <div className="grid gap-3">
            {suggestedServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={service.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Upload
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Step 2: Enter Image URL</h3>
          <div className="space-y-2">
            <Label htmlFor="image-url">Direct Image URL</Label>
            <Input
              id="image-url"
              placeholder="https://i.imgur.com/your-image.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Make sure this is a direct link to the image file (ends with .png, .jpg, etc.)
            </p>
          </div>
        </div>

        {imageUrl && (
          <div>
            <h3 className="font-semibold mb-3">Step 3: Test Pinterest Share</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Generated Pinterest URL:</p>
                <p className="text-xs break-all font-mono">{testPinterestUrl}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(imageUrl)} className="flex-1">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Image URL
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <a href={testPinterestUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test Pinterest
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tips:</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Use images at least 600x600px for best Pinterest display</li>
            <li>• Ensure the image URL is publicly accessible (no login required)</li>
            <li>• Test the direct image URL in a new browser tab first</li>
            <li>• Once working, update the social-share.tsx component with your URL</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
