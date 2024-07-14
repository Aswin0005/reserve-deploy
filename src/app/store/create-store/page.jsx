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
    location: '',
    phoneno: null,
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
      data.append('location', formData.location);
      data.append('mobileno', formData.phoneno);
      data.append('file', formData.file);

      console.log('Form Data', data);
      await axiosApi.post('/store/create-store', data);
      setFormData({
        name: '',
        description: '',
        location: '',
        phoneno: '',
        file: {},
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  const getLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          location: `${position.coords.latitude}-${position.coords.longitude}`,
        });
      });
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
          Restaurant Details
        </div>
        {/* DishName */}
        <span className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-lg">
            Restaurant Name{' '}
          </label>
          <input
            type="text"
            placeholder="Restaurant Name"
            id="name"
            className="w-3/4 h-8 border-[1px] rounded-md px-2 "
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </span>
        {/* Description */}
        <span className="flex flex-col gap-1">
          <label htmlFor="desc" className="font-semibold text-lg">
            Restaurant Description
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

        {/* Restaurant Details*/}
        <span className="flex flex-col gap-1">
          <label htmlFor="address" className="font-semibold text-lg">
            Location
          </label>
          <button className="border-2" onClick={getLocation}>
            Get Current Location
          </button>
        </span>

        {/*Phone Number */}
        <span className="flex flex-col gap-1">
          <label htmlFor="phoneno" className="font-semibold text-lg">
            Restaurant Phone Number
          </label>
          <input
            type="text"
            placeholder="Food Price"
            id="phoneno"
            className="w-3/4 h-8 border-[1px] rounded-md px-2 "
            value={formData.phoneno}
            onChange={(e) =>
              setFormData({ ...formData, phoneno: e.target.value })
            }
          />
        </span>

        {/* File Upload */}
        <span className="flex flex-col gap-1">
          <label htmlFor="file" className="font-semibold text-lg">
            Restaurant Image
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
