"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SocialShare } from "@/components/for-referencing/social-share"
import { useModal } from "@/components/for-referencing/modal-context"
import { allDocumentsWithFallbacks } from "@/lib/document-data-with-github-fallbacks"

export function LibrarySection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { openModal } = useModal()

  const filteredDocuments = allDocumentsWithFallbacks.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    return doc.category === activeTab && matchesSearch
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("IPFS link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        alert("Failed to copy. Please copy the link manually.")
      })
  }

  return (
    <section id="library" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Document Library</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Explore our growing collection of preserved documents, including historical texts, Bible translations, and
            suppressed books that have been censored or hidden from public view.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Network Access Advisory</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Certain internet service providers and mobile networks may restrict access to IPFS content. If you
                  encounter difficulties, try switching to mobile data or consider using a decentralized VPN such as{" "}
                  <a
                    href="https://www.sentinel.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:no-underline"
                  >
                    Sentinel DVPN
                  </a>{" "}
                  to bypass regional limitations and ensure uninterrupted access to our preserved archives.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4"
              />
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="historical">Historical</TabsTrigger>
                <TabsTrigger value="translations">Translations</TabsTrigger>
                <TabsTrigger value="suppressed-books">Suppressed</TabsTrigger>
                <TabsTrigger value="prophecy">Prophecy</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <Card key={doc.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight line-clamp-2">{doc.title}</CardTitle>
                    {doc.author && <CardDescription className="font-medium">by {doc.author}</CardDescription>}
                    <CardDescription className="text-sm line-clamp-3 mt-2">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-primary/5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-4">
                    <div className="flex justify-between w-full gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(doc.ipfsLink)}
                        className="flex-1"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy IPFS
                      </Button>
                      <Button size="sm" onClick={() => openModal(doc)} className="flex-1">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                    <div className="w-full border-t border-border/30 pt-4">
                      <SocialShare
                        title={`${doc.title} - Immutable Archive`}
                        description={`${doc.description} Preserved in the Immutable Archive - Truth Preserved. Censorship Resisted.`}
                        url={doc.ipfsLink}
                        hashtags={[...doc.tags.slice(0, 3), "ImmutableArchive", "TruthPreserved"]}
                        variant="outline"
                        size="sm"
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No documents found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
