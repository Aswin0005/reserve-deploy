'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function Product({ product, resId }) {
  const [dbCart, setDbCart] = useState({});
  const [cart, setCart] = useState({});
  const isFirstRender = useRef(true);

  const handleCardAdd = (id, quantity) => {
    setDbCart((prevCart) => ({
      ...prevCart,
      items: !isEmpty(prevCart)
        ? prevCart.items.map((item) =>
            item.productId === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [{ productId: id, quantity: quantity }],
    }));
    setCart({ productId: id, quantity: quantity, restaurantId: resId });
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
    const cartDbFetch = async () => {
      try {
        console.log('Updating.....');
        const { data } = await axiosApi.get('/cart/get-cart');
        setDbCart(data);
      } catch (error) {
        console.log('Cart Updating Error', error);
      }
    };
    //Fetch only When Cart has Something
    console.log('isFirst', isFirstRender.current);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      cartDbFetch();
    }
  }, []);

  //Update DB When change is made
  useEffect(() => {
    const updateDbCart = async () => {
      try {
        const { data } = await axiosApi.post('/cart', cart);
        console.log('Updated Data', data);
        setDbCart(data);
      } catch (error) {
        console.log('Error Updating Cart', error);
      }
    };
    console.log('CArt', cart);
    if (!isEmpty(cart)) {
      updateDbCart();
    }
  }, [cart]);

  const currentCartQuantity = (currProductId) => {
    let resultQuantity;
    if (!isEmpty(dbCart)) {
      resultQuantity = dbCart.items.find((e) => e.productId === currProductId);
    }
    return resultQuantity
      ? resultQuantity.quantity !== 0
        ? resultQuantity.quantity
        : 'Add'
      : 'Add';
  };

  return (
    <div>
      <li
        key={product._id}
        className="flex items-start space-x-4 border-b-2 border-white hover:border-gray-300 rounded-lg p-3"
      >
        <div className="flex flex-col w-2/3 gap-3">
          <p className="font-semibold text-2xl ">{product.name}</p>
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

            <div className="space-x-2 mr-3">
              {currentCartQuantity(product._id) !== 'Add' && (
                <button
                  className="px-2 bg-green-700 text-slate-50 rounded-sm"
                  onClick={() => handleCardAdd(product._id, -1)}
                >
                  -
                </button>
              )}
              <button
                /* className="mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold" */
                className="px-2 bg-slate-100"
                onClick={() => handleCardAdd(product._id, 1)}
              >
                {`${currentCartQuantity(product._id)}`}
              </button>
              {currentCartQuantity(product._id) !== 'Add' && (
                <button
                  className="px-2 bg-green-700 text-slate-50 rounded-sm"
                  onClick={() => handleCardAdd(product._id, 1)}
                >
                  +
                </button>
              )}
            </div>
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
      {/* <Cart cart={cart} /> */}
    </div>
  );
}

export default Product;
