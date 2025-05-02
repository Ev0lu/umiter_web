import './App.css'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { router } from './router/router';

function App() {
  return (
  <div className='app'>
    <Provider store={store}>
          <RouterProvider router={router} />
    </Provider>
    </div>
  )
}

export default App
