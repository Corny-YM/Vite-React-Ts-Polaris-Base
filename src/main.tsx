import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Link as ReactRouterLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '@shopify/polaris'
import { LinkLikeComponentProps } from '@shopify/polaris/build/ts/latest/src/utilities/link/types'
import viTranslations from '@shopify/polaris/locales/vi.json'

import App from './App.tsx'
import '@shopify/polaris/build/esm/styles.css'
import './index.css'

function isOutboundLink(url: string) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(url)
}
function Link({
  children,
  url = '',
  external,
  download,
  ref,
  ...rest
}: LinkLikeComponentProps) {
  // Use an regular a tag for external and download links
  if (isOutboundLink(url) || download) {
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <ReactRouterLink
      to={url}
      target={external ? '_blank' : undefined}
      {...rest}
    >
      {children}
    </ReactRouterLink>
  )
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider i18n={viTranslations}>
          <App />
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
