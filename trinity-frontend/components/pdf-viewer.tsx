"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, ExternalLink, AlertCircle } from "lucide-react"
import { useIPFSGateway } from "@/hooks/use-ipfs-gateway"

interface PDFViewerProps {
  ipfsHash: string | null
  filename: string | null
  title: string
  author?: string
  className?: string
}

export function PDFViewer({ ipfsHash, filename, title, author, className }: PDFViewerProps) {
  const [retryTrigger, setRetryTrigger] = useState(0)

  const {
    currentUrl,
    isLoading: gatewayLoading,
    error: gatewayError,
    statusMessage,
  } = useIPFSGateway(ipfsHash, filename, retryTrigger)

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                           */
  /* ------------------------------------------------------------------ */
  const handleRetry = () => setRetryTrigger((p) => p + 1)
  const downloadPDF = () => currentUrl && window.open(currentUrl, "_blank", "noopener,noreferrer")

  /* ------------------------------------------------------------------ */
  /*  Error state                                                       */
  /* ------------------------------------------------------------------ */
  if (gatewayError && !currentUrl) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Unable to Load Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{gatewayError}</AlertDescription>
            </Alert>
            <Button variant="outline" onClick={handleRetry} className="w-full bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry All Connections
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  Loading overlay                                                   */
  /* ------------------------------------------------------------------ */
  const LoadingOverlay = () => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="text-center max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border">
        <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
        <h3 className="text-lg font-semibold mb-2">Loading Document</h3>
        <p className="text-muted-foreground mb-4">{statusMessage}</p>
        <div className="bg-muted p-3 rounded-md mb-4">
          <p className="text-sm font-medium text-foreground">📋 Please wait for loading to complete</p>
          <p className="text-xs text-muted-foreground mt-1">
            We're connecting to IPFS gateways to retrieve your document. This may take 30-60 seconds.
          </p>
        </div>
        <Progress value={null} className="w-full h-2" />
      </div>
    </div>
  )

  /* ------------------------------------------------------------------ */
  /*  Document ready notification                                       */
  /* ------------------------------------------------------------------ */
  const DocumentReadyNotification = () => (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3 shadow-lg animate-bounce">
      <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-sm font-medium">Document ready! Click the button above to open ↗️</p>
      </div>
    </div>
  )

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className={`relative h-full w-full flex flex-col ${className}`}>
      <header className="flex-shrink-0 p-2 border-b flex items-center justify-between gap-2 bg-background relative">
        <div className="truncate">
          <span className="font-medium">{title}</span>
          {author && (
            <span className="text-muted-foreground text-sm ml-2 truncate" title={author}>
              by {author}
            </span>
          )}
        </div>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={downloadPDF}
            disabled={!currentUrl}
            className={`transition-all duration-300 ${
              currentUrl && !gatewayLoading
                ? "animate-pulse bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
                : ""
            }`}
            title={currentUrl ? "Click to open document in new tab" : "Loading..."}
          >
            <ExternalLink
              className={`h-4 w-4 ${currentUrl && !gatewayLoading ? "text-green-600 dark:text-green-400" : ""}`}
            />
          </Button>
          {currentUrl && !gatewayLoading && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          )}
        </div>
      </header>

      <div className="flex-1 relative bg-muted">
        {gatewayLoading && <LoadingOverlay />}

        {currentUrl && !gatewayLoading && <DocumentReadyNotification />}

        {currentUrl && (
          /* 100%-sized iframe so the browser renders the PDF natively */
          <iframe
            src={currentUrl}
            title={title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
      </div>
    </div>
  )
}
