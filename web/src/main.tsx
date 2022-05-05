import App from './App'
import React from 'react'
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
