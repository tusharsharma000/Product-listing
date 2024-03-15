"use client"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

export default function PostPage({ params } ) {
  // console.log(params.id);
    // const router = useRouter();
    const [product, setProduct] = useState({});
    useEffect(() => {
      const FetchData = async() => {
        try {
          const id = params.id;
          console.log(id);
          const response = await fetch(`https://fakestoreapi.com/products/${id}`, {cache: "force-cache"});
          const product = await response.json();
          setProduct(product);
          // return product;
        } catch (error) {
          console.error('Error fetching products:', error);
          return {}
        }
      }
      FetchData();
    }, []);
    return <div className="container mx-auto">
    <div className="bg-white p-6 rounded shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full"
            whileHover={{ scale: 1.2 }}
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-800">{product.description}</p>
          {/* Include interactive elements/buttons for adding to cart or favoriting */}
        </div>
      </div>
    </div>
  </div>;
  }