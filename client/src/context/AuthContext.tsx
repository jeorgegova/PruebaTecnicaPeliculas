import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (token: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Decode token or fetch user info if needed. For now just store email if passed or assume valid.
            // We can store email in localStorage too or decode JWT.
            // For simplicity, we just check token presence.
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    const login = (newToken: string, email: string) => {
        setToken(newToken);
        setUser({ email });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
