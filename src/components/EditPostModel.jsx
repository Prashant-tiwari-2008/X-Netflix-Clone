'use client'
import { PostmodalState, postEditState } from '@/atom/postModalAtom';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { HiX } from 'react-icons/hi';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '@/utils/firebase';
import { useSession } from 'next-auth/react';

const EditPostModel = () => {
    const{data:session} = useSession();
    const [open, setOpen] = useRecoilState(PostmodalState)
    const [post, setPost] = useRecoilState(postEditState)
    const [editText, setEditText] = useState('')
    const [selectedFile, setSelectedFile] = useState();
    const [imageFileUrl, setImageFileUrl] = useState();
    const imagePickRef = useRef(null);

    useEffect(() => {
        setImageFileUrl(post.image)
        setEditText(post.content);
    },[])


    useEffect(() => {
        if (selectedFile) {
          uploadImageToFirebase();
        }
      }, [selectedFile])

    const updatePhoto = () => {
        const storage = getStorage();
        const desertRef = ref(storage, post.image);
        deleteObject(desertRef).then(() => {
            imagePickRef.current.click();
            // uploadImageToFirebase();
        }).catch((error) => {
            // Uh-oh, an error occurred!
            alert("error in deleting the image", error)
        });
    }

    const addImageToPost = (e) => {
        debugger
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    const uploadImageToFirebase = () => {
        alert("inside the uplaod image")
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
                    alert("image uploaded successfully !")
                    console.log(downloadURL, "downloadURL")
                    setImageFileUrl(downloadURL);
                })
            }
        )
    };

    const updatePost = async () => {
        debugger
        console.log("content after uploaidn g",editText)
        console.log("content after imageFu",imageFileUrl)
        let docRef = doc(db, 'posts', post.id)
        await updateDoc(docRef, {
            uid: session.user.uid,
            name: session.user.name,
            username: session.user.name,
            content: editText,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
            image: imageFileUrl
        });
        setEditText('');
        setOpen(false);
        window.location.reload();
    }

    return (
        <div>
            {open && (
                <Modal isOpen={open} onRequestClose={() => setOpen(false)} ariaHieApp={false}
                    className='max-w-2xl w-[100%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-black rounded-xl shadow-md'>
                    <div className='p-4'>
                        <div className='flex justify-between items-center'>
                            <span className='text-lg font-semibold'>Edit Post</span>
                            <HiX className='text-2xl font-semibold text-gray-700 hover:bg-gray-200 rounded-full cursor-pointer float-right' onClick={() => setOpen(false)} />
                        </div>
                        <div className='border-b-2 border-gray-200 py-1 px-1.5'>
                        </div>
                        <div className='p-2 flex items-center space-x-1 relative'>
                            {/* <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' /> */}
                            <Image src={post?.profileImg} width={45} height={45} alt="user-img" className='h-11 w-11 rounded-full mr-4' />
                            <h4 className='font-bold sm:text-[16px] text-[15px] hover:underline truncate'>
                                {post?.name}
                            </h4>
                            <span className='text-sm sm:text-[15px] truncate'>
                                @{post?.username}
                            </span>
                        </div>
                        <div className='w-full border-b-2'>
                            <span >Post : </span>
                            <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[60px] text-gray-700 outline-none p-1" maxLength="280" spellCheck="false" defaultValue={editText} onChange={(e) => setEditText(e.target.value)}></textarea>
                        </div>
                        <div className=''>
                            <Image src={imageFileUrl} width={400} height={400} className={`w-full max-h-[400px] cursor-pointer p-3 rounded-md`} alt="uploaded-img" />
                            {/* <Image src={post.image} width={400} height={400} className={`w-full max-h-[350px] object-cover cursor-pointer py-3`} alt="test" /> */}
                        </div>
                        <div className='flex gap-4 justify-end'>
                            <input ref={imagePickRef} onChange={addImageToPost} hidden accept='image/*' type="file" />
                            <button className="bg-blue-400 text-white py-2 px-3 265rounded-lg font-bold shadow-md hover:brightness-95 disabled:opacity-50" onClick={() => updatePhoto()}>Update Photo</button>
                            <button className="bg-green-600 text-white py-2 px-3  rounded-lg font-bold shadow-md hover:brightness-95 disabled:opacity-50" onClick={() => updatePost()}>Update Post</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default EditPostModel;