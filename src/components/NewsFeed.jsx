import React from 'react'
import { Post } from './Post'


var testObject = [
  {
    photo: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fprashanttiwari.jpg?alt=media&token=caf8f603-0b19-44cd-99b9-b29ae453d9ac",
    creatorName: "Prashant tiwari",
    creatorEmail: "@prashanttiwari",
    content: "hi there I am here just for testing the project",
    ImgUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fbanner.jpg?alt=media&token=83d88f32-1171-465d-aa45-e2804850f2ba"
  },
  {
    photo: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fprashanttiwari.jpg?alt=media&token=caf8f603-0b19-44cd-99b9-b29ae453d9ac",
    creatorName: "Prashant tiwari",
    creatorEmail: "@prashanttiwari",
    content: "hi there I am here just for testing the project",
    ImgUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fbanner.jpg?alt=media&token=83d88f32-1171-465d-aa45-e2804850f2ba"
  },
  {
    photo: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fprashanttiwari.jpg?alt=media&token=caf8f603-0b19-44cd-99b9-b29ae453d9ac",
    creatorName: "Prashant tiwari",
    creatorEmail: "@prashanttiwari",
    content: "hi there I am here just for testing the project",
    ImgUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-cd86c.appspot.com/o/shared%2Fbanner.jpg?alt=media&token=83d88f32-1171-465d-aa45-e2804850f2ba"
  },
]


const Feed = () => {
  return (
    <div>
      {testObject && testObject.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}

export default Feed