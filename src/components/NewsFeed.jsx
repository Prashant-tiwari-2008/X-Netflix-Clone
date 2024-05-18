import { Post } from './Post'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import EditPostModel from './EditPostModel';


export default async function Feed() {
 
  //todo : need to read about fetch data
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  
  return (
    <div>
      {data && data.map((post) => (
        <Post post={post}/>
      ))}
      <EditPostModel />
    </div>
  )
}
