import { NextResponse } from 'next/server';
import { cookiesParse } from '../../../../../utils/cookies';
import UnAuthorizedError from '../../../../../errors/unauthorizedError';
import { dbConnect } from '../../../../../utils/dbConnect';
import BadRequestError from '../../../../../errors/badRequestErrror';
import formidable from 'formidable';
import { writeFile } from 'fs';
const path = require('path');
import Product from '../../../../../models/product';

export async function POST(request) {
  //Check Whether is logged in Or not
  //   const isAuthenticated = await cookiesParse(request);

  //   //Onlyl if the user is a Restaurant owner, then product creation is Allowed
  //   if (!isAuthenticated) {
  //     return UnAuthorizedError('UnAuthenticated');
  //   }

  //Connect To Database
  try {
    await dbConnect();

    //Paring the data from client
    const data = await request.formData();
    console.log('Data', data);
    const file = data.get('file');
    if (!file) {
      return BadRequestError('Must Include File');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Current', __dirname);

    //Move the incoming File(Image) into the Public Folder
    const imgPath = path.join(
      __dirname,
      '../../../../../../public/' + `${file.name}`
    );
    await writeFile(imgPath, buffer, (err) => console.log(err));

    console.log('Aaa Name', await data.get('name'));
    const dbProduct = {
      name: await data.get('name'),
      description: await data.get('description'),
      pickuptime: await data.get('pickuptime'),
      price: await data.get('price'),
      imageurl: `/${file.name}`,
    };

    const product = await Product.create(dbProduct);

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log('ErrorNode', error);

    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
