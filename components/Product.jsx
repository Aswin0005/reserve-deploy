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
    setCart({ productId: id, quantity: quantity, restaurantId: resId });

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

            <button onClick={() => handleCardAdd(product._id, -1)}>
              Minus
            </button>
            <button
              className="mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold"
              onClick={() => handleCardAdd(product._id, 1)}
            >
              {isEmpty(dbCart)
                ? 'Add'
                : dbCart.items.map((e) => {
                    if (e.productId === product._id) {
                      return e.quantity;
                    }
                  })}
            </button>
            <button onClick={() => handleCardAdd(product._id, 1)}>Plus</button>
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
