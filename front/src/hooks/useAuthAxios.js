import { useState } from "react";
import { useDispatch } from "react-redux";
import { refresh, logout, sessionExpired } from "../features/auth/authSlice";
import axios from "axios";
import Cookies from "js-cookie";

// Base URL
const baseURL = import.meta.env.VITE_BASE_URL; // Replace with your base URL
// const baseURL = "http://localhost:8080";

const useAuthAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const sendAuthRequest = async (endpoint, data, method) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${baseURL}${endpoint}`;
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      const result = await axios({
        method,
        url,
        data,
        headers,
      });
      setResponse(result.data);
      return result.data;
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refreshToken = Cookies.get('refreshToken');
          if (!refreshToken) {
            dispatch(sessionExpired());
            throw err;
          }

          const response = await axios.post(`${baseURL}/users/refresh-token`, {
            refreshToken,
          });

          const newAccessToken = response.data.data;
          dispatch(refresh(newAccessToken));
          localStorage.setItem('accessToken', newAccessToken);

          // Retry the original request with new access token
          const retryResult = await axios({
            method,
            url: `${baseURL}${endpoint}`,
            data,
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          setResponse(retryResult.data);
          return retryResult.data;
        } catch (refreshError) {
          dispatch(logout());
          throw refreshError;
        }
      } else {
        setError(err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendAuthRequest };
};

export default useAuthAxios;
