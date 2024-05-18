'use client'
import { AllPost, searchedPost } from '@/atom/AllPostAtom'
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

// todo : filter the posts data
const Search = () => {
  const [searched, setSearched] = useRecoilState(searchedPost)
  const [posts, setPosts] = useRecoilState(AllPost)
  const [searchText, setSearchText] = useState('');


  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return searched.filter(
      (post) =>
        regex.test(post.content) ||
        regex.test(post.username)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 2) {
      // debounce method 
      // setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      console.log(searchResult,"searched resul");
      setSearched(searchResult)
      // }, 100)
    } else {
      setSearched(posts);
    }
  }

  return (
    <input placeholder='type at least 3 letter
    ' className='w-full bg-gray-100 rounded-full px-4 py-2 text-small border border-gray-400' value={searchText} onChange={handleSearchChange} />
  )
}

export default Search