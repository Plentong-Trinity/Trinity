"use client"

import { useState } from "react"
import { Share2, Twitter, Facebook, LinkIcon, Check, Smartphone } from "lucide-react"

interface SocialShareProps {
  title: string
  description: string
  url: string
  hashtags?: string[]
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function SocialShare({
  title,
  description,
  url,
  hashtags = [],
  size = "sm",
  variant = "outline",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  // Shorten title if too long for social platforms
  const shortTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title

  // Create shorter messages for different platforms
  const createShareMessage = (platform: string) => {
    switch (platform) {
      case "x":
        // Twitter/X has 280 char limit, need room for hashtags and URL
        return `${shortTitle} | historictruth.org`
      case "facebook":
        return `${shortTitle} - Get more documents at historictruth.org`
      case "sms":
        return `${shortTitle} | IPFS: ${url} | historictruth.org`
      default:
        return `${shortTitle} | historictruth.org`
    }
  }

  const shareUrls = {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(createShareMessage("x"))}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(",")}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(createShareMessage("facebook"))}`,
    sms: `sms:&body=${encodeURIComponent(createShareMessage("sms"))}`,
  }

  const allPlatforms = [
    {
      name: "X",
      icon: Twitter,
      color: "hover:bg-slate-100 dark:hover:bg-slate-800",
      iconColor: "text-slate-700 dark:text-slate-300",
      url: shareUrls.x,
      priority: 1,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      url: shareUrls.facebook,
      priority: 2,
    },
    {
      name: "SMS",
      icon: Smartphone,
      color: "hover:bg-green-100 dark:hover:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      url: shareUrls.sms,
      priority: 3,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Failed to copy: ", err)
      // Fallback for older browsers or insecure contexts
      const textArea = document.createElement("textarea")
      textArea.value = url
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch (copyErr) {
        console.error("Fallback copy failed:", copyErr)
        alert("Failed to copy link. Please copy it manually.")
      }
      document.body.removeChild(textArea)
    }
  }

  const handleShare = (platform: (typeof allPlatforms)[0]) => {
    if (platform.name === "SMS") {
      window.location.href = platform.url // SMS intent
      return
    }
    // For other platforms, open a new window
    window.open(platform.url, "share-dialog", "width=600,height=450,resizable=yes,scrollbars=yes")
  }

  return (
    <div className="w-full">
      {/* Share Document Header - Now just text */}
      <div className="flex items-center justify-center mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Share2 className="h-4 w-4 text-primary" />
          <span>Share Document</span>
        </div>
      </div>

      {/* Social Share Icons */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {allPlatforms.map((platform, index) => {
            const IconComponent = platform.icon
            return (
              <button
                key={platform.name}
                onClick={() => handleShare(platform)}
                className={`
                  platform-button group relative flex flex-col items-center justify-center
                  p-2 rounded-lg border border-border/30 
                  transition-all duration-200 transform hover:scale-105 active:scale-95
                  ${platform.color} hover:border-primary/40 hover:shadow-md
                  bg-background/70 backdrop-blur-sm
                  min-h-[55px] sm:min-h-[60px]
                `}
                title={`Share on ${platform.name}`}
                style={{ animationDelay: `${index * 40}ms` }} // Staggered animation
              >
                <IconComponent
                  className={`
                    h-5 w-5 sm:h-5 
                    ${platform.iconColor} 
                    transition-all duration-200 group-hover:scale-110
                  `}
                />
                <span
                  className="
                    text-xs font-medium mt-1 text-center
                    text-muted-foreground group-hover:text-foreground 
                    transition-colors duration-200
                  "
                >
                  {platform.name}
                </span>
              </button>
            )
          })}
        </div>

        <div className="border-t border-border/40 pt-3">
          <button
            onClick={copyToClipboard}
            className={`
              w-full flex items-center justify-center gap-2 
              p-2.5 rounded-lg border border-border/30
              transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
              bg-background/70 backdrop-blur-sm
              ${
                copied
                  ? "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600 shadow-sm"
                  : "hover:bg-muted/40 hover:border-primary/50"
              }
            `}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Link Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span className="text-sm font-medium text-foreground">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
