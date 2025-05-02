import { redirect } from "react-router-dom";
import { isTokenExpired, getToken, setToken } from "../auth/tokens";

const refreshTokens = async (refreshToken: string) => {
  const data = {
    clientId: "web-app",
    refreshToken,
  };

  const response = await fetch("https://api.lk-umiter.ru/v1/public/user/auth/refresh/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to refresh tokens");

  return response.json();
};

export const sessionLoader = async () => {
  if (isTokenExpired("access")) {
    if (isTokenExpired("refresh")) return redirect("/login");

    const refreshToken = getToken("refresh");
    if (!refreshToken) return redirect("/login");

    try {
      const { accessToken, refreshToken: newRefreshToken } = await refreshTokens(refreshToken);
      setToken("access", accessToken);
      setToken("refresh", newRefreshToken);
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      return redirect("/login");
    }
  }
  return true;
};