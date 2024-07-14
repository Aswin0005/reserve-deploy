
// import PropTypes from 'prop-types';
// import { cartContext } from './App';
// import { useContext } from 'react';
import Image from "next/image";

function Product({ product }) {

    // const { cart, setCart } = useContext(cartContext);

    // const addCart = () => {
    //     setCart([...cart, product]);
    // };
    // const removeCart = () => {
    //     setCart(cart.filter((c) => c.name !== product.name));
    // };
    // console.log(product)

    return (
        <div>
            <li key={product.name} className="flex items-start space-x-4 hover:shadow-xl">
                <div className="flex flex-col w-2/3 gap-3">
                    <p className="font-semibold">{product.name}</p>
                    <p className='text-sm'>{product.description}</p>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <span className='line-through text-gray-500'>${product.oldPrice}</span>
                            <span>${product.newPrice}</span>
                        </div>
                        {/* <button className='mr-12 p-1 px-5 bg-green-700 rounded-full text-white'>Add</button> */}
                        {/* {cart.includes(product) ? (
                            <button onClick={removeCart} className='mr-12 p-1 px-5 border font-semibold border-green-700 text-green-700 rounded-full '>Remove</button>
                        ) : <button onClick={addCart} className='mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold' >Add</button>
                        } */}
                        <button className='mr-12 p-1 px-5 bg-green-700 rounded-full text-white font-semibold'>Add</button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Image
                        src={product.image}
                        alt={product.name}
                        className="h-40 w-40 object-cover rounded-xl"
                    />
                </div>
            </li>
        </div>
    )
}


// Product.propTypes = {
//     product: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         pickupTime: PropTypes.string.isRequired,
//         review: PropTypes.number.isRequired,
//         newPrice: PropTypes.number.isRequired,
//         oldPrice: PropTypes.number.isRequired,
//         distance: PropTypes.number.isRequired,
//         // Add other required properties here
//     }).isRequired,
//     cart: PropTypes.arrayOf(PropTypes.object).isRequired,
//     setCart: PropTypes.func.isRequired,
// };


export default Product
