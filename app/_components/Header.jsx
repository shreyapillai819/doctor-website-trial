"use client"
import Image from "next/image";
import React,{useEffect} from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink,LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact",
      path: "/contact",
    },
  ];

  const {user} = useKindeBrowserClient();

  useEffect(()=>{
      console.log(user);
  },[user])

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src="/logo.png" alt="logo" height={40} width={80} />
        </Link>
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-110 transition-all ease-in-out font-bold">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {user?
      
      <Popover>
       <PopoverTrigger>
       {user?.picture? 
       <Image src={user?.picture} alt='profile-image'
       width={40}
       height={40}
       className='rounded-full' />:
       <Image src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} alt='profile-image'
       width={40}
       height={40}
       className='rounded-full' />}
       </PopoverTrigger>
       <PopoverContent className="w-44">
           <ul className='flex  flex-col gap-2'>
          
           <Link href={'/my-booking'} className='cursor-pointer
            hover:bg-slate-100 p-2 rounded-md'>My Booking</Link>
               <li className='cursor-pointer
            hover:bg-slate-100 p-2 rounded-md'>
               <LogoutLink> Logout </LogoutLink></li>
           </ul>
       </PopoverContent>
       </Popover>
      :
       <LoginLink> <Button>Get Started</Button></LoginLink>
      } 
      
      
    </div>
  );
};

export default Header;
