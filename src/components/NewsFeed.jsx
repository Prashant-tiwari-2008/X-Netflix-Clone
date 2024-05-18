'use client'
import { Post } from './Post'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { AllPost, searchedPost } from '@/atom/AllPostAtom'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'


export default function Feed() {
  const [posts, setPosts] = useRecoilState(AllPost)
  const [searched, setSearched] = useRecoilState(searchedPost)
  //todo : need to read about fetch data

  useEffect(() => {
    const getPost = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPosts(data);
      setSearched(data);
    }
    getPost();
  }, [])

  return (
    <div>
      {/* {posts && posts.map((post) => (
        <Post post={post} />
      ))} */}
      {searched.length > 1
        ? (searched.map((post) => (
          <Post post={post} />
        ))
        )
        : (posts.map((post) => (
          <Post post={post} />
        ))
        )
      }
    </div>
  )
}
