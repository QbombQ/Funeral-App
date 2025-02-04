import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface AuthContextType {
    userToken: string | null;
    userId: string | null;
    isLoading: boolean;
    login: (token: string, userId: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = await SecureStore.getItemAsync("userToken");
            const storedUserId = await SecureStore.getItemAsync("userId");

            console.log("🔹 Loaded from SecureStore →", { token, storedUserId });

            setUserToken(token);
            setUserId(storedUserId);
            setIsLoading(false);
        };

        checkToken();
    }, []);

    const login = async (token: string, userId: string) => {
        console.log("🔹 Storing in SecureStore →", { token, userId });

        await SecureStore.setItemAsync("userToken", String(token));
        await SecureStore.setItemAsync("userId", String(userId));

        setUserToken(token);
        setUserId(userId);
    };

    const logout = async () => {
        console.log("🔹 Logging out: Clearing SecureStore");

        await SecureStore.deleteItemAsync("userToken");
        await SecureStore.deleteItemAsync("userId");

        setUserToken(null);
        setUserId(null);
        router.replace("/(auth)/signin");
    };

    return (
        <AuthContext.Provider value={{ userToken, userId, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
