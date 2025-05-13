import { useState, useEffect } from "react";

export const useGetData = (url, token) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    url,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!res.ok) throw new Error("Failed to fetch data");
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // fetch(url, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then(setData);
    }, [url]);

    return { data, loading, error };
};
