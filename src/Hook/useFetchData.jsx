import { useState } from 'react';
const url = `${process.env.REACT_APP_SPRING_BOOT_IP}`;

// Custom hook to fetch data from the server when triggered
const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = (newData) =>{
    if(!data)
    setData( newData );
    else
    setData(prev=> [...prev, newData])
  }

  const fetchData = async (route, method = 'GET', body = null) => {
    try {
      setLoading(true);

      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
           // Adjust the content type as per your server's requirements
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(`${url}${route}`, options);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const jsonData = await response.json();

      setData(jsonData);
      return jsonData;
    
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, updateData, loading, error, fetchData };
};

export default useFetchData;
