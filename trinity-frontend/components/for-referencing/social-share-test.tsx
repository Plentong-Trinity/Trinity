"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react"

export function SocialShareTest() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  const immutableLogoUrl = "https://immutable.vercel.app/immutable_logo.png"
  const testTitle = "Test Document - Foxe's Book of Martyrs"
  const testUrl =
    "https://bafybeiegu5fp3pb7qz65hxffvk5vltdizn23qdpktyf3avmenmbvkrymmm.ipfs.w3s.link/?filename=Foxes-Book-Of-Martyrs.pdf"

  const testPinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(testUrl)}&description=${encodeURIComponent(`${testTitle} | More at historictruth.org`)}&media=${encodeURIComponent(immutableLogoUrl)}`

  const testImageLoad = async () => {
    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      return new Promise((resolve) => {
        img.onload = () => {
          setTestResults((prev) => ({ ...prev, imageLoad: true }))
          resolve(true)
        }
        img.onerror = () => {
          setTestResults((prev) => ({ ...prev, imageLoad: false }))
          resolve(false)
        }
        img.src = immutableLogoUrl
      })
    } catch (error) {
      setTestResults((prev) => ({ ...prev, imageLoad: false }))
      return false
    }
  }

  const testUrlEncoding = () => {
    try {
      const encodedUrl = encodeURIComponent(testUrl)
      const encodedDescription = encodeURIComponent(`${testTitle} | More at historictruth.org`)
      const encodedMedia = encodeURIComponent(immutableLogoUrl)

      const isValid = encodedUrl && encodedDescription && encodedMedia
      setTestResults((prev) => ({ ...prev, urlEncoding: isValid }))
      return isValid
    } catch (error) {
      setTestResults((prev) => ({ ...prev, urlEncoding: false }))
      return false
    }
  }

  const runAllTests = async () => {
    await testImageLoad()
    testUrlEncoding()
  }

  const openPinterestTest = () => {
    window.open(testPinterestUrl, "pinterest-test", "width=600,height=450,resizable=yes,scrollbars=yes")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pinterest Sharing Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Test Parameters:</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Logo URL:</strong> {immutableLogoUrl}
            </p>
            <p>
              <strong>Test Document:</strong> {testTitle}
            </p>
            <p>
              <strong>Generated Pinterest URL:</strong>
            </p>
            <div className="bg-muted p-2 rounded text-xs break-all">{testPinterestUrl}</div>
          </div>
        </div>

        <div className="space-y-2">
          <Button onClick={runAllTests} className="w-full">
            Run Tests
          </Button>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {testResults.imageLoad === true && <CheckCircle className="h-4 w-4 text-green-500" />}
              {testResults.imageLoad === false && <AlertCircle className="h-4 w-4 text-red-500" />}
              <span>Image Load Test</span>
            </div>

            <div className="flex items-center gap-2">
              {testResults.urlEncoding === true && <CheckCircle className="h-4 w-4 text-green-500" />}
              {testResults.urlEncoding === false && <AlertCircle className="h-4 w-4 text-red-500" />}
              <span>URL Encoding Test</span>
            </div>
          </div>
        </div>

        <Button onClick={openPinterestTest} variant="outline" className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          Test Pinterest Share (Opens Pinterest)
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Manual Test Steps:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Click "Test Pinterest Share" button above</li>
            <li>Verify Pinterest opens with the Immutable logo visible</li>
            <li>Check that the description includes the document title</li>
            <li>Confirm the link points to the IPFS URL</li>
            <li>Test on both desktop and mobile devices</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
