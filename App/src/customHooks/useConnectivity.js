import { useEffect, useState } from "react";

export function useConnectivity() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleConnectivityEvent() {
      setOnline(navigator.onLine);
    }

    window.addEventListener("online", handleConnectivityEvent);
    window.addEventListener("offline", handleConnectivityEvent);
    return () => {
        window.removeEventListener("online", handleConnectivityEvent);
        window.removeEventListener("offline", handleConnectivityEvent)
    }
  });

  return online;
}