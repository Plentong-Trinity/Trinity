"use client"

import { HeroSection } from "@/components/hero-section"
import { FeaturedBooksSection } from "@/components/featured-books-section"
import { AboutSection } from "@/components/about-section"
import { TechnologiesSection } from "@/components/technologies-section"
import { LibrarySection } from "@/components/library-section"
import { ContributeSection } from "@/components/contribute-section"
import { LicensingSection } from "@/components/licensing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { FloatingParticles } from "@/components/floating-particles"
import { ErrorBoundary } from "@/components/error-boundary"
import { ModalProvider, useModal } from "@/components/modal-context"
import { PDFViewerModal } from "@/components/pdf-viewer-modal"

// Global Modal Component - Single instance for entire app
function GlobalModal() {
  const { selectedDoc, closeModal, isOpen } = useModal()

  return <PDFViewerModal isOpen={isOpen} onClose={closeModal} doc={selectedDoc} />
}

// Main content component wrapped in modal provider
function AppContent() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <ErrorBoundary fallback={<div className="hidden">Particles Error</div>}>
          <FloatingParticles />
        </ErrorBoundary>
        <Navbar />
        <HeroSection />
        <ErrorBoundary
          fallback={<div className="py-20 text-center">Featured books section is currently unavailable</div>}
        >
          <FeaturedBooksSection />
        </ErrorBoundary>
        <AboutSection />
        <ErrorBoundary fallback={<div className="py-20 text-center">Library section is currently unavailable</div>}>
          <LibrarySection />
        </ErrorBoundary>
        <TechnologiesSection />
        <ContributeSection />
        <LicensingSection />
        <ErrorBoundary fallback={<div className="py-20 text-center">Contact form is currently unavailable</div>}>
          <ContactSection />
        </ErrorBoundary>
        <Footer />
      </main>

      {/* Single Modal Instance for Entire App */}
      <GlobalModal />
    </>
  )
}

export default function MainContent() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  )
}
