import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';


const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  Steps
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
