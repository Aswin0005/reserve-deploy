'use client';
import { useState } from 'react';
import { Inter } from 'next/font/google';
const axios = require('axios');

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const inter400 = Inter({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pickupstarttime: '',
    pickupendtime: '',
    price: '',
    file: {},
  });

  console.log(formData);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append(
        'pickuptime',
        `${formData.pickupstarttime}-${formData.pickupendtime}`
      );
      data.append('price', formData.price);
      data.append('file', formData.file);

      console.log('Form Data', data);
      await axiosApi.post('/food/create-food', data);
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };
  return (
    <main
      className={`${inter400.className} w-screen h-screen flex justify-center items-center bg-green-700 `}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col border-[1px] rounded-lg p-6 bg-white shadow-lg gap-4"
      >
        <div className="text-center font-bold text-2xl text-green-900">
          Dish Details
        </div>
        {/* DishName */}
        <span className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-lg">
            Dish name{' '}
          </label>
          <input
            type="text"
            placeholder="Food Name"
            id="name"
            className="w-3/4 h-8 border-[1px] rounded-md px-2 "
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </span>

        {/* Dish Description */}
        <span className="flex flex-col gap-1">
          <label htmlFor="desc" className="font-semibold text-lg">
            Dish Description
          </label>
          <input
            type="text"
            placeholder="Food Description"
            id="desc"
            className="w-3/4 h-8 border-[1px] rounded-md px-2 "
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </span>

        {/* PickUp Time Between TakeAway */}
        <span className="flex flex-col gap-1">
          <label htmlFor="time" className="font-semibold text-lg">
            PickUp Between
          </label>
          <span className="flex ">
            <input
              type="time"
              placeholder="PickUp Time"
              id="time"
              className="w-2/4 h-8 border-[1px] rounded-md px-2 "
              value={formData.pickupstarttime}
              onChange={(e) =>
                setFormData({ ...formData, pickupstarttime: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="PickUp Time"
              id="time"
              className="w-2/4 h-8 border-[1px] rounded-md px-2 "
              value={formData.pickupendtime}
              onChange={(e) =>
                setFormData({ ...formData, pickupendtime: e.target.value })
              }
            />
          </span>
        </span>

        {/* Price */}
        <span className="flex flex-col gap-1">
          <label htmlFor="price" className="font-semibold text-lg">
            Dish Price
          </label>
          <input
            type="text"
            placeholder="Food Price"
            id="price"
            className="w-3/4 h-8 border-[1px] rounded-md px-2 "
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </span>

        {/* File Upload */}
        <span className="flex flex-col gap-1">
          <label htmlFor="file" className="font-semibold text-lg">
            Dish Image
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files?.[0] })
            }
          />
        </span>

        <button
          type="submit"
          className="border-[1px] p-2 bg-black text-white  font-semibold rounded-lg hover:bg-green-200 hover:text-green-800"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
