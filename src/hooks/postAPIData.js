import { useState } from "react";
import axios from "axios";

const postAPIData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (url, headers, dataToSend) => {
    setError(null);
    setData(null);

    setLoading(true);

    try {
      const res = await axios.post(url, dataToSend, { headers });

      setData(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, sendData };
};

export default postAPIData;
