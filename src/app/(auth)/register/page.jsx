"use client"
import Link from 'next/link';
import img1 from '../../../../public/assets/img1.jpg';
import Image from 'next/image';
import googleicon from '../../../../public/assets/googleicon.png'

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
  return <main className="h-screen w-screen flex justify-center items-center bg-slate-100" >
  <div className="bg-white md:w-5/6 lg:w-4/6 h-[500px]  rounded-3xl flex md:gap-1  lg:gap-2 shadow-2xl ">
    <div className="lg:pt-6 md:basis-1/2 basis-full pl-5 pr-3 pt-6 md:px-2  ">
    <div className="ml-4 pl-2 font-serif font-bold text-2xl ">RE-SERVE</div>
    <h1 className="mt-2 px-6 font-semibold italic ">WELCOME!</h1>
      <form className="flex flex-col md:space-y-3 lg:space-y-4 space-y-4 px-6 pt-4 pb-3  ">
        <div className='flex font-sans '>
          <label for='role' className='text-base font-sans mr-3 '>Select your role</label>
          <select name='role' className='shadow-xl rounded-md px-1 py-1  focus:outline-none'>
            <option value="" selected disabled hidden  >Select</option>
            <option value="user">User</option>
            <option value="restaurant-owner">Restaurant Owner</option>
          </select>
        </div>
        <input type='text' placeholder='Enter your Name' className="px-2 py-2 rounded-md text-sm shadow-md focus:outline-none" />
        <input type="text" placeholder="Enter your email" className="px-2 py-2 rounded-md shadow-md text-sm focus:outline-none" />
        <input type="password" placeholder=" Create your password" className="px-2 py-2 rounded-md text-sm shadow-md focus:outline-none"/>
        <div className="flex justify-between items-center">
          <div>
            <input type="checkbox" name="remember-me" className="mr-1 size-3"/>
            <label for="remember-me" className="font-light md:text-xs lg:text-sm text-sm ">Remember me</label>
          </div>
        </div> 
      </form>
      <div className="flex flex-col space-y-2 px-6  justify-center items-center lg:mb-[1px]">
        <button className="bg-green-500 text-white rounded-lg text-sm px-4 py-2 drop-shadow-md
         hover:bg-green-600 hover:text-base  ">Register</button>
        <p className='text-xs'>Or</p>
        <button className="bg-white text-sm text-black  rounded-lg px-4 py-2 drop-shadow-md hover:text-base ">Continue with <Image src={googleicon} alt='google-icon' className='h-6 w-7 inline-block pl-1'/></button>  
      </div> 
      <div>
        <p className="px-6 font-light text-xs pt-3">Already have an account ? <span className="font-medium text-xs hover:underline"><Link href='/login' >Login</Link></span></p>
      </div>
     

    </div>
    <div className="md:block hidden  md:pt-5 md:pr-3 text-wrap">
    <div className='flex flex-col justify-end text-wrap' >
                        <div>
                                <Image src={img1}  alt='loginimage' className='rounded-lg h-[450px] md:w-[350px] lg:w-[400px] relative object-cover blur-[1px]' />                          
                        </div>
                        <div className='absolute lg:w[100px] text-white md:w-[350px] px-5 pb-5'>
                            <h1 className='pb-3 font-bold text-3xl'>RE-SERVE</h1>
                            <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sapiente praesentium a repellat ullam quo magni dolorum voluptas officia eveniet labore ex obcaecati doloribus, pariatur neque. Modi quam vel reprehenderit?</p>
                        </div>     
                        
                    </div>
       
    </div>
  </div>
</main> ;
};

export default Register;
