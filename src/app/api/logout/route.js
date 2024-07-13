const { cookies } = require('next/headers');
import { NextResponse } from 'next/server';
import { cookiesParse } from '../../../../utils/cookies';
const Token = require('../../../../models/token');

export async function GET(request) {
  const isAuthorized = await cookiesParse(request);
  console.log('AUTh', isAuthorized._id); 
  const tokenDelete = await Token.findOneAndDelete({ user: isAuthorized._id });
  cookies().delete('refreshToken');
  cookies().delete('accessToken');
  return NextResponse.json({ msg: 'SuccessFully Logged Out' }, { status: 200 });
}
