'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

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

  return (
    <ul>
      <li>{dishDetails._id}</li>
      <li>{dishDetails.name}</li>
      <li>{dishDetails.imageurl}</li>
      <li>{dishDetails.pickuptime}</li>
      <li>{dishDetails.price}</li>
    </ul>
  );
};

export default SingleDish;
