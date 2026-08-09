export type PublicApiProtocol = 'http' | 'https'

/** Builds a public API URL from the protocol and hostname stored in Payload. */
export function getPublicApiUrl(
  protocol: PublicApiProtocol | null | undefined,
  domain: string | null | undefined,
  path: string,
): string {
  if (protocol !== 'http' && protocol !== 'https') {
    throw new Error('Wybierz protokół API (HTTP lub HTTPS).')
  }

  const hostname = domain?.trim()
  if (!hostname) {
    throw new Error('Podaj domenę API.')
  }

  // The API contract accepts a tenant hostname, not a full URL. Keeping this
  // strict avoids accidentally joining a path, credentials, or a query string.
  if (!/^[a-zA-Z0-9.-]+(?::\d{1,5})?$/.test(hostname)) {
    throw new Error('Domena API musi zawierać wyłącznie nazwę hosta (opcjonalnie z portem).')
  }

  const url = new URL(`${protocol}://${hostname}`)
  url.pathname = path
  return url.toString()
}

export function validatePublicApiDomain(value: unknown): true | string {
  if (value == null || value === '') return true

  try {
    getPublicApiUrl('https', String(value), '/')
    return true
  } catch (error) {
    return error instanceof Error ? error.message : 'Nieprawidłowa domena API.'
  }
}
