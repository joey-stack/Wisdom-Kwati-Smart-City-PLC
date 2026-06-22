"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsTracker() {
  const [shouldTrack, setShouldTrack] = useState(false);

  useEffect(() => {
    // Check if the secret URL parameter is present
    const params = new URLSearchParams(window.location.search);
    if (params.get("developer") === "true") {
      // Mark this device as a developer device
      localStorage.setItem("isDeveloper", "true");
      console.log("Developer mode enabled. Analytics disabled for this device.");
    }

    // Only enable tracking if this device is NOT marked as a developer
    const isDeveloper = localStorage.getItem("isDeveloper") === "true";
    setShouldTrack(!isDeveloper);
  }, []);

  // Return nothing if tracking is disabled or if we haven't mounted yet
  if (!shouldTrack) return null;

  return <Analytics />;
}
