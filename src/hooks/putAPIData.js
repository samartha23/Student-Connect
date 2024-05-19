import { useState } from "react";
import axios from "axios";

const putAPIData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (url, headers, dataToSend) => {
    setError(null);
    setData(null);

    setLoading(true);

    try {
      const res = await axios.put(url, dataToSend, { headers });

      setData(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, updateData };
};

export default putAPIData;
