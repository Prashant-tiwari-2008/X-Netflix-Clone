'use client'

import { modalState, postIdState } from "@/atom/modalAtom";
import { db } from "@/utils/firebase";
import { Timestamp, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import NewPost from "./NewPost";
import EditPostModel from "./EditPostModel";
import { PostmodalState, postEditState } from "@/atom/postModalAtom";

const PostActionIcon = ({ post,post : { id, username, uid }}) => {
  debugger
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [editModal, setEditModal] = useRecoilState(PostmodalState)
  const [editPostId, setEditPostId] = useRecoilState(postEditState);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  /**
   * get the no of likes and set the value
   */
  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    })
  }, [db])

  /**
   * 
   */
  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
  }, [likes])

  /**
   * get the comments
   */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', id, 'comments'),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, id])

  const addLikes = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp()
        })
      }
    } else {
      signIn();
    }
  }


  const deletePost = () => {
    if (window.confirm(`Are you sure, you want to delete this post?`)) {
      if (session?.user?.uid === uid) {
        deleteDoc(doc(db, 'posts', post.id)).then(() => {
          console.log('Document successfully deleted');
          window.location.reload();
        }).catch((error) => {
          console.log('Error removing document : ', error);
        })
      } else {
        alert('you are not authorized to delete this post')
      }
    }

  }


  return (
    <div className="flex justify-start gap-3 p-2 text-gray-500">
      <div className="flex items-center">
        <HiOutlineChat
          className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
          onClick={() => {
            if (!session) {
              signIn()
            } else {
              setOpen(!open)
              setPostId(id)
            }
          }
          }
        />
        {comments.length > 0 ? (
          <span className='text-xs'>{comments.length}</span>
        ) : (
          <span className='text-xs'>0</span>
        )}
      </div>
      <div className="flex items-center">
        {isLiked ? (
          <>
            <HiHeart
              className='h-8 w-8 cursor-pointer rounded-full text-red-600  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
              onClick={addLikes}
            />
          </>
        ) : (
          <>
            <HiOutlineHeart
              className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
              onClick={addLikes}
            />
          </>
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && 'text-red-600'}`}>
            {likes.length}
          </span>
        )}
      </div>

      {session && username == session.user.name ? <HiOutlineTrash
        className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out py-2 hover:text-sky-500 hover:bg-sky-100'
        onClick={deletePost}
      /> : ""}

      {session && username == session.user.name ? <FaEdit
        className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out py-2 hover:text-sky-500 hover:bg-sky-100'
        onClick={() => {
          setEditModal(true)
          setEditPostId(post)
        }
        }
      /> : ""}
    </div>
  )
}

export default PostActionIcon;