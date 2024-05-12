'use client';
import { useRef, useState } from 'react';
import { HiHome, HiOutlinePhotograph } from 'react-icons/hi';
import testImage from '../../public/banner.jpg'
import Image from 'next/image';

const NewPost = () => {
  let test = '';
  const imagePickRef = useRef(null); // todo : need to study about it
  const [selectedFile, setSelectedFile] = useState(true);

  return (
    <div>
      <div className='flex'>
        <HiHome className='w-14 h-12 rounded-full py-1 px-3 bg-gray-500 m-2' />
        {/* todo : after class should be added */}
        <div>
          <div className='w-full border-b-2'>
            <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[60px] text-gray-700 outline-none" placeholder="What's happening?" maxLength="280" spellCheck="false"></textarea>
          </div>

          {selectedFile &&
            // todo : need to add animation and learn
            <Image src={testImage} className={`w-full max-h-[350px] object-cover cursor-pointer p-3 rounded-md`} alt="test" />
          }
          {/* todo : importnt to learn */}
          <div className='flex justify-between w-full pb-3'>
            <HiOutlinePhotograph className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'
              onClick={() => imagePickRef.current.click()}
            />
            <input ref={imagePickRef} hidden accept='image/*' type="file" />
            <button className='bg-blue-200 font-bold py-2 px-5 rounded-full cursor-pointer mr-3 text-white' disabled={true}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost  