import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.tsx'
import axios from 'axios'

// axios.defaults.baseURL = "http://127.0.0.1:8080/api";
axios.defaults.baseURL = "https://reciger.com/api";
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:5173/";

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>,
)
