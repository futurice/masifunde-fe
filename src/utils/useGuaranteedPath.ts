import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * A hook that redirects to the given path (on the client side) if the
 * current browser URL does not match the path already.
 *
 * This is used for pages embedding Fundraisingbox, whose iframe only
 * loads if the browser URL matches the "Einbettungsadresse" ("embedding
 * URL") in the Fundraisingbox settings exactly.
 *
 * Note that you must manually ensure that the passed path points to
 * the page in which you are using the hook, either directly or through
 * a path rewrite. See:
 *
 * - https://docs.netlify.com/routing/redirects/rewrites-proxies/
 * - https://nextjs.org/docs/api-reference/next.config.js/rewrites
 */
export default function useGuaranteedPath(path: string): void {
  const router = useRouter()

  useEffect(() => {
    if (getBarePath(router) !== path) {
      router.replace({ pathname: path }).then(() => router.reload())
    }
  }, [path, router, router.asPath])
}

function getBarePath(router: NextRouter) {
  return (
    router.asPath
      // Remove trailing slash
      .replace(/\/$/, '')
      // Remove query parameters (e.g., `?status=success`)
      .replace(/\?.+$/, '')
  )
}
