'use client';
import { useRef, useState } from 'react';
import { HiHome, HiOutlinePhotograph } from 'react-icons/hi';
import testImage from '../../public/banner.jpg'
import Image from 'next/image';

const NewPost = () => {
  let test = '';
  const imagePickRef = useRef(null); // todo : need to study about it
  const [selectedFile, setSelectedFile] = useState(true);

  console.log("test", testImage)
  return (
    <div>
      <div className='flex'>
        <HiHome className='w-11 h-11 rounded-full py-1 px-3 bg-gray-500 m-2' />
        {/* todo : after class should be added */}
        <div>
          <textarea class="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 outline-none" rows="2" placeholder="What's happening?" maxlength="280" spellcheck="false"></textarea>

          {selectedFile &&
            // todo : need to add animation and learn
            <Image src={testImage} className={`w-full max-h-[350px] object-cover cursor-pointer p-3 rounded-md`} alt="test" />
          }
          {/* todo : importnt to learn */}
          <div className='flex justify-between w-full'>
            <HiOutlinePhotograph className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'
              onClick={() => imagePickRef.current.click()}
            />
            <input ref={imagePickRef} hidden accept='image/*' type="file" />
            <button className='bg-blue-200 font-bold py-2 px-4 rounded-full cursor-pointer mr-3 text-white' disabled={true}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost  