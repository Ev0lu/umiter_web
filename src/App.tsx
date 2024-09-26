import './App.css'
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider, redirect
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './store';

const TerrariumPage = lazy(() => import('./pages/terrarium/terrarium-page/terrarium-page')) ;
const CodeVerification = lazy(() => import('./pages/code-verification/code-verification')) ;
const Registration = lazy(() => import('./pages/registration-main-form/Registration')) ;
const AddTerrariumQR = lazy(() => import('./pages/add-terrarium-qr/add-terrarium-qr')) ;
const LoginPage = lazy(() => import('./pages/login-page/LoginPage')) ;
const TerrariumList = lazy(() => import('./pages/terrarium/terrarium-list/terrarium-list')) ;

import Loader from './shared/loader/Loader';
import ProfilesPage from './pages/profiles/profiles-page/profile-page';
import AddNewTerrariumToProfile from './pages/new-terrarium/add-new-terrarium-by-qr/add-new-terrarium-by-qr';
import { refreshTokens } from './shared/api';
import TerrariumInfo from './pages/new-terrarium/terrarium-information/terrarium-information';
import CustomProfileCreation from './pages/profiles/create-custom-profile/create-custom-profile';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import TerrariumSettings from './pages/terrarium/terrarium-settings/terrarium-settings';
import TerrariumSettingsInfo from './pages/terrarium/terrarium-settings-info/terrarium-settings-info';
import UserSettings from './pages/user-settings/user-settings';
import SupportService from './pages/support-service/support-service';
import AddNewTerrariumInfo from './pages/new-terrarium/add-new-terrarium-info/add-new-terrarium-info';
import AddTerrariumQRInfo from './pages/add-terrarium-qr-info/add-terrarium-qr-info';



/*export const setToken = (tokenName: string, newToken: string | null) => {
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


export const isTokenExpired = () => {
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




*/

export const setToken = (tokenName: string, newToken: string | null) => {
  if (newToken) {
    const decoded = jwtDecode(newToken)
    Cookies.set(tokenName, newToken, {
      expires: decoded.exp,
    })
    return
  }
  Cookies.remove(tokenName)
}

export const getToken = (tokenName: string) => Cookies.get(tokenName)

export const isTokenExpired = (tokenName: string) => {
  const token = getToken(tokenName)
  if (!token) return true
  const decoded = jwtDecode(token)
  const timeLeft = (decoded.exp ?? 0) - Date.now() / 1000
  return timeLeft < 15
}

const sessionLoader = async () => {
  if (isTokenExpired('access')) {
      const token = getToken('refresh'); 
      const data = {
        "clientId": 'web-app',
        "refreshToken": token
      }
      const response = await refreshTokens(data)
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
    path: "/add_terrarium/info",
    element: <Suspense fallback={<Loader />}>
                <AddTerrariumQRInfo />
            </Suspense>,
  },
  {
    path: "/login",
    element: <Suspense fallback={<Loader />}>
                <LoginPage />
            </Suspense>,
  },
  {
    path: "/settings",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <UserSettings />
            </Suspense>,
  },
  {
    path: "/support",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <SupportService />
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
    path: "/",
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
    path: "/terrarium/:terrarium_id/settings",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <TerrariumSettings />
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
    path: "/terrarium/:terrarium_id/settings/terrarium_info",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <TerrariumSettingsInfo />
            </Suspense>,
  }, 
  {
    path: "/create/custom_profile",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <CustomProfileCreation />
            </Suspense>,
  }, 
  {
    path: "/new_terrarium/info",
    loader: sessionLoader,
    element: <Suspense fallback={<Loader />}>
                <AddNewTerrariumInfo />
            </Suspense>,
  }
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
