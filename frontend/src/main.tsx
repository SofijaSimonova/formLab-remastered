import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

import App from './App'
import { queryClient } from './lib/queryClient'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

const persister = createAsyncStoragePersister({
    storage: window.localStorage,
})

createRoot(rootElement).render(
    <StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            <App />

            <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
    </StrictMode>,
)