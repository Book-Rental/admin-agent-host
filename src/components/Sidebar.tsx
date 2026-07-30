type Props = {
    active: "agent" | "admin";
    onChange: (page: "agent" | "admin") => void;
};

const Sidebar = ({ active, onChange }: Props) => {
    return (
        <div
            style={{
                width: "220px",
                background: "#fff",
                borderRight: "1px solid #ddd",
                padding: "20px",
            }}
        >
            <button
                onClick={() => onChange("agent")}
                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "12px",
                    background: active === "agent" ? "#2563eb" : "#e5e7eb",
                    color: active === "agent" ? "#fff" : "#000",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Agent
            </button>

            <button
                onClick={() => onChange("admin")}
                style={{
                    width: "100%",
                    padding: "12px",
                    background: active === "admin" ? "#2563eb" : "#e5e7eb",
                    color: active === "admin" ? "#fff" : "#000",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Admin
            </button>
        </div>
    );
};

export default Sidebar;