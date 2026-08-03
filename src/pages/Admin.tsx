import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../utils/widgetLoader";


const ADMIN_WIDGET = import.meta.env.VITE_ADMIN_WIDGET_URL;
const ADMIN_CONTAINER_ID = "Admin-widget";

const Admin = () => {
    const [isLoading, setIsLoading] = useState(true);
    console.log("isLoading", isLoading)
    useEffect(() => {
        if (!ADMIN_WIDGET) {
            console.error("Widget URL is undefined.");
            return;
        }

        const handleWidgetLoading = (event: any) => {
            if (event.detail !== undefined) {
                setIsLoading(event.detail);
            }
        };

        window.addEventListener(
            "widget-loading-status",
            handleWidgetLoading
        );

        loadWidget(ADMIN_WIDGET, ADMIN_CONTAINER_ID, {
            name: "Admin-widget",
        });

        return () => {
            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading
            );
            removeWidget(ADMIN_CONTAINER_ID);
        };
    }, []);

    return (
        <div
            id={ADMIN_CONTAINER_ID}
            className="min-h-[calc(100vh-64px)] w-full"
        ></div>
    );
};

export default Admin;