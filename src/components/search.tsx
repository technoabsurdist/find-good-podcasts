'use client'

import { SetStateAction, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RandomIcon } from './random-icon';
import { FaSpinner } from 'react-icons/fa';

export interface Result {
  author: null;
  id: string;
  publishedDate: string;
  score: number;
  title: string; 
  url: string;
  highlights: string[]; 
}

interface SearchProps {
  setResults: (results: Result[] | null) => void;
}

export function Search({ setResults }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false); 
  const [randomSuggestions, setRandomSuggestions] = useState<string[]>([]);

  useEffect(() => {
    handleRandom();
  }, []);
  
  const handleRandom = () => {
    const suggestions: string[] = [];
    while (suggestions.length < 3) { // Change the limit to 3 to generate three suggestions
      const randomIndex = Math.floor(Math.random() * randomOptions.length);
      const randomOption = randomOptions[randomIndex];
      if (!suggestions.includes(randomOption)) {
        suggestions.push(randomOption);
      }
    }
    setRandomSuggestions(suggestions);
  }

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      return;
    }
    
    setLoading(true); // Start loading
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        console.log(`Error fetching! Search results with status: ${response.status}`);
        setLoading(false);
        return;
      }
      const podcastResults = data.podcasts.results;
      const output: Result[] = podcastResults.map((item: Result) => ({
        author: item.author,
        id: item.id,
        publishedDate: item.publishedDate,
        score: item.score,
        title: item.title,
        url: item.url,
        highlights: item.highlights,
      }));
      output.sort((a, b) => b.score - a.score);
      setResults(output);
      setLoading(false); // End loading
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false); // Ensure loading is false in case of error
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion.slice(2).trim());
    handleSubmit();
  };

  return (
    <>
      <div className="margin-10 text-gray-700 dark:text-stone-300 flex items-center w-full max-w-4xl" style={{ position: 'relative' }}>
        <div className="flex flex-col items-start w-full">
          <Input
            className="shadow-sm flex-1 py-7 px-4 rounded-l-md bg-white-100 focus:outline-gray-600 text-md dark:bg-zinc-950 dark:text-stone-300"
            placeholder="Search for podcasts based on what you wanna learn"
            type="search"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.code === "Enter") {
                handleSubmit();
              }
            }}
          />
          <div className='flex flex-row items-center justify-center mt-3' style={{ position: 'absolute', top: '100%', left: 0, right: 0 }}>
            {randomSuggestions.map(suggestion => (
              <div key={suggestion} onClick={() => handleSuggestionClick(suggestion)} className="dark:bg-zinc-950 dark:text-stone-300 text-bone-350 dark:hover:bg-zinc-900 mb-2 ml-2 text-center bg-stone-200 rounded-md px-2 py-2 text-xs cursor-pointer">
                {suggestion}
              </div>
            ))}
          </div>
        </div>
        <Button
          className="ml-3  bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:text-black font-medium py-9 px-6 rounded-r-md text-lg"
          type="submit"
          id="search-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : 'Search'}
        </Button>
      </div>
    </>
  );


}



const randomOptions = [
  "🚀 Story of Elon Musk founding SpaceX",
  "🌕 Inception of the Apollo Program",
  "☁️ Satya Nadella and the Cloud Transformation of Microsoft",
  "🧠 The Birth of Google DeepMind",
  "⚡ Rise of the Tesla Electric Car Empire",
  "🛒 The Founding of Alibaba and E-commerce in China",
  "📱 Steve Jobs develops the iPhone",
  "🎸 The Beatles and the British Invasion in Music",
  "🔬 Marie Curie and the discovery of Radioactivity",
  "🚢 The Opening of the Suez Canal and Its Global Impact",
  "🎨 Pablo Picasso and the Birth of Cubism",
  "📖 Ernest Hemingway and the Invention of Modernist Literature",
  "🕳️ Nietzche's God is Dead",
  "🌺 Frida Kahlo and the Rise of Mexican Surrealist Art",
  "💊 The Discovery of Penicillin by Alexander Fleming",
  "🖼️ Andy Warhol Defines Pop Art with Iconic Images",
  "🌶️ The Launch of Tabasco Sauce and Its Spicy Legacy",
  "🏍️ Che Guevaras Motorcycle Diaries Through South America",
  "🍸 The Prohibition Era and the Rise of Speakeasies in America",
  "🏜️ The Rediscovery of the Ancient City of Petra",
  "🍄 The Psychedelic Renaissance: LSD's Return to Scientific Research",
  "🦛 Pablo Escobar's Hippos: A Colombian Legacy",
  "✂️ The Development of CRISPR: A Revolution in Gene Editing",
  "🔗 The Invention of Blockchain and the Birth of Bitcoin",
  "👥 Mark Zuckerberg and the Creation of Facebook",
  "🧬 The Initiation of the Human Genome Project",
  "📜 The Discovery of the Dead Sea Scrolls",
  "❤️ The First Heart Transplant",
  "🌎 The Creation of the Panama Canal",
  "🏛️ The Rise of the Roman Empire",
  "🇺🇳 The Founding of the United Nations",
  "🎷 The Jazz Age: Music, Flappers, and the Roaring Twenties",
  "🚗 Model T and the Automobile Revolution by Henry Ford",
  "🖥️ Ada Lovelace and the Pioneering of Computer Programming",
  "🤖 Advanced Robotics in Automated Manufacturing Processes",
  "🧪 AI in Drug Discovery and Molecular Modeling",
  "🌐 The Development of Ethereum by Vitalik Buterin",
  "📦 The Pioneering of SaaS Business Models"
]