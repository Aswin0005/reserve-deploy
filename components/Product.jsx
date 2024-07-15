'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function Product({ product }) {
  const [cart, setCart] = useState({});
  const isFirstRender = useRef(true);

  const handleCardAdd = (id) => {
    setCart({ productId: id, quantity: 1 });
  };

  //To Check is Object is Empty or not
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    console.log(isFirstRender.current);
    const updateDbCart = async () => {
      try {
        const { data } = await axiosApi.post('/cart', cart);
        console.log('Updated Card', data);
      } catch (error) {
        console.log('Error Updating Cart', error);
      }
    };

    if (!isEmpty(cart)) {
      updateDbCart();
    }
  }, [cart]);

  return (
    <div>
      <li
        key={product._id}
        className="flex items-start space-x-4 hover:shadow-xl"
      >
        <div className="flex flex-col w-2/3 gap-3">
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm">{product.description}</p>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {/* <span className='line-through text-gray-500'>${product.oldPrice}</span> */}
              <span>₹{product.price}</span>
            </div>
            {/* <button className='mr-12 p-1 px-5 bg-green-700 rounded-full text-white'>Add</button> */}
            {/* {cart.includes(product) ? (
                            <button onClick={removeCart} className='mr-12 p-1 px-5 border font-semibold border-green-700 text-green-700 rounded-full '>Remove</button>
                        ) : <button onClick={addCart} className='mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold' >Add</button>
                        } */}
            <button
              className="mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold"
              onClick={() => handleCardAdd(product._id)}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <Image
            src={product.imageurl}
            width={160}
            height={160}
            alt={product.name}
            className="h-40 w-40 object-cover rounded-xl"
          />
        </div>
      </li>
      <Cart cart={cart} />
    </div>
  );
}

export default Product;
