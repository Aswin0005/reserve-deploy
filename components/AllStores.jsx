'use client';

import star_review from '../public/assets/star_review.png';
import fav_false from '../public/assets/fav_false.png';
import fav_true from '../public/assets/fav_true.png';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function AllStores() {
  const [restaurantData, setRestaurantData] = useState([]);

  //Fetching all Food Data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data } = await axiosApi.get('/food/get-food');
        setRestaurantData(data);
      } catch (error) {
        throw new Error('Error Fetching Data ', error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="m-2 sm:m-6 md:m-8 lg:m-12 xl:m-12 ">
      <h2 className="text-2xl font-custom2 mb-4 mx-4">All Stores</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {restaurantData.map((info) => (
          <Link
            href={`/home/${info._id}`}
            key={info._id}
            className="bg-white hover:shadow-xl rounded-2xl p-4 my-1 relative"
          >
            <Image
              src={info.imageurl}
              width={160}
              height={160}
              className="w-full h-40 object-cover rounded-2xl"
              alt={`Food at ${info.name}`}
            />
            <button className="absolute top-7 left-7">
              <Image
                src={info.favourites ? fav_true : fav_false}
                alt=""
                className="h-6 w-6"
              />
            </button>
            <div className="px-0 pt-2 flex space-x-38 sm:space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-0">
              {' '}
              {/* --- */}
              <div className="" style={{ width: '202px' }}>
                {' '}
                {/* ------flex sm:block md:block lg:block xl:block */}
                <p className="text-lg font-custom2 font-medium">{info.name}</p>
                <p className="text-sm pt-1 text-gray-600">
                  Pickup {info.pickuptime}
                </p>
              </div>
              <div>
                <div className="flex">
                  <Image
                    src={star_review}
                    alt="star"
                    className="h-5 w-5 my-auto"
                  />
                  <p className="text-md text-2xl mx-auto">{info.review}</p>
                </div>
                <p className="mx-auto text-sm text-gray-600">
                  {info.distance}km away
                </p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AllStores;
