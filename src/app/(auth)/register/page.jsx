"use client"

const axios = require('axios');

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const onSubmit = async () => {
  try {
    const response = await axiosApi.post('/register', {
      name: 'Developer',
      email: 'dev2@gmail.com',
      password: '12345678',
    });
    console.log(response)
  } catch (error) {
    console.log('Error',error)
  }
};

const Register = () => {
  return <main>Register</main>;
};

export default Register;
