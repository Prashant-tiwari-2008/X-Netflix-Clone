'use client'
import { db } from '@/utils/firebase'
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi'

const CommentCard = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]); // [1
  const [isEditComment, setIsEditComment] = useState(false); // [1
  const [EditedComment, setEditedComment] = useState(false); // [1

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session?.user.uid))
      } else {
        await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp()
        })
      }
    } else {
      signIn();
    }
  }

  useEffect(() => {
    onSnapshot(collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    )
  }, [db])

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const deleteComment = () => {
    if (window.confirm(`Are you sure, you want to delete this post?`)) {
      if (comment?.name == session.user.name) {
        deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId)).then(() => {
          console.log("comment deleted successfully");
        }).catch((error) => {
          console.log("error in delteing comment", error)
        })
      }
    }
  }

  const updateComment = async () => {
    let docRef = doc(db, 'posts', originalPostId, 'comments', commentId)
    await updateDoc(docRef, {
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      comment: EditedComment,
      timestamp: serverTimestamp(),
    })
    setEditedComment('');
    setIsEditComment(false)
  }

  return (
    <div className='flex p-3 border-y border-gray-200 hover:bg-gray-50 pl-10'>
      <Image src={comment.userImg} width={36} height={36} alt='user-img' className='h-9 w-9 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
            <span className='text-xs truncate'>@{comment?.username}</span>
          </div>
        </div>

        {isEditComment ? (
          <div className='flex gap-1 w-full'>
            <input className='w-full border-[1px] border-black px-3 py-1 rounded-md' type="text" defaultValue={comment?.comment} onChange={(e) => setEditedComment(e.target.value)} />
            <button className='bg-green-600 text-white  px-3  rounded-lg font-bold shadow-md hover:brightness-95 disabled:opacity-50' onClick={updateComment}>Update</button>
          </div>)
          : (
            <p className='text-gray-500 text-xs my-3'>{comment?.comment}</p>
          )
        }


        <div className='flex items-center'>
          {isLiked ? (
            <HiHeart onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition text-red-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
            />
          ) : (
            <HiOutlineHeart onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition text-gray-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && 'text-red-600'}`}>
              {likes.length}
            </span>
          )}

          {session && comment?.name == session.user.name ? <HiOutlineTrash
            className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out py-2 hover:text-sky-500 hover:bg-sky-100'
            onClick={deleteComment}
          /> : ""}

          {session && comment?.name == session.user.name ? <FaEdit
            className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out py-2 hover:text-sky-500 hover:bg-sky-100'
            onClick={() => setIsEditComment(true)}
          /> : ""}
        </div>
      </div>
    </div>
  )
}

export default CommentCard