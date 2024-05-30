import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/produ');
                const data = await res.json();
                setProducts(data);
                setDisplayedProducts(data.slice(0, limit));
            } catch (err) {
                console.log('Error fetching data.', err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filteredProducts = products;

        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (sort === 'price') {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'rating') {
            filteredProducts = filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    }, [category, sort, page, limit, products]);

    const handleCategory = (e) => {
        setCategory(e.target.value);
        setPage(1); // Reset to first page when category changes
    };

    const handleSort = (e) => {
        setSort(e.target.value);
    };

    const handlePage = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(products.length / limit)) {
            setPage(newPage);
        }
    };

    return (
        <div className='container'>
            <h1>All Products</h1>
            <div className='filters'>
                <label>
                    Category:
                    <select value={category} onChange={handleCategory}>
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelry</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </label>
                <label>
                    Sort by:
                    <select value={sort} onChange={handleSort}>
                        <option value="">None</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                        <option value="discount">Discount</option>
                    </select>
                </label>
            </div>
            <div className='product-list'>
                {displayedProducts.map(product => (
                    <div key={product.id} className='product'>
                        <h2>{product.productName}</h2>
                        <p>ID: {product.id}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating.rate}</p>
                       < p>Discount: {product.discount}</p>
                        <Link to={`/product/${product.id}`}>View details</Link>
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <button disabled={page === 1} onClick={() => handlePage(page - 1)}>Previous</button>
                <button onClick={() => handlePage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default AllProducts;
