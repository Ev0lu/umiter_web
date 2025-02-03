import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSettingsState {
    name: string;
    phone: string;
    password: string;
    checkIsValidPhone: string;
    changeMode: boolean;
}

const initialState: UserSettingsState = {
    name: '',
    phone: '',
    password: '',
    checkIsValidPhone: '',
    changeMode: false
}

const userSettingsSlice = createSlice({
    name: 'useSettings',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload.replace(/[<>%$&!*^`/"',.|#@()\[\]{}0-9]/g, '');
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setCheckIsValidPhone(state, action: PayloadAction<string>) {
            state.checkIsValidPhone = action.payload;
        },
        toggleChangeMode(state) {
            state.changeMode = !state.changeMode;
        }
    }
})

export const { setName, setPhone, setPassword, setCheckIsValidPhone, toggleChangeMode } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;