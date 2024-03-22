import { useState, useEffect } from "react";

export default function useFetch(url) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  useEffect(() => {
    let abortController = new AbortController(); // for clean up function
    let signal = abortController.signal;
    setLoading(true);
    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Something Went Wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      });

    // clean up function
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}
