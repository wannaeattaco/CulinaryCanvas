import { useEffect, useState } from "react";

function useNotifier() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!message && !error) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setMessage("");
      setError("");
    }, 2600);

    return () => window.clearTimeout(timeout);
  }, [message, error]);

  return {
    message,
    error,
    setMessage,
    setError,
  };
}

export default useNotifier;
