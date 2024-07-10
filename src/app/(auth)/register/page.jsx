'use client';
const axios = require('axios');

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const onSubmit = async () => {
  try {
    const response = await axiosApi.post('/register', {
      name: 'Developer',
      email: 'devp9@gmail.com',
      password: '12345678',
    });
  } catch (error) {
    console.log(error.response.data.error);
  }
};

const LogOut = async () => {
  try {
    const response = await axiosApi.get('/logout');
    console.log(response);
  } catch (error) {
    console.log(error.response.data.error);
  }
};

const Register = () => {
  return (
    <>
      <button className='bg-red-300' onClick={onSubmit}>Submit</button>;
      <button onClick={LogOut}>LogOut</button>
    </>
  );
};

export default Register;
