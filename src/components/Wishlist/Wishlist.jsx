import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";
import magnifier from "../../assets/magnifier.png";
function Wishlist() {
  const wishlistData = useSelector((state) => state.auth.wishlistData);
  const [data, setData] = useState([]);
  useEffect(() => {
    service.getWishlistedCourses(wishlistData).then((res) => {
      if (res) {
        setData(res.documents);
      }
    });
  }, [wishlistData]);
  return (
    <div className="pt-12 pb-24 bg-gray-900 text-white min-h-lvh">
      <div>
        <h1 className=" text-3xl font-semibold font-poppins tracking tracking-wide mt-10 ml-24 text-white">
          Wishlist
        </h1>
      </div>
      <div className=" ">
        <div className=" grid grid-cols-3 place-items-center  max-lg:grid-cols-2 max-md:grid-cols-1 gap-1">
          {data.length != 0
            ? data.map((course) => {
                return (
                  <div key={course.$id}>
                    <Card course={course} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {data.length == 0 ? (
        <div className=" flex justify-center align-middle bg-gray-900 w-full h-full py-[17.3rem]">
          <div className="">
            <h1 className=" text-center text-4xl text-purple-400 font-poppins">
              No results found
            </h1>
            <p className=" text-center text-gray-400 font-poppins">
              add courses to wishlist
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Wishlist;
