import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "./api";

interface UserRegisterData {
    password: string,
    phoneNumber: string,
    linkId: string,
    name: string
}

interface CodeData {
    recipient: string,
    code: string,
    linkId: string
}

interface PhoneData {
    recipient: string,
    linkId: string,
    validate: boolean
}

interface UserData {
    phoneNumber: string,
    password: string,
    clientId: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: apiBaseQuery,
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, UserRegisterData>({
            query: (user) => ({
                url: 'public/user',
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: user,
            }),
        }),
        checkCorrectCode: builder.mutation<any, CodeData>({
            query: (data) => ({
                url: 'public/phone/verifications/attempts',
                method: 'POST',
                body: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getPhoneCode: builder.mutation<any, PhoneData>({
            query: (data) => ({
                url: 'public/phone/verifications/requests/call',
                method: 'POST',
                body: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        }),
        refreshTokens: builder.mutation<any, any>({
            query: (data) => ({
                url: 'public/user/auth/refresh/token',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data,
            }),
        }),
        loginUser: builder.mutation<any, UserData>({
            query: (user) => ({
                url: 'public/user/auth/password/token',
                method: 'POST',
                body: user,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useCheckCorrectCodeMutation,
    useGetPhoneCodeMutation,
    useRefreshTokensMutation,
    useLoginUserMutation,
} = authApi;

export const useLoginUser = () => {
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();

    const handleLogin = async ({ phoneNumber, password, onSuccess, onFailure }: {
        phoneNumber: string;
        password: string;
        onSuccess: (data: any) => void;
        onFailure?: () => void;
    }) => {
        try {
            const { data } = await loginUser({
                phoneNumber,
                password,
                clientId: 'web-app',
            });

            if (data) {
                onSuccess(data);
                navigate('/terrarium_list');
            } else {
                onFailure?.();
                navigate('/login');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return { handleLogin };
};

export function useCodeVerification() {
    const [checkCorrectCode] = useCheckCorrectCodeMutation();
    const [getPhoneCode] = useGetPhoneCodeMutation();

    const [agreement, setAgreement] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [tries, setTries] = useState(0);
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const [seconds, setSeconds] = useState(60);
    const [timerActive, setTimerActive] = useState(true);
    const [incorrectCode, setIncorrectCode] = useState(false);

    useEffect(() => {
        requestPhoneCode();
    }, []);

    useEffect(() => {
        if (code.join("").length === 4) handleSubmit();
    }, [code]);

    useEffect(() => {
        if (seconds > 0 && timerActive) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
        setTimerActive(false);
    }, [seconds, timerActive]);

    const requestPhoneCode = async () => {
        await getPhoneCode({
            recipient: sessionStorage.getItem("phone") || "",
            linkId: sessionStorage.getItem("linkId") || "",
            validate: false,
        });
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData("text").trim();
    
        const validCharacters = pastedData.replace(/[^a-zA-Z0-9]/g, "").slice(0, 4);
    
        if (validCharacters.length > 0) {
            setCode(validCharacters.toUpperCase().split(""));
    
            document.getElementById(`code-box-${validCharacters.length - 1}`)?.focus();
        }
    };    

    const handleCodeChange = (index: number, value: string) => {    
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    
        if (index < 3 && value !== "") {
            document.getElementById(`code-box-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && code[index] === "" && index > 0) {
            document.getElementById(`code-box-${index - 1}`)?.focus();
        }
    };

    const handleSubmit = async () => {
        if (tries >= 3) return;

        if (code.join("").length === 4) {
            setTries((prev) => prev + 1);

            const { data } = await checkCorrectCode({
                recipient: sessionStorage.getItem("phone") || "",
                code: code.join(""),
                linkId: sessionStorage.getItem("linkId") || "",
            });

            if (data) {
                setIsVerified(true);
            } else {
                setIncorrectCode(true);
                setTimeout(() => setIncorrectCode(false), 3000);
                setCode(["", "", "", ""]);
            }
        }
    };

    const resetTimer = () => {
        setSeconds(60);
        setTimerActive(true);
        requestPhoneCode();
    };

    return {
        agreement,
        setAgreement: () => setAgreement((prev) => !prev),
        isVerified,
        code,
        handleCodeChange,
        handleKeyDown,
        seconds,
        resetTimer,
        incorrectCode,
        handlePaste
    };
}