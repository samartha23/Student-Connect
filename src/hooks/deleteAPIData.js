import { useState } from "react";
import axios from "axios";

const deleteAPIData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url, headers) => {
    setError(null);
    setData(null);

    setLoading(true);

    try {
      const res = await axios.delete(url, { headers });

      setData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, deleteData };
};

export default deleteAPIData;
