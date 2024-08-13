import { useState } from "react";
import axios from "axios";

// Base URL
const baseURL = "http://localhost:6080"; // Replace with your base URL

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (endpoint, data, method) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${baseURL}${endpoint}`;
      const result = await axios({ method, url, data });
      setResponse(result.data);
      return result.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendRequest };
};

export default useAxios;
