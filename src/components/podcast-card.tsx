import { useEffect, useState } from "react";
import { Result } from "./search"
import Image from "next/image";

type PodcastCardProps = Result; 
export function PodcastCard({title, publishedDate, highlights, url}: PodcastCardProps) {

  const [summaryHighlights, setSummaryHighlights] = useState('');

  useEffect(() => {
    const handleHighlights = async (highlights: string[]) => {
      const query = `Create a summary of the podcast based on what you know + the following information: Title of podcast: ${title}.\n Published on: ${publishedDate}.\n URL: ${url}. The following is either some highlights I found online about the episode, or complete internet gibberish: ${highlights}. If it's gibberish, don't use it, but if it's actual highlights, use it in the summary. Don't mention the title or date in the concise summary. ONLY output a 5-6 sentence summary of the episode.`
      try {
        const response = await fetch('/api/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const { result: summary } = await response.json();
        setSummaryHighlights(summary)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    handleHighlights(highlights);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto" style={{ height: '400px', overflow: 'hidden' }}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-gray-500 text-sm">{formatDate(publishedDate)}</p>
          <h2 className="text-xl font-bold">
            <a href={url} target="_blank">{title}</a>
          </h2>
        </div>
        {/* <div>
          <Image
            alt="Spotify"
            className="w-15 h-15"
            height={60}
            src="/placeholder.svg"
            style={{
              aspectRatio: "60/60",
              objectFit: "cover",
            }}
            width={60}
          />
        </div> */}
        <div className="aspect-w-16 aspect-h-9" />
        <div className="mt-6" style={{ overflowY: 'auto' }}>
          <p className="text-gray-600">
              {summaryHighlights ? summaryHighlights : "Generating description..."}
          </p>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}