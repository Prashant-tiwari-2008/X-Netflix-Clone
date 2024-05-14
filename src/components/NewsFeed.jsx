import { Post } from './Post'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'


export default async function Feed() {
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return (
    <div>
      {data && data.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}
