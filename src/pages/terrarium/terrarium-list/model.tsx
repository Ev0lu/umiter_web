import { useState, useEffect } from 'react';
import { terrariumApi, userApi } from '@/shared/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/index';

/**
 * Hook that manages terrarium list data, user info, and navigation logic.
 * 
 * @returns {
 *  terrariumList: array of terrariums,
 *  userData: current user info,
 *  menuOpen: boolean indicating if menu is open,
 *  isLoading: boolean loading state,
 *  isError: boolean error state,
 *  navigate: function to navigate programmatically
 * }
 */
export const useTerrariumListModel = () => {
  const navigate = useNavigate();

  // Fetch user info
  const { data: userData, error: userError, isLoading: userLoading } = userApi.useGetUserInfoQuery();

  // Redux selector for menu visibility
  const menuOpen = useSelector((state: RootState) => state.visibleMenu.isVisible);

  // State for terrarium list
  const [terrariumList, setTerrariumList] = useState<any[]>([]);

  // Lazy query to fetch terrariums
  const [fetchTerrariums, { data: terrariumData, isLoading: terrariumLoading, error: terrariumError }] = terrariumApi.useLazyGetTerrariumsQuery();

  // Fetch terrariums on mount
  useEffect(() => {
    fetchTerrariums();
  }, [fetchTerrariums]);

  // Update terrarium list and handle empty terrarium redirect
  useEffect(() => {
    if (terrariumData) {
      setTerrariumList(terrariumData.terrariums);
      const emptyTerrarium = terrariumData.terrariums.find(item => item.profileId === null);
      if (emptyTerrarium) {
        sessionStorage.setItem('terrariumToChange', emptyTerrarium.id);
        navigate('/select_profile');
      }
    }
  }, [terrariumData, navigate]);

  // Aggregate loading and error states
  const isLoading = terrariumLoading || userLoading;
  const isError = terrariumError || userError;

  return {
    terrariumList,
    userData,
    menuOpen,
    isLoading,
    isError,
    navigate,
  };
};
