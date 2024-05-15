'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi'

const CommentCard = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]); // [1

  const likePost = async () => {

  }

  return (
    <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10'>
      <Image src={comment.userImg} width={36} height={36} alt='user-img' className='h-9 w-9 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
            <span className='text-xs truncate'>@{comment?.username}</span>
          </div>
          <HiDotsHorizontal className='text-sm' />
        </div>

        <p className='text-gray-500 text-xs my-3'>{comment?.comment}</p>
        <div className='flex items-center'>
          {isLiked ? (
            <HiHeart onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition text-red-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
            />
          ) : (
            <HiOutlineHeart onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition text-red-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && 'text-red-600'}`}>
              {likes.length}
            </span>
          )}
        </div>

        {/* <div className='flex items-center'>
          { session.user.uid === }
        </div> */}
      </div>
    </div>
  )
}

export default CommentCard