'use client'
import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from 'react-icons/fa6';
import { HiHome, HiDotsHorizontal } from 'react-icons/hi';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

// todo :HiDotsHorizontal
const LeftSide = () => {
  const { data: session } = useSession();

  return (
    <div className='flex justify-between p-3 flex-col h-screen sticky top-0'>
      <div className='flex flex-col gap-4'>
        <Link href="/">
          <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-300 rounded-full transition-all duration-200' />
        </Link>
        <Link href="/" className='flex items-center p-4 hover:bg-gray-300 rounded-full transition-all duration-200 gap-3 w-fit'>
          <HiHome className='w-8 h-8' />
          <span className="font-bold hidden xl:inline">Home</span>
        </Link>
        <button className='hidden xl:inline px-28 py-2 font-semibold rounded-full text-white bg-blue-400 hover:bg-blue-500' onClick={() => session ? signOut() : signIn()}>
          {session ? "Sign Out" : "Sign In"}
        </button>
      </div>
      {session && (
        <div className='flex items-center hover:bg-gray-300 gap-3 py-4 pl-4 rounded-full transition-all duration-200'>
          <div>
            {/* <HiHome className='w-10 h-10' /> */}
            <Image src={session.user.image} width={50} height={50} className='w-12 h-12 rounded-full'/>
          </div>
          <div className='leading-5 lg:flex flex-col hidden'>
            <p className='font-semibold uppercase'>{session.user.name}</p>
            <p>{session.user.email}</p> 
            {/* todo : need to fix it */}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeftSide