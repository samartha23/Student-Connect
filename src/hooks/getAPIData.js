import axios from "axios";
import { useEffect, useState } from "react";

const getAPIData = (url, headers) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await axios.get(url, headers);

        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export default getAPIData;
