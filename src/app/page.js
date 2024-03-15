'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


export async function getProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', { cache: 'force-cache' });
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []
  }
}

export default function Home() {
  const [products, setProducts]= useState([]);
  useEffect(() => {
    const FetchData = async() => {
      try {
        const response = await fetch('https://fakestoreapi.com/products', { cache: 'force-cache' });
        const product = await response.json();
        setProducts(product);
        // return product;
      } catch (error) {
        console.error('Error fetching products:', error);
        return {}
      }
    }
    FetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, key) => (
        <Link href={`product-detail/${product.id}`}>
        <motion.div
          key={key}
          className="bg-pink-100 rounded shadow-md overflow-hidden"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          // transition={{ duration: 0.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover object-center"
          />
          <div className="p-4">
            <div className="text-gray-900 font-semibold">{product.title}</div>
            <div className="text-gray-600">${product.price}</div>
          </div>
        </motion.div>
        </Link>
      ))}
    </div>
  </div>
  );
}