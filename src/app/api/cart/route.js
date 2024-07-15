import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../utils/dbConnect';
import { cookiesParse } from '../../../../utils/cookies';
import UnAuthorizedError from '../../../../errors/unauthorizedError';
import Cart from '../../../../models/cart';

export async function POST(request) {
  const isAuthenticated = await cookiesParse(request);

  if (!isAuthenticated) {
    return UnAuthorizedError('Not Authorized ');
  }
  try {
    await dbConnect();
    const { productId, quantity } = await request.json();
    const cart = await Cart.findOne({ userId: isAuthenticated._id });
    if (cart) {
      const productIndex = cart.items.findIndex(
        (i) => i.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
        cart.total += quantity;
      } else {
        cart.items.push({ productId, quantity });
        cart.total += quantity;
      }

      await cart.save();
      console.log('Cart updated successfully');
    } else {
      const cartContent = {
        userId: isAuthenticated._id,
        items: [{ productId, quantity }],
        total: 1,
      };
      const newCart = await Cart.create(cartContent);
      console.log('New cart created and product added');
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.log('Error API', error);
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
