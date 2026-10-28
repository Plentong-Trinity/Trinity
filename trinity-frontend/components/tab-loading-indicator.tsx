"use client"

import { useCallback, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const MINIMUM_LOADING_MS = 400
const NAVIGATION_TIMEOUT_MS = 15000
const ICON_FRAME_INTERVAL_MS = 100

export function TabLoadingIndicator() {
  const pathname = usePathname()
  const animationInterval = useRef<number | null>(null)
  const pendingNavigation = useRef<{
    pathname: string
    startedAt: number
    timeout: number
  } | null>(null)

  const stopLoadingIcon = useCallback(() => {
    if (animationInterval.current !== null) {
      window.clearInterval(animationInterval.current)
      animationInterval.current = null
    }
    setLoadingIcon(false)
  }, [])

  useEffect(() => {
    const pending = pendingNavigation.current
    if (pathname === "/") {
      if (pending) window.clearTimeout(pending.timeout)
      pendingNavigation.current = null
      stopLoadingIcon()
      return
    }

    if (!pending || pathname === pending.pathname) return

    window.clearTimeout(pending.timeout)
    const elapsed = Date.now() - pending.startedAt
    const restoreTimer = window.setTimeout(
      () => {
        pendingNavigation.current = null
        stopLoadingIcon()
      },
      Math.max(0, MINIMUM_LOADING_MS - elapsed)
    )

    return () => window.clearTimeout(restoreTimer)
  }, [pathname, stopLoadingIcon])

  useEffect(() => {
    const finishNavigation = () => {
      const pending = pendingNavigation.current
      if (!pending) return
      window.clearTimeout(pending.timeout)
      pendingNavigation.current = null
      stopLoadingIcon()
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest("a[href]")
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target || anchor.hasAttribute("download")) return

      const destination = new URL(anchor.href, window.location.href)
      if (destination.origin !== window.location.origin) return

      if (destination.hash || destination.pathname === "/") {
        if (pendingNavigation.current) window.clearTimeout(pendingNavigation.current.timeout)
        pendingNavigation.current = null
        stopLoadingIcon()
        return
      }

      const destinationPath = destination.pathname
      if (destinationPath === window.location.pathname) return

      if (pendingNavigation.current) window.clearTimeout(pendingNavigation.current.timeout)

      const startedAt = Date.now()
      const timeout = window.setTimeout(finishNavigation, NAVIGATION_TIMEOUT_MS)
      pendingNavigation.current = { pathname: window.location.pathname, startedAt, timeout }
      setLoadingIcon(true, 0)
      if (animationInterval.current !== null) window.clearInterval(animationInterval.current)
      animationInterval.current = window.setInterval(() => {
        setLoadingIcon(true, (Date.now() / ICON_FRAME_INTERVAL_MS * 30) % 360)
      }, ICON_FRAME_INTERVAL_MS)
    }

    document.addEventListener("click", handleClick, true)
    return () => {
      document.removeEventListener("click", handleClick, true)
      if (pendingNavigation.current) window.clearTimeout(pendingNavigation.current.timeout)
      stopLoadingIcon()
    }
  }, [stopLoadingIcon])

  return null
}

function setLoadingIcon(isLoading: boolean, angle = 0) {
  const iconLinks = document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')

  iconLinks.forEach((link) => {
    if (!link.dataset.originalHref) link.dataset.originalHref = link.href
    const icon = isLoading
      ? `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="#d1d5db" stroke-width="4"/><path d="M16 4a12 12 0 0 1 12 12" fill="none" stroke="#2563eb" stroke-linecap="round" stroke-width="4" transform="rotate(${angle} 16 16)"/></svg>`
        )}`
      : link.dataset.originalHref
    if (icon) link.href = icon
  })
}
