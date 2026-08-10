import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadWidget, removeWidget } from "../utils/widgetLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import WidgetSkeleton from "../components/WidgetSkeleton";

interface AgentPageProps {
    module: "pickup" | "delivery";
    view:
    | "orders"
    | "details"
    | "verification"
    | "confirmation";
}

const AGENT_WIDGET = import.meta.env.VITE_AGENT_WIDGET_URL;
const AGENT_CONTAINER_ID = "Agent-widget";

const Agent = ({ module, view }: AgentPageProps) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    const { shipmentId } = useParams<{ shipmentId?: string }>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!AGENT_WIDGET) {
            console.error("Widget URL is undefined.");
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleWidgetLoading = (event: any) => {
            if (event.detail !== undefined) {
                setIsLoading(event.detail);
            }
        };

        window.addEventListener("widget-loading-status", handleWidgetLoading);

        const widgetParams = { name: "agent-widget", module, view, shipmentId, userInfo, };
        loadWidget(
            AGENT_WIDGET,
            AGENT_CONTAINER_ID,
            widgetParams
        );

        return () => {
            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading
            );
            removeWidget(AGENT_CONTAINER_ID);
        };
    }, [module, view, shipmentId, location.pathname, userInfo]);

    return (
        <div className="relative w-full min-h-[400px]">
            {isLoading && (
                <div className="absolute inset-0 bg-white z-10">
                    <WidgetSkeleton />
                </div>
            )}
            <div
                id={AGENT_CONTAINER_ID}
                className={isLoading ? "invisible h-0 overflow-hidden" : "min-h-[calc(100vh-64px)] w-full"}
            ></div>
        </div>
    );
};

export default Agent;