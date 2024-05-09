import Image from 'next/image'
import React from 'react'

const NewsCard = ({ title, imageUrl, source }) => {
  return (
    <div className='w-full flex items-center border-t-[1px] border-black p-3'>
        <div className='flex flex-col'>
        <p className='text-sm font-bold leading-5'>{title}</p>
        <p className='text-sm font-normal'>{source.name}</p>
        </div>
      <Image src={imageUrl} alt='banner' width={90} height={50} className='rounded-lg' />
    </div>
  )
}

export default NewsCard