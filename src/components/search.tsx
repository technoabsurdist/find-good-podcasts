'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      alert('Please enter a search query.');
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
      console.log("results: ", output)
      setResults(output)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex items-center w-full max-w-2xl mx-auto">
      <Input
        className="flex-1 py-4 px-6 rounded-l-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-lg"
        placeholder="Search for podcasts..."
        type="search"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-r-md text-lg"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </div>
  );
}
