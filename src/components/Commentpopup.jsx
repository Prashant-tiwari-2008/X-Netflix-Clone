'use client'
import { modalState, postIdState } from '@/atom/modalAtom';
import { db } from '@/utils/firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';

const Commentpopup = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [input, setInput] = useState('');
  const [post, setPost] = useState({});
  const { data: session } = useSession()
  const router = useRouter();
  console.log("postId", postId)

  useEffect(() => {
    debugger
    console.log("post id in comment popup", postId)
    if (postId !== '') {
      const postRef = doc(db, 'posts', postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log("No such document!")
        }
      });
      return () => unsubscribe();
    }
  }, [postId])

  const sendComment = async () => {
    addDoc(collection(db, 'posts', postId, 'comments'), {
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      comment: input,
      timestamp: serverTimestamp(),
    }).then(() => {
      setInput('');
      setOpen(false);
      router.push(`/posts/${postId}`);
    }).catch((error) => {
      console.error('Error adding document : ', error)
    })
  }

  return (
    <>
      {open && (
        <Modal isOpen={open} onRequestClose={() => setOpen(false)} ariaHideApp={false} className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-500 rounded-xl shodow-md'>
          <div className='p-4'>
            <div className='boder-b border-gray-200 py-2 px-1.5'>
              <HiX className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer float-right mb-2" onClick={() => setOpen(false)} />
            </div>
            <div className='p-2 flex items-center space-x-1 relative'>
              {/* //todo : need to learn */}
              <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
              <Image src={post?.profileImg} width={45} height={45} alt="user-img" className='h-11 w-11 rounded-full mr-4' />
              <h4 className='font-bold sm:text-[16px] text-[15px] hover:underline truncate'>
                {post?.name}
              </h4>
              <span className='text-sm sm:text-[15px] truncate'>
                @{post?.username}
              </span>
            </div>
            <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>{session.user.content}</p>

            {/* todo : need to learn about space-x-3 */}
            <div className='flex p-3 space-x-3'>
              <Image src={session.user.image} width={45} height={45} alt="user=img" className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95' />
              <div className='w-full divide-y divide-gray-200'>

                <div>
                  <textarea
                    className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500"
                    placeholder="what's happening"
                    row="2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className='flex items-center justify-end pt-2.5'>
                  <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50' disabled={input.trim() === ''} onClick={sendComment}>Reply</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Commentpopup