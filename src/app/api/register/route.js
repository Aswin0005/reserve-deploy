import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../utils/dbConnect';
const User = require('../../../../models/user');

export async function POST(request) {
  const data = await request.json();
  await dbConnect();
  console.log(data);
  const isEmail = await User.findOne({ email: data.email });
  if (isEmail) {
    return NextResponse.json({ msg: 'Email Already Exists' }, { status: 409 });
  }
  console.log(data);
  const isFirstUser = (await User.countDocuments({})) === 0;
  data.role = isFirstUser ? 'admin' : 'user';

  const user = await User.create(data);
  return NextResponse.json({ user }, { status: 200 });
}
