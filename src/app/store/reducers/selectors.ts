import { RootState } from '@/app/store';

export const selectUserSettings = (state: RootState) => ({
    name: state.userSettings.name,
    phone: state.userSettings.phone,
    password: state.userSettings.password,
    checkIsValidPhone: state.userSettings.checkIsValidPhone,
    changeMode: state.userSettings.changeMode,
});