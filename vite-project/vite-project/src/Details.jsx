import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [pro, setPro] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setPro(data);
      })
      .catch((err) => console.log("Error fetching data.", err));
  }, [id]);
  return <div>
<div>
    <h1>{pro.title}</h1>
    <p>{pro.price}</p>
    <p>{pro.category}</p>
</div>

  </div>;
};

export default Details;
