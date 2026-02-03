"use client"

import { HeroSection } from "@/components/landing-page/hero-section"
import { AboutSection } from "@/components/landing-page/about-section"
import { ContactSection } from "@/components/landing-page/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { FloatingParticles } from "@/components/for-referencing/floating-particles"
import { ErrorBoundary } from "@/components/for-referencing/error-boundary"
import { ModalProvider, useModal } from "@/components/for-referencing/modal-context"
import { PDFViewerModal } from "@/components/for-referencing/pdf-viewer-modal"
import { MassSection } from "@/components/landing-page/mass-schedule"

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
        <AboutSection />
        <MassSection />
        {/* Books Section */}
        {/* <ErrorBoundary
          fallback={<div className="py-20 text-center">Featured books section is currently unavailable</div>}
        >
          <FeaturedBooksSection />
        </ErrorBoundary> */}
        <ErrorBoundary fallback={<div className="py-20 text-center">Library section is currently unavailable</div>}>
        </ErrorBoundary>
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
