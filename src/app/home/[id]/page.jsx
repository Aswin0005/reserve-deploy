'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';


import biryani_banner from "../../../../public/a_biryani.jpg";
import g_noodles from "../../../../public/g_noodles.jpg";
import c_pizza from "../../../../public/c_pizza.jpg";
import e_dosa from "../../../../public/e_dosa.jpg";
import h_rolls from "../../../../public/h_rolls.jpg";

import fav_false from "../../../../public/fav_false.png";
import fav_true from "../../../../public/fav_true.png";
import star_review from "../../../../public/star_review.png";

// pages/_app.js
import { MapContainer, TileLayer, Marker, Popup, /* useMap */ } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import Product from '../../../../components/Product';
import Image from 'next/image';
import Header from '../../../../components/Header';


// import PropTypes from "prop-types";

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const data = [
  {
    id: '1',
    image: biryani_banner,
    name: 'ABCD Hotel',
    description: "The ABCD Hotel's restaurant is a culinary oasis, where every dish is crafted with passion and precision. Nestled within the hotel's stylish ambiance, it offers a delightful blend of local flavors and international cuisine. From gourmet breakfasts to indulgent dinners, each meal is a sensory journey, complemented by impeccable service and a welcoming atmosphere.",
    address: "Shop No.102 Door, 2nd, 3rd Tower Victorie, 45, Gopathi Narayanaswami Chetty Rd, Lakshimi Colony, T. Nagar, Chennai, Tamil Nadu 600017.",
    mobile: 9879021372,
    pickup: '10:00 - 12:45',
    favourites: false,
    review: 4.2,
    latitude: 51.510246,
    longitude: -0.127192,
    food: [
      {
        id: '101',
        image: g_noodles,
        name: 'Noodles',
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis mollitia ducimus aut nulla tempora impedit consectetur ea in sunt rerum.",
        oldPrice: 230,
        newPrice: 110,
      },
      {
        id: '102',
        image: c_pizza,
        name: 'Pizza',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa placeat omnis ea necessitatibus, eveniet architecto autem sint volupt!",
        oldPrice: 495,
        newPrice: 225,
      },
      {
        id: '103',
        image: e_dosa,
        name: 'Dosa',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam reprehenderit aperiam, cupiditate illum aut excepturi modi nihil ipsam qu?",
        oldPrice: 120,
        newPrice: 50,
      },
      {
        id: '104',
        image: h_rolls,
        name: 'Shawarma',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, nihil blanditiis sunt atque, quos illum tempora ducimus eum eos labo.",
        oldPrice: 150,
        newPrice: 75,
      },
      {
        id: '105',
        image: g_noodles,
        name: 'Noodles',
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis mollitia ducimus aut nulla tempora impedit consectetur ea in sunt rerum.",
        oldPrice: 230,
        newPrice: 110,
      },
      {
        id: '106',
        image: c_pizza,
        name: 'Pizza',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa placeat omnis ea necessitatibus, eveniet architecto autem sint volupt!",
        oldPrice: 495,
        newPrice: 225,
      },
      {
        id: '107',
        image: e_dosa,
        name: 'Dosa',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam reprehenderit aperiam, cupiditate illum aut excepturi modi nihil ipsam qu?",
        oldPrice: 120,
        newPrice: 50,
      },
      {
        id: '108',
        image: h_rolls,
        name: 'Shawarma',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, nihil blanditiis sunt atque, quos illum tempora ducimus eum eos labo.",
        oldPrice: 150,
        newPrice: 75,
      },
      {
        id: '109',
        image: g_noodles,
        name: 'Noodles',
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis mollitia ducimus aut nulla tempora impedit consectetur ea in sunt rerum.",
        oldPrice: 230,
        newPrice: 110,
      },
      {
        id: '110',
        image: c_pizza,
        name: 'Pizza',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa placeat omnis ea necessitatibus, eveniet architecto autem sint volupt!",
        oldPrice: 495,
        newPrice: 225,
      },
      {
        id: '111',
        image: e_dosa,
        name: 'Dosa',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam reprehenderit aperiam, cupiditate illum aut excepturi modi nihil ipsam qu?",
        oldPrice: 120,
        newPrice: 50,
      },
      {
        id: '112',
        image: h_rolls,
        name: 'Shawarma',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, nihil blanditiis sunt atque, quos illum tempora ducimus eum eos labo.",
        oldPrice: 150,
        newPrice: 75,
      },
    ],
  },
];

const SingleDish = () => {
  const params = useParams();
  const [dishDetails, setDishDetails] = useState({});

  useEffect(() => {
    const fetchDishDetails = async (id) => {
      try {
        const { data } = await axiosApi.get(`/food/get-food/${id}`);
        console.log(data);
        setDishDetails(data);
      } catch (error) {
        throw new Error('Error Fetching Data ', error);
      }
    };

    fetchDishDetails(params.id);
  }, []);

  // return (
  //   <ul>
  //     <li>{dishDetails._id}</li>
  //     <li>{dishDetails.name}</li>
  //     <li>{dishDetails.imageurl}</li>
  //     <li>{dishDetails.pickuptime}</li>
  //     <li>{dishDetails.price}</li>
  //   </ul>
  // );

  const [selectedRestaurantId,/*  setSelectedRestaurantId */] = useState('1');
  const selectedRestaurant = data.find(item => item.id === selectedRestaurantId);

  if (!selectedRestaurant) return <p className='h-screen flex justify-center items-center'>Restaurant not found!</p>;


  return (
    <>
      <Header />
      <div className="m-8 mx-20">
        <div className="flex space-x-16">
          <div className="mb-0 max-w-3xl">
            <div className="relative rounded-3xl overflow-hidden">
              <Image src={selectedRestaurant.image} alt="" className="h-52 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
              <div className="absolute inset-0 text-white flex justify-between items-end m-1 mx-5">
                <div className='flex space-x-3'>
                  <h2 className="text-3xl font-medium ">{selectedRestaurant.name}</h2>
                  <p className='text-sm flex items-end pb-1'>{selectedRestaurant.pickup}</p>
                </div>
                <div className='flex my-1  space-x-1'>
                  <Image src={star_review} alt='' className='h-7 w-7 my-auto' />
                  <p className='flex items-end gap-1'><span className='text-2xl'>{selectedRestaurant.review}</span>/5</p>
                </div>
              </div>
              <button className='absolute top-3 left-3'>
                <Image src={selectedRestaurant.favourites ? fav_true : fav_false} alt="" className="h-6 w-6" />
              </button>
            </div>
            <p className="text-wrap mt-4 px-2 font-sans text-[15px]">{selectedRestaurant.description}</p>
          </div>
          <div className="bg-yellow-100 w-5/12 h-80 flex flex-col justify-between rounded-2xl overflow-hidden">
            <div className="h-4/5">
              <MapContainer center={[selectedRestaurant.latitude, selectedRestaurant.longitude]} zoom={14} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[selectedRestaurant.latitude, selectedRestaurant.longitude]} >
                  <Popup>
                    {selectedRestaurant.name}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="p-4 text-wrap border-t-2 border-gray-700 font-sans italic">
              <p><span className='font-semibold font-sans'>Phone: </span>+91 {selectedRestaurant.mobile}</p>
              <p><span className='font-semibold font-sans'>Address: </span>{selectedRestaurant.address}</p>
            </div>
          </div>
        </div>
        <div className="mt-16 px-2">
          <p className="font-semibold text-2xl text-center mb-12">Food Menu</p>
          <ul className="grid grid-cols-2 gap-8">
            {selectedRestaurant.food.map((product) => (
              <Product key={product.id} product={product} /*cart={cart} setCart={setCart}*/ />
            ))}
          </ul>
        </div>
      </div >
    </>
  )
};

export default SingleDish;
