import { BreadcrumbItem } from "../config/breadcrumbConfig";

export const getBreadcrumb = (
  pathname: string,
  _search: string
): BreadcrumbItem[] => {
  console.log("search",_search)
  // Pickup Details
  if (
    pathname.startsWith("/agent/pickup-orders/") &&
    !pathname.includes("/pickup-verification") &&
    !pathname.includes("/confirmation")
  ) {
    return [
      {
        label: "Pickup Orders",
        path: "/agent/pickup-orders",
      },
      {
        label: "Pickup Details",
        // path: `/agent/pickup-orders/${shipmentId}`,
      },
    ];
  }

  // Pickup Verification
  if (pathname.includes("/pickup-verification")) {
    const shipmentId = pathname.split("/")[3];

    return [
      {
        label: "Pickup Orders",
        path: "/agent/pickup-orders",
      },
      {
        label: "Pickup Details",
        path: `/agent/pickup-orders/${shipmentId}`,
      },
      {
        label: "Verification",
      },
    ];
  }

  // Pickup Confirmation
  if (pathname.includes("/confirmation") && pathname.includes("/pickup-orders")) {
    const shipmentId = pathname.split("/")[3];

    return [
      {
        label: "Pickup Orders",
        path: "/agent/pickup-orders",
      },
      {
        label: "Pickup Details",
        path: `/agent/pickup-orders/${shipmentId}`,
      },
      {
        label: "Confirmation",
      },
    ];
  }

  // Delivery Details
  if (
    pathname.startsWith("/agent/delivery-orders/") &&
    !pathname.includes("/delivery-verification") &&
    !pathname.includes("/confirmation")
  ) {
    const shipmentId = pathname.split("/")[3];

    return [
      {
        label: "Delivery Orders",
        path: "/agent/delivery-orders",
      },
      {
        label: "Delivery Details",
        path: `/agent/delivery-orders/${shipmentId}`,
      },
    ];
  }

  // Delivery Verification
  if (pathname.includes("/delivery-verification")) {
    const shipmentId = pathname.split("/")[3];

    return [
      {
        label: "Delivery Orders",
        path: "/agent/delivery-orders",
      },
      {
        label: "Delivery Details",
        path: `/agent/delivery-orders/${shipmentId}`,
      },
      {
        label: "Verification",
      },
    ];
  }

  // Delivery Confirmation
  if (pathname.includes("/confirmation") && pathname.includes("/delivery-orders")) {
    const shipmentId = pathname.split("/")[3];

    return [
      {
        label: "Delivery Orders",
        path: "/agent/delivery-orders",
      },
      {
        label: "Delivery Details",
        path: `/agent/delivery-orders/${shipmentId}`,
      },
      {
        label: "Confirmation",
      },
    ];
  }

  return [];
};