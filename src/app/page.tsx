'use client'; 

import { PodcastCard } from '@/components/podcast-card'
import { Result, Search } from '@/components/search'
import { useState } from 'react'

export default function Home() {
  const [results, setResults] = useState<Result[] | null>(null)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="pb-4 z-10 mt-5 max-w-7xl w-full flex items-center justify-between font-mono text-sm">
          <div className='flex flex-col'>
            <p className='text-gray-700 text-lg font-semibold mr-7'>
              <span className='font-extrabold'>Finally</span>, a podcast search engine that actually works
            </p>
            <p className='text-gray-500 text-sm'>By <a className='underline' target="_blank" href="https://emilioandere.com/">Emi</a></p>
          </div>
          <Search setResults={setResults}/> 
        </div>
        <div className="gap-5 p-20 max-w-8xl w-full grid grid-cols-3 font-mono text-sm">
          {results ? results.map((result) => (
            <PodcastCard key={result.id} {...result} />
          )) : (
            <div className="col-span-5 text-center text-gray-500"></div>
          )}
        </div>
      </main>
    </>
  )
}


