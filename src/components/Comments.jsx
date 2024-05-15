'use client'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard';
import { db } from '@/utils/firebase';

const Comments = ({ id }) => {

  const [comment, setComment] = useState([]);

  useEffect(() => {
    if (id) {
      onSnapshot(query(collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
        (snapshot) => {
          setComment(snapshot.docs)
        }
      )
    }
  }, [id]);


  return (
    <>
      {comment.map((cmnt) => (
        <CommentCard key={cmnt.id} comment={cmnt.data()} commentId={cmnt.id} originalPostId={id} />
      ))}
    </>
  )
}

export default Comments