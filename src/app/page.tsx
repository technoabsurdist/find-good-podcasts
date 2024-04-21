'use client'; 

import { PodcastCard } from '@/components/podcast-card'
import { RandomIcon } from '@/components/random-icon';
import { Result, Search } from '@/components/search'
import { useState } from 'react'

export default function Home() {
  const [results, setResults] = useState<Result[] | null>(null)
  const [showTip, setShowTip] = useState(true);  // State to control the visibility of the toast

  return (
    <>
    
      <main className="font-mono flex min-h-screen flex-col items-center justify-between p-24 pt-10">
        <div className="z-10 mt-1 max-w-7xl w-full flex items-center justify-between text-sm">
          <div className='flex flex-col max-w-[300px]'>
            <p className='dark:text-zinc-300 text-gray-700 text-xl font-semibold mr-7 mt-6'>
              <span className='font-extrabold bg-yellow-400 dark:text-black'>Finally</span>, <span className='dark:bg-emerald-400 dark:text-black'>a podcast search engine that actually works</span>
            </p>
            <p className='text-gray-500 text-md mt-1'>
            <a className='dark:text-zinc-300 underline' target="_blank" href="https://github.com/technoabsurdist/find-good-podcasts">Github</a>
              {/* By <a className='underline' target="_blank" href="https://github.com/technoabsurdist">Emi</a>{' '} */}
            </p>
            
          </div>
          <Search setResults={setResults} /> 
        </div>
        <div className="gap-6 pt-10 max-w-7xl w-full grid grid-cols-1 text-sm">
          {results && <p className='font-mono focus:outline-gray-600  text-sm mt-4'>[Sorted by relevance]</p>}
          {/* lazy solve: Sometimes returns embeds, which don't display correctly */}
          {results ? 
          
          results.filter(result => result.title !== "Spotify Embed").map((result) => (
            <PodcastCard key={result.id} {...result} 
            />
          )) 

          : 

          (
            <>
              {showTip && (
                <div className="dark:bg-zinc-950 dark:text-stone-300 toast fixed right-4 bottom-4 w-100 p-4 bg-white shadow-lg rounded-lg flex items-center justify-between">
                  <p className="dark:text-stone-300 text-gray-600 text-sm mr-3">
                    <span className="font-bold">Tip:</span> Click on random generations for inspiration!
                  </p>
                  <button onClick={() => setShowTip(false)} className="text-gray-500 text-lg leading-none">&times;</button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </>
  )
}



