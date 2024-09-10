import './App.css'
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider, redirect
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './store';

const TerrariumPage = lazy(() => import('./pages/terrarium/TerrariumPage/TerrariumPage')) ;
const CodeVerification = lazy(() => import('./pages/CodeVerification/CodeVerification')) ;
const Registration = lazy(() => import('./pages/RegistrationMainForm/Registration')) ;
const AddTerrariumQR = lazy(() => import('./pages/AddTerrariumQR/AddTerrariumQR')) ;
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage')) ;
const TerrariumList = lazy(() => import('./pages/terrarium/TerrariumList/TerrariumList')) ;

import Loader from './shared/Loader/Loader';
import ProfilesPage from './pages/profiles-page/profile-page';
import AddNewTerrariumToProfile from './pages/new-terrarium/add-new-terrarium-by-qr/add-new-terrarium-by-qr';
import { refreshTokens } from './shared/api';
import TerrariumInfo from './pages/new-terrarium/terrarium-information/terrarium-information';
import CustomProfileCreation from './pages/create-custom-profile/create-custom-profile';



export const setToken = (tokenName: string, newToken: string | null) => {
  if (newToken) {
    // Декодирование JWT без сторонней библиотеки
    const base64Url = newToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));

    // Установка cookie без сторонней библиотеки
    const expires = new Date(decoded.exp * 1000).toUTCString();
    document.cookie = `${tokenName}=${newToken}; expires=${expires}; path=/`;
    return;
  }
  // Удаление cookie
  document.cookie = `${tokenName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const getToken = (tokenName: string) => {
  // Получение cookie без сторонней библиотеки
  const name = `${tokenName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};


const isTokenExpired = () => {
  const token = getToken('access'); // Предполагается, что функция getToken() уже определена
  if (!token) return true;

  // Декодирование JWT токена без сторонних библиотек
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = JSON.parse(window.atob(base64));

  // Вычисление времени, оставшегося до истечения срока действия токена
  const timeLeft = (decodedPayload.exp ?? 0) - Date.now() / 1000;

  // Если время меньше 15 минут (900 секунд), считаем токен истекшим
  return timeLeft < 15;
};

const sessionLoader = async () => {
  if (isTokenExpired()) {
      const token = getToken('refresh'); // Предполагается, что функция getToken() уже определена
      const response = await refreshTokens(token)
      if (response.ok) {
        const data = await response.json();
        setToken('access', data.accessToken)
        setToken('refresh', data.refreshToken)  
      } else {
        return redirect('/login')
      }
    }
  return true
}



const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Suspense fallback={<Loader />}>
                <Registration />
            </Suspense>,
  },
  {
    path: "/add_terrarium",
    element: <Suspense fallback={<Loader />}>
                  <AddTerrariumQR />
        </Suspense>,
  },
  {
    path: "/login",
    element: <Suspense fallback={<Loader />}>
                <LoginPage />
            </Suspense>,
  },
  {
    path: "/terrarium_list",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <TerrariumList />
            </Suspense>,
  },
  {
    path: "/terrarium/:terrarium_id",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <TerrariumPage />
            </Suspense>,
  }, 
  {
    path: "/code_verification",
    element: <Suspense fallback={<Loader />}>
                <CodeVerification />
            </Suspense>,
  },
  {
    path: "/select_profile",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <ProfilesPage />
            </Suspense>,
  },
  {
    path: "/new_terrarium",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <AddNewTerrariumToProfile />
            </Suspense>,
  },
  {
    path: "/terrarium_info",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <TerrariumInfo />
            </Suspense>,
  },
  {
    path: "/create/custom_profile",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <CustomProfileCreation />
            </Suspense>,
  },
]);

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
