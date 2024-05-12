import Image from 'next/image'
import React from 'react'
import PostActionIcon from './PostActionIcon'

export const Post = ({ post }) => {
  console.log("post", post)
  return (
    <>
      <div className='border-t-2 flex p-3'>
        <Image src={post.photo} width={60} height={60} alt="test" className='rounded-full h-[50px]' />
        <div className='flex flex-col gap-1 pl-4'>
          <div className='flex flex-row gap-1 items-center'>
            <h2 className='text-sm font-bold'>{post.creatorName}</h2>
            <p>{post.creatorEmail}</p>
          </div>
          <p>{post.content}</p>
          <Image src={post.ImgUrl} width={400} height={400} className={`w-full max-h-[350px] object-cover cursor-pointer py-3`} alt="test" />
          <PostActionIcon />
        </div>
      </div>
    </>
  )
}
