'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RandomIcon } from './random-icon';

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
export function Search({setResults}: SearchProps) {
  const [inputValue, setInputValue] = useState("");

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * randomOptions.length);
    const randomOption = randomOptions[randomIndex];
    setInputValue(randomOption);
  }

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      return;
    }
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue }),
      });

      const { result } = await response.json();
      const output: Result[] = result.results.map((item: Result) => ({
        author: item.author,
        id: item.id,
        publishedDate: item.publishedDate,
        score: item.score,
        title: item.title,
        url: item.url,
        highlights: item.highlights,
      }));
      output.sort((a, b) => b.score - a.score);
      setResults(output)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
    <div className="flex items-center w-full max-w-5xl mx-auto">
      <Button className='mr-2 bg-transparent hover:bg-transparent' onClick={handleRandom} aria-label='Random Prompt'>
        <RandomIcon height='2.5em' fill='gray' /> 
      </Button>
      <Input
        className="shadow-sm flex-1 py-7 px-4 rounded-l-md bg-gray-100 dark:bg-gray-800 focus:outline-none !focus:outline-gray-600 text-lg"
        placeholder="Search for podcasts..."
        type="search"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Button
        className="ml-5 bg-gray-600 hover:bg-gray-800 text-white font-medium py-7 px-6 rounded-r-md text-lg"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </div>
    </>
  );
}

const randomOptions = [
  "Story of Elon Musk founding SpaceX",
  "Incepetion of the Apollo Program",
  "Satya Nadella and the Cloud Transformation of Microsoft",
  "The Birth of Google DeepMind",
  "Rise of the Tesla Electric Car Empire",
  "The Founding of Alibaba and E-commerce in China",
  "Steve Jobs develops the iPhone",
  "The Beatles and the British Invasion in Music",
  "Marie Curie and the discovery of Radioactivity",
  "The Opening of the Suez Canal and Its Global Impact",
  "Pablo Picasso and the Birth of Cubism",
  "Ernest Hemingway and the Invention of Modernist Literature",
  "Nietzche's God is Dead",
  "Frida Kahlo and the Rise of Mexican Surrealist Art",
  "The Discovery of Penicillin by Alexander Fleming",
  "Andy Warhol Defines Pop Art with Iconic Images",
  "The Launch of Tabasco Sauce and Its Spicy Legacy",
  "Che Guevaras Motorcycle Diaries Through South America",
  "The Prohibition Era and the Rise of Speakeasies in America",
  "Houdinis Death-Defying Escapes and Magic Tricks",
  "The Rediscovery of the Ancient City of Petra",
  "The Psychedelic Renaissance: LSD's Return to Scientific Research",
  "Pablo Escobar's Hippos: A Colombian Legacy",
  "The Development of CRISPR: A Revolution in Gene Editing",
  "The Invention of Blockchain and the Birth of Bitcoin",
  "Mark Zuckerberg and the Creation of Facebook",
  "The Initiation of the Human Genome Project",
  "The Discovery of the Dead Sea Scrolls",
  "The First Heart Transplant",
  "The Creation of the Panama Canal",
  "The Rise of the Roman Empire",
  "The Founding of the United Nations",
  "The Jazz Age: Music, Flappers, and the Roaring Twenties",
]