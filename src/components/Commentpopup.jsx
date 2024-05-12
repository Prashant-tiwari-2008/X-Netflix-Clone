'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { HiX } from 'react-icons/hi';
import Modal from 'react-modal';

//todo : need to create the comment section
const Commentpopup = () => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const post = {
    photo: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fprashanttiwari.jpg?alt=media&token=caf8f603-0b19-44cd-99b9-b29ae453d9ac",
    creatorName: "Prashant tiwari",
    creatorEmail: "@prashanttiwari",
    content: "hi there I am here just for testing the project",
    ImgUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fbanner.jpg?alt=media&token=83d88f32-1171-465d-aa45-e2804850f2ba"
  }

  return (
    <div>
      {open && (
       <Modal
       isOpen={open}
       onRequestClose={() => setOpen(false)}
       ariaHideApp={false}
       className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
     >
       <div className='p-4'>
         <div className='border-b border-gray-200 py-2 px-1.5'>
           <HiX
             className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer'
             onClick={() => setOpen(false)}
           />
         </div>
         < div className='p-2 flex items-center space-x-1 relative'>
           <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
           <img
             src={post?.photo}
             alt='user-img'
             className='h-11 w-11 rounded-full mr-4'
           />
           <h4 className='font-bold sm:text-[16px] text-[15px] hover:underline truncate'>
             {post?.creatorName}
           </h4>
           <span className='text-sm sm:text-[15px] truncate'>
             @{post?.creatorEmail}
           </span>
         </div>
         <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>
           {post?.content}
         </p>
         <div className='flex p-3 space-x-3'>
           <img
             src={post.photo}
             alt='user-img'
             className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
           />
           <div className='w-full divide-y divide-gray-200'>
             <div>
               <textarea
                 className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500'
                 placeholder='Whats happening'
                 rows='2'
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
               ></textarea>
             </div>
             <div className='flex items-center justify-end pt-2.5'>
               <button
                 className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                 disabled={input.trim() === ''}
                //  onClick={sendComment}
               >
                 Reply
               </button>
             </div>
           </div>
         </div>
       </div>
     </Modal>
      )}
    </div>
  )
}

export default Commentpopup