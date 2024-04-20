'use client'; 

import { PodcastCard } from '@/components/podcast-card'
import { RandomIcon } from '@/components/random-icon';
import { Result, Search } from '@/components/search'
import { useState } from 'react'

export default function Home() {
  const [results, setResults] = useState<Result[] | null>(null)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 mt-1 max-w-7xl w-full flex items-center justify-between font-mono text-sm">
          <div className='flex flex-col max-w-[300px]'>
            <p className='text-gray-700 text-xl font-semibold mr-7 mt-6'>
              <span className='font-extrabold'>Finally</span>, a podcast search engine that actually works
            </p>
            <p className='text-gray-500 text-md'>By <a className='underline' target="_blank" href="https://github.com/technoabsurdist">Emi</a></p>
          </div>
          <Search setResults={setResults}/> 
        </div>
        <div className="gap-5 p-20 max-w-8xl w-full grid grid-cols-3 font-mono text-sm">
          {results ? results.filter(result => result.title !== "Spotify Embed").map((result) => (
            <PodcastCard key={result.id} {...result} />
          )) : (
            <div className='col-span-5 row-span-10 text-center text-gray-600'>
              <p className='text-xl'><span className='font-bold'>Tip</span>: Click on <RandomIcon fill='gray' className='inline-block align-middle' height='1.5em' /> for inspiration!</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}


