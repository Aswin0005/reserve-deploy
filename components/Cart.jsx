'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const Cart = ({ cart }) => {
  //To Identify Pathname
  const currentPath = usePathname();

  const [dbCart, setDbCart] = useState({});
  const [currentCart, setCurrentCart] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const resId = useRef('');

  const [isShow, setIsShow] = useState(false);

  //To Check is Object is Empty or not
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  //Fetch Cart Data from DB Whenever Cart state changes
  useEffect(() => {
    const cartDbFetch = async () => {
      try {
        console.log('Updating.....');
        const { data } = await axiosApi.get('/cart/get-cart');
        resId.current = data.fromrestaurant;
        const productData = await axiosApi.get(
          `/food/get-food-restaurant/${data.fromrestaurant}`
        );
        setDbCart(data);
        setProductDetails(productData.data);
      } catch (error) {
        console.log('Cart Updating Error', error);
      }
    };
    console.log('Cart', cart);
    //Fetch only When Cart has Something
    if (!isEmpty(cart) || cart === undefined) {
      cartDbFetch();
    }
  }, [cart]);

  //Display the Cart Component Only when the Pathname is /cart
  useEffect(() => {
    if (currentPath === '/cart') {
      setIsShow(true);
    }
  }, []);

  //Update the Current Cart
  useEffect(() => {
    const updateDbCart = async () => {
      try {
        const { data } = await axiosApi.post('/cart', currentCart);
      } catch (error) {
        console.log('Error Updating Cart', error);
      }
    };

    //Update Only when the Current Cart is Updated
    if (!isEmpty(currentCart)) {
      updateDbCart();
    }
  }, [currentCart]);

  //Handle Cart Update
  const handleQuantityUpdate = (id, quantity) => {
    console.log(resId.current);
    setCurrentCart({
      productId: id,
      quantity: quantity,
      restaurantId: resId.current,
    });

    //Updating Db cart immediately to reflect the updated Quantity on page
    setDbCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId === id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ),
    }));
  };

  return (
    <main>
      {isShow &&
        (isEmpty(dbCart) ? (
          <div>Empty Cart</div>
        ) : (
          <ul>
            {dbCart.items?.map((e, i) => (
              <div key={i}>
                <li className="font-bold"></li>
                {e.productId}
                <button
                  className="ml-4"
                  onClick={() => handleQuantityUpdate(e.productId, -1)}
                >
                  Minus
                </button>
                <button className="font-bold">{e.quantity}</button>

                <button onClick={() => handleQuantityUpdate(e.productId, 1)}>
                  Plus
                </button>
              </div>
            ))}
          </ul>
        ))}
    </main>
  );
};

export default Cart;
