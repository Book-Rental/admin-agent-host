import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Agent from "./pages/Agent";
import Admin from "./pages/Admin";

function App() {
    const [page, setPage] = useState<"agent" | "admin">("agent");

    return (
        <>
            <Header />

            <div
                style={{
                    display: "flex",
                    height: "calc(100vh - 60px)",
                }}
            >
                <Sidebar active={page} onChange={setPage} />

                <div
                    style={{
                        flex: 1,
                        padding: "24px",
                    }}
                >
                    {page === "agent" ? <Agent /> : <Admin />}
                </div>
            </div>
        </>
    );
}

export default App;