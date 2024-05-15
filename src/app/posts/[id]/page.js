import Comments from '@/components/Comments';
import { Post } from '@/components/Post';
import { db } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'

const PostPage = async({params}) => {

  let data = {};
  const querySnapshot = await getDoc(doc(db,'posts',params.id))
  data ={...querySnapshot.data(),id : querySnapshot.id};

  
  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-gray-500'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2 flex gap-2'>
          <HiArrowLeft className='h-6 w-6' />
          <h1 className='sm:text-lg font-semibold'>Back</h1>
        </Link>
      </div>
      <Post post={data} />
      <Comments  id={params.id} />
    </div>
  )
}

export default PostPage