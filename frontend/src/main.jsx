import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchContextProvider } from "./context/SearchProvider.jsx";

const queryClient = new QueryClient();

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ScrollToTop />
                <SearchContextProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </SearchContextProvider>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: "var(--cit-surface)",
                            color: "var(--cit-text)",
                            border: "1px solid var(--cit-border)",
                            boxShadow: "var(--cit-shadow-md)",
                            borderRadius: "var(--cit-radius-md)",
                            fontSize: "14px",
                            fontWeight: "600",
                            padding: "12px 16px",
                        },
                        success: {
                            iconTheme: {
                                primary: "var(--cit-success)",
                                secondary: "white",
                            },
                        },
                    }}
                />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
);
