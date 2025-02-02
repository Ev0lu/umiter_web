import { sessionLoader } from '@/features/auth/sessionLoader';
import Loader from '@/shared/loader/loader';
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const TerrariumPage = lazy(() => import('@/pages/terrarium/terrarium-page/terrarium-page'));
const CodeVerification = lazy(() => import('@/pages/auth/code-verification/code-verification'));
const Registration = lazy(() => import('@/pages/auth/registration-main-form/registration'));
const AddTerrariumQR = lazy(() => import('@/pages/auth/add-terrarium-qr/add-terrarium-qr'));
const LoginPage = lazy(() => import('@/pages/auth/login-page/login-page'));
const TerrariumList = lazy(() => import('@/pages/terrarium/terrarium-list/terrarium-list'));
const ProfilesPage = lazy(() => import('@/pages/profiles/profiles-page/profile-page'));
const AddNewTerrariumToProfile = lazy(() => import('@/pages/new-terrarium/add-new-terrarium-by-qr/add-new-terrarium-by-qr'));
const TerrariumInfo = lazy(() => import('@/pages/new-terrarium/terrarium-information/terrarium-information'));
const CustomProfileCreation = lazy(() => import('@/pages/profiles/create-custom-profile/create-custom-profile'));
const TerrariumSettings = lazy(() => import('@/pages/terrarium/terrarium-settings/terrarium-settings'));
const TerrariumSettingsInfo = lazy(() => import('@/pages/terrarium/terrarium-settings-info/terrarium-settings-info'));
const UserSettings = lazy(() => import('@/pages/user-settings/user-settings'));
const SupportService = lazy(() => import('@/pages/support-service/support-service'));
const AddNewTerrariumInfo = lazy(() => import('@/pages/new-terrarium/add-new-terrarium-info/add-new-terrarium-info'));
const AddTerrariumQRInfo = lazy(() => import('@/pages/auth/add-terrarium-qr-info/add-terrarium-qr-info'));

export const router = createBrowserRouter([
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