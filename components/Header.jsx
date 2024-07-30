'use client';
import { ShoppingCart, Menu } from 'feather-icons-react';
import Link from 'next/link';
import { Search } from 'react-feather';
import axios from 'axios';
import Error from 'next/error';
import { useState, useEffect } from 'react';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function Header({ totalUniqueItems }) {
  const handleLogOut = async () => {
    try {
      const response = await axiosApi.get('/logout');
    } catch (error) {
      throw new Error('Error Logging Out', error);
    }
  };
const restaurantdata =[
  {
    id: 1,
    name:"buhari"
  },
  {
    id:2,
    name:"Adayar Ananda Bhavan"
  },
  {
    id:3 ,
    name:"AL Bhazeer"
  },
  {
    id:4 ,
    name:"The Cake Shop"
  }
];

const [restaurant,setRestaurant] = useState('');
const handlesearch = document.getElementById('hotellist');
function handlesearching(e){
  if (handlesearch) {
    if(e.target.value ===""){
      handlesearch.style.display = 'none';
    }
    else{
      handlesearch.style.display = 'inline-block';

    }
  };
};


        

   

  return (
    <nav className=" whitespace-nowrap flex gap-6 bg-white h-14 items-center px-5 shadow-md sm:flex sm:bg-white sm:py-4 sm:px-4 sm:px-6 lg:px-8 sm:flex sm:items-center sm:justify-between sm:shadow-md  ">
      <h1 className="-ml-3 text-green-700 sm:text-2xl font-bold sm:mr-4">
        Re-Serve
      </h1>

      <div className="w-full -ml-3 sm:w-full sm:flex sm:flex-1 sm:ml-4 sm:space-x-2 xl:ml-20 relative">
        {/* <div className='absolute search-svg bg-no-repeat lg:h-5 lg:w-5 lg:mt-2 lg:ml-3.5 md:h-5 md:w-5 md:mt-2 md:ml-3.5 sm:h-4 sm:w-4 sm:mt-2 sm:ml-3.5'></div> */}
        <Search
          color="darkgray"
          className="absolute  bg-no-repeat lg:h-5 lg:w-5 lg:mt-2 lg:ml-3.5 md:h-5 md:w-5 md:mt-2 md:ml-3.5 sm:h-4 sm:w-4 sm:mt-2 sm:ml-3.5"
          size={3}
        />
        <div className='flex flex-col md:pl-7  text-sm px-2 py-[3px] sm:h-8  sm:my-auto w-[400px] sm:rounded-2xl sm:pl-7 sm:outline-none '>
        <input
          type="text"
          placeholder="Search Re-Serve"
          className=" md:pl-7  text-sm px-2 rounded-full py-[3px]  bg-slate-100 text-gray-400 sm:my-auto   outline-none "
          onChange={(e) =>{
            setRestaurant(e.target.value);
            handlesearching(e);            
          }}
        />
          <div id='hotellist' className='  text-sm  rounded-b-xl hidden  py-[3px] bg-slate-100 '>
              {restaurantdata.filter((hotel)=>(hotel.name.toLowerCase().includes(restaurant))).map((item)=>(
                      <li className='list-none text-gray-400 bg-slate-100 px-2 hover:bg-slate-300 hover:rounded-lg'key={item.id} >{item.name}</li>
                      
                  ))}
          </div>


        </div>
        
        <input
          type="text"
          placeholder="Location"
          className="w-[70px] text-sm px-2 rounded-full py-[3px] text-gray-400 sm:h-8 sm:w-[100px] md:w-[140px] lg:w-[220px] xl:w-[290px]  ml-2 bg-slate-100 text-gray-400 sm:my-auto sm:rounded-2xl sm:pl-3 sm:outline-none"
        />
      </div>

      <Link
        href={'/cart'}
        className=" sm:ml-auto sm:mr-4 2xl:mr-10 flex gap-1 "
      >
        <ShoppingCart size={20} color="green" />
        {totalUniqueItems > 0 && (
          <div className=" bg-green-700 px-2 rounded-full text-white text-sm">
            {totalUniqueItems}
          </div>
        )}
      </Link>

      <div className="hidden sm:flex">
        <button className="text-green-700 font-normal sm:text-sm bg-white border-2 border-green-700 sm:hover:bg-green-700 sm:hover:text-white sm:h-8 sm:w-20 sm:my-auto sm:px-3 sm:rounded-2xl sm:ml-2">
          <Link href="/login">Login</Link>
        </button>
        <button className="text-white font-normal sm:text-sm bg-green-700 sm:h-8 sm:w-20 sm:my-auto sm:px-3 sm:rounded-2xl sm:ml-2">
          <Link href="/register">Sign Up</Link>
        </button>
        <button
          onClick={handleLogOut}
          className="text-white font-normal sm:text-sm bg-green-700 sm:h-8 sm:w-20 sm:my-auto sm:px-3 sm:rounded-2xl sm:ml-2"
        >
          Log Out
        </button>
      </div>

      <div className="sm:hidden">
        <Menu size={20} color="green" />
      </div>
    </nav>
  );
}

export default Header;
