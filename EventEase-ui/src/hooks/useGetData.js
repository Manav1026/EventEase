
import { useState, useEffect } from "react";


export const useGetData = (url) => {
    const [data, setData] = useState();


    useEffect(() => {
        fetch(url)
            .then((res) => {
               return res.json()
            })
            // .then((data) => setData(data));
            .then(setData);
    }, [url]);

    return {data}
};
