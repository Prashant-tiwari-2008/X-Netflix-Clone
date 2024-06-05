'use client';
import { useEffect, useRef, useState } from 'react';
import { HiHome, HiOutlinePhotograph } from 'react-icons/hi';
import testImage from '../../public/banner.jpg'
import { storage, db } from '@/utils/firebase';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const NewPost = () => {
  const { data: session } = useSession();
  console.log(session, "session  ")
  const imagePickRef = useRef(null); // todo : need to study about it
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState('');
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToFirebase();
    }
  }, [selectedFile])

  function uploadImageToFirebase() {
    const storage = getStorage();
    const fileName = selectedFile.name + "-" + new Date().getTime();
    const storageRef = ref(storage, `post/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log("error in uploadin image", error);
        setImageFileUrl(null);
        setSelectedFile(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL, "downloadURL")
          setImageFileUrl(downloadURL);
        })
      }
    )
  }

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, 'posts'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.name,
      content: text,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl
    });
    setText('');
    setImageFileUrl(null);
    setSelectedFile(null);
    location.reload()
  }
  
  return (
    <div>
      <div className='flex w-full'>
        {session && <Image src={session.user.image} width={50} height={50} className='w-11 h-11 rounded-full m-2' />}
        {/* todo : after class should be added */}
        <div className='w-full px-1'>
          <div className='w-full border-b-2 mb-2'>
            <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[60px] text-gray-700 outline-none p-1" placeholder="What's happening?" maxLength="280" spellCheck="false" onChange={(e) => setText(e.target.value)}></textarea>
          </div>

          {selectedFile &&
            // todo : need to add animation and learn
            <Image src={imageFileUrl} width={400} height={400} className={`w-full max-h-[350px] object-cover cursor-pointer p-3 rounded-md`} alt="uploaded-img" />
          }
          {/* todo : importnt to learn */}
          <div className='flex justify-between w-full pb-3'>
            <HiOutlinePhotograph className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'
              onClick={() => imagePickRef.current.click()}
            />
            <input ref={imagePickRef} onChange={addImageToPost} hidden accept='image/*' type="file" />
            {/* <button className='bg-blue-500 font-bold py-2 my-1 px-5 rounded-full cursor-pointer mr-3 text-white disabled:opacity-0.5' disabled={true}>Post</button> */}
            <button className="bg-blue-400 text-white px-5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" disabled={(text.trim === '' || imageFileUrl === null)} onClick={handleSubmit}>Post</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost  