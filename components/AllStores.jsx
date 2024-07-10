import a_biryani from "../public/assets/a_biryani.jpg";
import b_friedChicken from "../public/assets/b_friedChicken.jpg";
import c_pizza from "../public/assets/c_pizza.jpg";
import d_iceCream from "../public/assets/d_iceCream.jpg";
import e_dosa from "../public/assets/e_dosa.jpg";
import f_donuts from "../public/assets/f_donuts.jpg";
import g_noodles from "../public/assets/g_noodles.jpg";
import h_rolls from "../public/assets/h_rolls.jpg";

import star_review from "../public/assets/star_review.png";
import fav_false from "../public/assets/fav_false.png";
import fav_true from "../public/assets/fav_true.png";

import Image from "next/image";

const restaurantData = [
  {
    id: 1,
    image: a_biryani,
    name: "A Hotel",
    distance: 7.2,
    pickupTime: "9:45 - 11:30",
    review: 4.2,
    favourites: false,
  },
  {
    id: 2,
    image: b_friedChicken,
    name: "B Hotel",
    distance: 4.9,
    pickupTime: "10:00 - 2:00",
    review: 4.7,
    favourites: true,
  },
  {
    id: 3,
    image: c_pizza,
    name: "C Hotel",
    distance: 5.6,
    pickupTime: "9:30 - 11:30",
    review: 3.8,
    favourites: false,
  },
  {
    id: 4,
    image: d_iceCream,
    name: "D Hotel",
    distance: 9.2,
    pickupTime: "9:30 - 12:00",
    review: 2.1,
    favourites: false,
  },
  {
    id: 5,
    image: e_dosa,
    name: "E Hotel",
    distance: 3.3,
    pickupTime: "9:45 - 1:30",
    review: 3.3,
    favourites: true,
  },
  {
    id: 6,
    image: f_donuts,
    name: "F Hotel",
    distance: 6.1,
    pickupTime: "10:15 - 11:45",
    review: 4.5,
    favourites: false,
  },
  {
    id: 7,
    image: g_noodles,
    name: "G Hotel",
    distance: 2.9,
    pickupTime: "9:45 - 12:00",
    review: 3.2,
    favourites: false,
  },
  {
    id: 8,
    image: h_rolls,
    name: "H Hotel",
    distance: 7.6,
    pickupTime: "10:30 - 2:30",
    review: 4.4,
    favourites: false,
  },
  {
    id: 9,
    image: a_biryani,
    name: "A Hotel",
    distance: 7.2,
    pickupTime: "9:45 - 11:30",
    review: 4.2,
    favourites: false,
  },
  {
    id: 10,
    image: b_friedChicken,
    name: "B Hotel",
    distance: 4.9,
    pickupTime: "10:00 - 2:00",
    review: 4.7,
    favourites: false,
  },
  {
    id: 11,
    image: c_pizza,
    name: "C Hotel",
    distance: 5.6,
    pickupTime: "9:30 - 11:30",
    review: 3.8,
    favourites: false,
  },
  {
    id: 12,
    image: d_iceCream,
    name: "D Hotel",
    distance: 9.2,
    pickupTime: "9:30 - 12:00",
    review: 2.1,
    favourites: true,
  },
  {
    id: 13,
    image: e_dosa,
    name: "E Hotel",
    distance: 3.3,
    pickupTime: "9:45 - 1:30",
    review: 3.3,
    favourites: false,
  },
  {
    id: 14,
    image: f_donuts,
    name: "F Hotel",
    distance: 6.1,
    pickupTime: "10:15 - 11:45",
    review: 4.5,
    favourites: false,
  },
  {
    id: 15,
    image: g_noodles,
    name: "G Hotel",
    distance: 2.9,
    pickupTime: "9:45 - 12:00",
    review: 3.2,
    favourites: true,
  },
  {
    id: 16,
    image: h_rolls,
    name: "H Hotel",
    distance: 7.6,
    pickupTime: "10:30 - 2:30",
    review: 4.4,
    favourites: false,
  },
];

function AllStores() {
  return (
    <div className="m-2 sm:m-6 md:m-8 lg:m-12 xl:m-12 ">
      <h2 className="text-2xl font-custom2 mb-4 mx-4">All Stores</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {restaurantData.map((info) => (
          <li key={info.id} className="bg-white hover:shadow-xl rounded-2xl p-4 my-1 relative">
            <Image className="w-full h-40 object-cover rounded-2xl" src={info.image} alt={`Food at ${info.name}`} />
            <button className="absolute top-7 left-7">
              <Image src={info.favourites ? fav_true : fav_false} alt="" className="h-6 w-6" />
            </button>
            <div className="px-0 pt-2 flex space-x-38 sm:space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-0"> {/* --- */}
              <div className="" style={{ width: "202px" }}>  {/* ------flex sm:block md:block lg:block xl:block */}
                <p className="text-lg font-custom2 font-medium">{info.name}</p>
                <p className="text-sm pt-1 text-gray-600">Pickup {info.pickupTime}</p>
              </div>
              <div>
                <div className="flex">
                  <Image src={star_review} alt="star" className="h-5 w-5 my-auto" />
                  <p className="text-md text-2xl mx-auto">{info.review}</p>
                </div>
                <p className="mx-auto text-sm text-gray-600">{info.distance}km away</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
}

export default AllStores;