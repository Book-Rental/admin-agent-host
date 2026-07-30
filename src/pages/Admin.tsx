import { useEffect } from "react";


const Admin = () => {
    useEffect(() => {
        // Will load later
        // loadWidget(import.meta.env.VITE_ADMIN_WIDGET_URL, "admin-widget");
    }, []);

    return (
        <div>
            <h2>Admin Widget</h2>

            <div
                id="admin-widget"
                style={{
                    minHeight: "600px",
                    border: "1px dashed gray",
                }}
            >
                Admin widget will load here...
            </div>
        </div>
    );
};

export default Admin;