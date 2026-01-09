export function extractIPFSHash(url: string): string | null {
  if (!url) return null

  // Match /ipfs/CID or gateway.link/ipfs/CID
  const match = url.match(/\/ipfs\/([a-zA-Z0-9]+)/)
  if (match && match[1]) {
    return match[1]
  }

  // Match CID at the start of the string (e.g., bafy...)
  const bafyMatch = url.match(/^(bafy[a-zA-Z0-9]+)/)
  if (bafyMatch && bafyMatch[1]) {
    return bafyMatch[1]
  }

  return null
}

/**
 * Extracts the filename from an IPFS URL.
 * @param url The IPFS URL.
 * @returns The extracted filename, or null.
 */
export function extractFilename(url: string): string | null {
  if (!url) return null

  // Case 1: filename is in query parameter `?filename=...`
  const queryMatch = url.match(/[?&]filename=([^&]+)/)
  if (queryMatch && queryMatch[1]) {
    return decodeURIComponent(queryMatch[1])
  }

  // Case 2: filename is the last part of the path
  try {
    // Use a base URL to handle path-only strings correctly
    const urlObject = new URL(url, "http://dummybase.com")
    const pathParts = urlObject.pathname.split("/")
    const lastPart = pathParts[pathParts.length - 1]
    // Check if the last part looks like a file (contains a dot)
    if (lastPart && lastPart.includes(".")) {
      return decodeURIComponent(lastPart)
    }
  } catch (e) {
    // Fallback for malformed URLs or paths
    const pathParts = url.split("/")
    const lastPart = pathParts[pathParts.length - 1]
    if (lastPart && lastPart.includes(".")) {
      return decodeURIComponent(lastPart.split("?")[0]) // handle path with query
    }
  }

  return null
}
