import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import AppRoutes from "./routes";
import "./App.css";
import "@rentbook/rentbook-ui-lib/microfrontend.min.css";

interface ToastEventDetails {
    message: string;
    type: "success" | "error" | "loading" | "custom";
}

const App = () => {
    useEffect(() => {
        const handleIncomingWidgetToast = (event: Event) => {
            const customEvent = event as CustomEvent<ToastEventDetails>;
            if (!customEvent.detail) return;
            const { message, type } = customEvent.detail;
            
            switch (type) {
                case "success":
                    toast.success(message);
                    break;
                case "error":
                    toast.error(message);
                    break;
                case "loading":
                    toast.loading(message);
                    break;
                default:
                    toast(message);
            }
        };

        window.addEventListener(
            "app-toast-notification",
            handleIncomingWidgetToast
        );

        return () => {
            window.removeEventListener(
                "app-toast-notification",
                handleIncomingWidgetToast
            );
        };
    }, []);

    return (
        <>
            <AppRoutes />
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
};

export default App;