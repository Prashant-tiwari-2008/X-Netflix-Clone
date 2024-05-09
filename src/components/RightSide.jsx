'use client'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import NewsCard from './NewsCard'

var testData = {
  "source": {
    "id": null,
    "name": "CNBC"
  },
  "author": "Sam Shead",
  "title": "Bill Gates questions Elon Musk's goals with Twitter: 'He could make it worse' - CNBC",
  "description": "Bill Gates has warned that Elon Musk could make Twitter worse after the Tesla CEO pledged to buy the social media firm for $44 billion.",
  "url": "https://www.cnbc.com/2022/05/05/bill-gates-says-elon-musk-could-make-twitter-worse.html",
  "urlToImage": "https://image.cnbcfm.com/api/v1/image/107017517-1645200499603-gettyimages-1236298089-jm1_6693.jpeg?v=1651738132&w=1920&h=1080",
  "publishedAt": "2022-05-05T07:17:52Z",
  "content": "Bill Gates has warned that Elon Musk could make Twitter \"worse\" after the Tesla CEO pledged to buy the social media firm for $44 billion.\r\nSpeaking at the Wall Street Journal's CEO Summit Wednesday, \u2026 [+3281 chars]"
}

const RightSide = () => {
  const [news, setNews] = useState([])

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
          {news && news.map((news, index) => {
            return (
              <NewsCard title={news.title} imageUrl={news.urlToImage} source={news.source} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RightSide