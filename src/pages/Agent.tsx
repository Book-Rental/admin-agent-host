import { useEffect } from "react";
import { loadWidget } from "../utils/widgetLoader";

const Agent = () => {
    useEffect(() => {
        // Will load later
        // loadWidget(import.meta.env.VITE_AGENT_WIDGET_URL, "agent-widget");
    }, []);

    return (
        <div>
            <h2>Agent Widget</h2>

            <div
                id="agent-widget"
                style={{
                    minHeight: "600px",
                    border: "1px dashed gray",
                }}
            >
                Agent widget will load here...
            </div>
        </div>
    );
};

export default Agent;