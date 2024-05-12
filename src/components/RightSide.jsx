'use client'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import NewsCard from './NewsCard'


const RightSide = () => {
  const [news, setNews] = useState([])
  const [articalCount, setArticalCount] = useState(3)

  useEffect(() => {
    const getNewsData = async () => {
      const response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`);
      const data = await response.json();
      if (data.status = 'ok') {
        setNews(data.articles)
      }
    }
    getNewsData();
  }, [])


  return (
    <div className='flex flex-col gap-4 p-3'>
      <div className='sticky top-0 bg-white py-2'>
        <Search />
      </div>
      <div className='w-full bg-gray-100 rounded-md'>
        <h1 className='p-2 text-lg font-bold '>What Happening</h1>
        <div>
          {news && news.slice(0, articalCount).map((news, index) => {
            return (
              <NewsCard title={news.title} imageUrl={news.urlToImage} source={news.source} />
            )
          })}
          <button className='p-2 text-sm font-semibold text-blue-600 cursor-pointer'
          onClick={() => setArticalCount(prev => prev + 3)}
          >Show More</button>
        </div>
      </div>
    </div>
  )
}

export default RightSide