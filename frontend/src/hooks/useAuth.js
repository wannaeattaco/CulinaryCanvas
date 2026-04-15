import { useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser, setAuthToken } from "../api";
import { emptyAuthForm } from "../utils/forms";
import { formatApiError } from "../utils/errors";

function useAuth({ setError, setMessage }) {
  const [authForm, setAuthForm] = useState(emptyAuthForm);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }

    setAuthToken(token);
    getCurrentUser()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setAuthToken(null);
        window.localStorage.removeItem("token");
      });
  }, []);

  const handleAuthFormChange = (field, value) => {
    setAuthForm((current) => ({ ...current, [field]: value }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (authMode === "register") {
        await registerUser(authForm);
        setMessage("Account created. You can log in now.");
        setAuthMode("login");
        setAuthForm({ ...emptyAuthForm, username: authForm.username });
        return;
      }

      const response = await loginUser({
        username: authForm.username,
        password: authForm.password,
      });
      window.localStorage.setItem("token", response.data.access_token);
      setAuthToken(response.data.access_token);
      setUser(response.data.user);
      setMessage(`Welcome back, ${response.data.user.username}.`);
      setAuthForm(emptyAuthForm);
    } catch (requestError) {
      setError(
        formatApiError(
          requestError,
          authMode === "login" ? "Unable to log in." : "Unable to register right now."
        )
      );
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    window.localStorage.removeItem("token");
    setUser(null);
    setMessage("Logged out.");
  };

  return {
    authForm,
    authMode,
    user,
    setAuthMode,
    handleAuthFormChange,
    handleAuthSubmit,
    handleLogout,
    setUser,
  };
}

export default useAuth;
