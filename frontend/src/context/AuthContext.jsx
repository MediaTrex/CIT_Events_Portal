import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: 23,
        email: "youremail@example.edu.in",
        name: "John Kumar rathu Doe",
        role: "student",
        profileSetupCompleted: false,
        isApproved: false,
    });
    const isLoggedIn = Boolean(user);

    const value = useMemo(
        () => ({ user, setUser, isLoggedIn }),
        [user, isLoggedIn],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
