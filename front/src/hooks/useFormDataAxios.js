import { useState } from "react";
import axios from "axios";

// Base URL
const baseURL = import.meta.env.VITE_BASE_URL; // Replace with your base URL
//const baseURL = "http://localhost:8080"; // Replace with your base URL

const useFormDataAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (endpoint, formData, method) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${baseURL}${endpoint}`;

      const result = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(result.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendRequest };
};

export default useFormDataAxios;
