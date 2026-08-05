import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadWidget, removeWidget } from "../utils/widgetLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
    console.log("isLoading",isLoading)
    useEffect(() => {
        if (!AGENT_WIDGET) {
            console.error("Widget URL is undefined.");
            return;
        }

        const handleWidgetLoading = (event: Event) => {
            const customEvent = event as CustomEvent<boolean>;
            if (customEvent.detail !== undefined) {
                setIsLoading(customEvent.detail);
            }
        };

        window.addEventListener( "widget-loading-status", handleWidgetLoading );

        const widgetParams = { name: "agent-widget",  module, view, shipmentId ,userInfo, };
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
    }, [module , view,shipmentId, location.pathname,userInfo]);

    return (
        <div
            id={AGENT_CONTAINER_ID}
            className="min-h-[calc(100vh-64px)] w-full"
        ></div>
    );
};

export default Agent;