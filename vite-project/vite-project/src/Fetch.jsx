import { useEffect, useState } from "react";

const Fetch = () => {
    const [response, setResponse] = useState([]);
    const [displayCount, setDisplayCount] = useState(10);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDUyODM5LCJpYXQiOjE3MTcwNTI1MzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBmMTE3ZDUyLTk0NTQtNDEyNi1iNGJmLTllNDNmZDY2YWE1MyIsInN1YiI6ImhpbGRhaW5maUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjBmMTE3ZDUyLTk0NTQtNDEyNi1iNGJmLTllNDNmZDY2YWE1MyIsImNsaWVudFNlY3JldCI6IlNrVEt3c3ZRT3VZb2p2aUkiLCJvd25lck5hbWUiOiJJbmZhbnQgSGlsZGEgRCIsIm93bmVyRW1haWwiOiJoaWxkYWluZmlAZ21haWwuY29tIiwicm9sbE5vIjoiNDIifQ.jf9kzVa-SLYUAdXcZ52xmkfR2JrROJVSViTOBk4zT2k";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

               
                console.log('API response:', data);

                
                if (Array.isArray(data)) {
                    setResponse(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setResponse([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setResponse([]);
            }
        };

        fetchData();
    }, [token]);

    const handleSortByPrice = () => {
        const sortedData = [...response].sort((a, b) => a.price - b.price);
        setResponse(sortedData);
    };

    const handleDisplayCountChange = (e) => {
        setDisplayCount(Number(e.target.value));
    };

    return (
        <>
            <div className="prodconunt">
                <button onClick={handleSortByPrice}>Sort by Price</button>

                <select onChange={handleDisplayCountChange} value={displayCount}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                </select>

                <input 
                    type="number" 
                    value={displayCount} 
                    onChange={e => setDisplayCount(Number(e.target.value))} 
                    placeholder="Enter number of products" 
                />

                {Array.isArray(response) && response.slice(0, displayCount).map((data, index) => (
                    <div key={index} className="prodcont">
                        <h1>{data.productName}</h1>
                        <p>ID: {data.id}</p>
                        <p>Price: ${data.price}</p>
                        <p>Rating: {data.rating}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Fetch;
