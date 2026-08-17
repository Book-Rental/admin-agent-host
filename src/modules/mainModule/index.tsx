import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import { Rb_BreadCrumb } from "@rentbook/rentbook-ui-lib";
import { breadcrumbMap } from "../../config/breadcrumbConfig";
import { getBreadcrumb } from "../../utils/breadcrumbHelper";

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [widgetLoaded, setWidgetLoaded] = useState(false);
    console.log(widgetLoaded)
    const breadcrumb = useMemo(() => {
        const dynamicBreadcrumb = getBreadcrumb(
            location.pathname,
            location.search
        );

        return dynamicBreadcrumb.length > 0
            ? dynamicBreadcrumb
            : breadcrumbMap[location.pathname] ?? [];
    }, [location.pathname, location.search]);

    useEffect(() => {
        setWidgetLoaded(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        const handleWidgetLoading = (event: CustomEvent<boolean>) => {
            setWidgetLoaded(!event.detail);
        };

        window.addEventListener(
            "widget-loading-status",
            handleWidgetLoading as EventListener
        );

        return () => {
            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading as EventListener
            );
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
               <div className="absolute top-20 left-64 right-4 z-20 max-md:relative max-md:top-0 max-md:left-0 max-md:right-0 max-md:mt-16 max-md:mb-3 max-md:px-4 max-md:py-2 max-md:z-10">
                    <Rb_BreadCrumb
                        items={breadcrumb}
                        onNavigate={navigate}
                    />
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;