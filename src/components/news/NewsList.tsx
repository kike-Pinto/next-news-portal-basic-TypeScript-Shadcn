'use client'

import { fetchNews } from '@/lib/fetchNews'
import { NewsItem } from '@/types/news'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import NewsCard from '../NewsCard'

const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [category, setCategory] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews(category, search)
      setNews(data)
    }
    getNews()
  }, [category, search])

  console.log(news)

  return (
    <div className='px-2'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 mb-5'>
        {/* Search bar */}
        <SearchBar onSearch={setSearch} />

        {/* category filtering */}
        <CategoryFilter onCategoryChange={setCategory} />
      </div>

      {/* Present news */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-between'>
        {news.map((item: NewsItem) => (
          <NewsCard key={item?._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default NewsList
