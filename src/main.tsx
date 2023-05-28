import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// redux provder and store
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
