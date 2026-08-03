import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../utils/widgetLoader";

const AGENT_WIDGET = import.meta.env.VITE_AGENT_WIDGET_URL;
const AGENT_CONTAINER_ID = "Agent-widget";

const Agent = () => {
    const [isLoading, setIsLoading] = useState(true);
    console.log("isLoading",isLoading)
    useEffect(() => {
        if (!AGENT_WIDGET) {
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

        loadWidget(AGENT_WIDGET, AGENT_CONTAINER_ID, {
            name: "Agent-widget",
        });

        return () => {
            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading
            );
            removeWidget(AGENT_CONTAINER_ID);
        };
    }, []);

    return (
        <div
            id={AGENT_CONTAINER_ID}
            className="min-h-[calc(100vh-64px)] w-full"
        ></div>
    );
};

export default Agent;