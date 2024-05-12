'use client'

import { HiHeart, HiOutlineChat, HiOutlineTrash } from "react-icons/hi";


//todo : icons should be updated on likes and comment
const PostActionIcon = () => {
  return (
    <div className="flex justify-start gap-3 p-2 text-gray-500">
      <div className="flex items-center">
        <HiOutlineChat
          className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
        />
        <span>2</span>
      </div>
      <div className="flex items-center">
        <HiHeart
          className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
        />
        <span>4</span>
      </div>
      <HiOutlineTrash
        className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out py-2 hover:text-sky-500 hover:bg-sky-100'
      />
    </div>
  )
}

export default PostActionIcon;