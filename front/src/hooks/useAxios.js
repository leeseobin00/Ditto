import { useState } from "react";
import axios from "axios";

// Base URL
const baseURL = import.meta.env.VITE_BASE_URL; // Replace with your base URL

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (
    endpoint,
    data,
    method,
    additionalOptions = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${baseURL}${endpoint}`;
      const result = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type":
            data instanceof FormData
              ? "multipart/form-data"
              : "application/json",
          ...additionalOptions.headers, // 추가된 헤더 병합
        },
      });
      setResponse(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendRequest };
};

export default useAxios;
