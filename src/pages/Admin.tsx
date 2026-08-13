import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../utils/widgetLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import WidgetSkeleton from "../components/WidgetSkeleton";


const ADMIN_WIDGET = import.meta.env.VITE_ADMIN_WIDGET_URL;
const ADMIN_CONTAINER_ID = "Admin-widget";

interface AdminProps {
    view:
    | "admin"
    | "agents"
    | "create-agent"
    | "agent-details"
    | "edit-agent"
    | "order-details"
    | "orders"
    | "destination-shipments"
    | "hubs"
    | "hub-details";

}


const Admin = ({ view }: AdminProps) => {

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!ADMIN_WIDGET) {
            console.error("Widget URL is undefined.");
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            view,
            userInfo,
        });

        return () => {
            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading
            );
            removeWidget(ADMIN_CONTAINER_ID);
        };
    }, [view, userInfo]);

    return (
        <div className="relative w-full min-h-[400px]">
            {isLoading && (
                <div className="absolute inset-0 bg-white z-10">
                    <WidgetSkeleton />
                </div>
            )}
            <div
                id={ADMIN_CONTAINER_ID}
                className={isLoading ? "invisible h-0 overflow-hidden" : "w-full block"}
            ></div>
        </div>
    );
};

export default Admin;