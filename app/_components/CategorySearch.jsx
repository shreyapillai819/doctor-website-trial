"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    });
  };
  return (
    <div className="mb-10 items-center flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors </span>{" "}
      </h2>
      <h2 className="text-gray-500 text-xl px-1">
        Search Your Doctor and Book Appointment in one click
      </h2>

      <div className="flex px-5 w-full max-w-sm items-center space-x-2 mt-2 ">
        <Input type="email" placeholder="Search..." />
        <Button type="submit">
          <Search className="mr-2 w-4 h-4" />
          Search
        </Button>
      </div>
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 ">
        {categoryList.length > 0
          ? categoryList.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    href={"/search/" + item.attributes.Name}
                    key={index}
                    className="flex 
          flex-col text-center items-center
          p-5 bg-blue-50 m-2 rounded-lg cursor-pointer
          gap-2 hover:scale-110 transition-all ease-in-out"
                  >
                    <Image
                      src={item.attributes?.Icon?.data.attributes?.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className="text-blue-600 text-sm">
                      {item?.attributes?.Name}
                    </label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                className=" bg-slate-200 m-2
       w-[130px] h-[120px] rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;
