"use client"

import { useState, useEffect, useCallback } from "react"

/* --- constants ---------------------------------------------------------- */

const IPFS_GATEWAYS = [
  "https://w3s.link/ipfs/",
  "https://dweb.link/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://ipfs.eth.aragon.network/ipfs/",
  "https://ipfs.fleek.co/ipfs/",
  "https://ipfs.infura.io/ipfs/",
  "https://gateway.ipfs.io/ipfs/",
] as const

const CORS_PROXIES = ["https://corsproxy.io/?", "https://api.allorigins.win/raw?url="] as const

const GITHUB_FALLBACK_BASE = "https://raw.githubusercontent.com/THookz/Immutable/main/submissions/"

/* --- helpers ------------------------------------------------------------ */

const shuffle = <T,>(arr: readonly T[]) => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const buildGatewayUrl = (gateway: string, cid: string, filename?: string | null) =>
  filename?.trim() ? `${gateway}${cid}/${encodeURIComponent(filename.trim())}` : `${gateway}${cid}`

/* --- hook --------------------------------------------------------------- */

export function useIPFSGateway(ipfsHash?: string | null, filename?: string | null, retryTrigger = 0) {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("Initializing…")

  /* –– HEAD ping with timeout –––––––––––––––––––––––––––––––––––––––––– */
  const headOk = useCallback(async (url: string, ms = 8000) => {
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), ms)
      const res = await fetch(url, { method: "HEAD", signal: ctrl.signal })
      clearTimeout(timer)
      return res.ok
    } catch {
      return false
    }
  }, [])

  /* –– main worker ––––––––––––––––––––––––––––––––––––––––––––––––––––– */
  useEffect(() => {
    if (!ipfsHash) {
      setError("No IPFS hash provided.")
      setIsLoading(false)
      return
    }

    let cancelled = false

    const locate = async () => {
      setIsLoading(true)
      setError(null)
      setCurrentUrl(null)

      const gateways = shuffle(IPFS_GATEWAYS)

      /* 1) Direct IPFS gateways ------------------------------------------------ */
      setStatusMessage("Connecting to public IPFS gateways…")
      for (const gw of gateways) {
        if (cancelled) return
        const url = buildGatewayUrl(gw, ipfsHash, filename)
        if (await headOk(url)) {
          if (!cancelled) {
            setCurrentUrl(url)
            setIsLoading(false)
          }
          return
        }
      }

      /* 2) CORS proxies -------------------------------------------------------- */
      setStatusMessage("Trying gateways through CORS proxies…")
      for (const proxy of CORS_PROXIES) {
        for (const gw of gateways) {
          if (cancelled) return
          const raw = buildGatewayUrl(gw, ipfsHash, filename)
          const proxied = `${proxy}${encodeURIComponent(raw)}`
          if (await headOk(proxied)) {
            if (!cancelled) {
              setCurrentUrl(proxied)
              setIsLoading(false)
            }
            return
          }
        }
      }

      /* 3) GitHub fallback ------------------------------------------------------ */
      if (filename) {
        setStatusMessage("IPFS failed ­— falling back to GitHub…")
        const gh = `${GITHUB_FALLBACK_BASE}${encodeURIComponent(filename)}`
        if (await headOk(gh)) {
          if (!cancelled) {
            setCurrentUrl(gh)
            setIsLoading(false)
          }
          return
        }
      }

      /* 4) Total failure -------------------------------------------------------- */
      if (!cancelled) {
        setError("All connection attempts failed. Network-level blocking is likely.")
        setIsLoading(false)
      }
    }

    locate()
    return () => {
      cancelled = true
    }
  }, [ipfsHash, filename, headOk, retryTrigger])

  return { currentUrl, isLoading, error, statusMessage }
}
