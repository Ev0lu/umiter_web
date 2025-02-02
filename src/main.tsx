import ReactDOM from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
         <App />
    </Provider>,
)
