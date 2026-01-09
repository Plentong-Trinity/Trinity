"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink } from "lucide-react"
import type { DocumentSource } from "@/lib/document-data-with-github-fallbacks"

const PDFViewer = dynamic(() => import("@/components/pdf-viewer").then((m) => m.PDFViewer), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center p-8 text-muted-foreground">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading PDF viewer...</p>
      </div>
    </div>
  ),
})

interface PDFViewerModalProps {
  isOpen: boolean
  onClose: () => void
  doc: DocumentSource | null
}

export function PDFViewerModal({ isOpen, onClose, doc }: PDFViewerModalProps) {
  // Lock body scroll when modal is open (mobile fix)
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    const originalViewportContent = viewport ? viewport.getAttribute("content") : "width=device-width, initial-scale=1"

    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Prevent viewport changes on mobile
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no")
      }
    } else {
      document.body.style.overflow = "unset"
      // Restore normal viewport behavior
      if (viewport) {
        viewport.setAttribute("content", originalViewportContent || "width=device-width, initial-scale=1")
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
      if (viewport) {
        viewport.setAttribute("content", originalViewportContent || "width=device-width, initial-scale=1")
      }
    }
  }, [isOpen])

  if (!doc) return null

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Only allow closing, not opening
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent
        className="max-w-7xl w-[98vw] h-[95vh] md:w-[95vw] md:h-[90vh] p-0 gap-0 flex flex-col fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        onPointerDownOutside={(e) => {
          // Prevent accidental closing on mobile
          e.preventDefault()
        }}
      >
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 rounded-full h-9 w-9 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>

        {/* Header with larger close button for mobile */}
        <DialogHeader className="p-3 md:p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-10">
              <DialogTitle className="truncate text-sm md:text-base">{doc.title}</DialogTitle>
              {doc.author && <DialogDescription className="text-xs md:text-sm">by {doc.author}</DialogDescription>}
              <DialogDescription className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                Click the <ExternalLink className="h-3 w-3 inline-block flex-shrink-0" /> button in the viewer to open
                the original IPFS link.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* PDF Viewer Container */}
        <div className="flex-1 min-h-0 relative">
          <PDFViewer
            ipfsHash={doc.ipfsHash}
            filename={doc.filename}
            title={doc.title}
            author={doc.author}
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
