import { useEffect, useState } from "react";
import { Result } from "./search"


type PodcastCardProps = Result; 
export function PodcastCard({title, publishedDate, highlights, url}: PodcastCardProps) {

  const [summaryHighlights, setSummaryHighlights] = useState('');
  const [embedHtml, setEmbedHtml] = useState<string>('');

  useEffect(() => {
    fetchOEmbed(url);

    const handleHighlights = async (highlights: string[]) => {
      const query = `Create a summary of the podcast based on what you know + the following information: Title of podcast: ${title}.\n Published on: ${publishedDate}.\n URL: ${url}. The following is either some highlights I found online about the episode, or complete internet gibberish: ${highlights}. If it's gibberish, don't use it, but if it's actual highlights, use it in the summary. Don't mention the title or date in the concise summary. ONLY output a 3 sentence summary of the episode that is concise, direct and uses simple, clear language.`
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
        console.error('Error fetching summary results:', error);
      }
    };
    handleHighlights(highlights);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const fetchOEmbed = async (spotifyUrl: string) => {
    const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`;
    try {
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      let modifiedHtml = data.html;
  
      modifiedHtml = modifiedHtml.replace(/width="\d+%"/, 'width="100%"'); // Set width to 100%
      
      modifiedHtml = modifiedHtml.replace(/picture-in-picture/g, '');
  
      setEmbedHtml(modifiedHtml);
    } catch (error) {
      console.error('Error fetching oEmbed data:', error);
    }
  };

  return (
    <div className="font-mono shadow-sm bg-white dark:bg-zinc-950 rounded-md p-4" style={{ overflow: 'hidden' }}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-gray-500 dark:text-stone-300 text-sm">{formatDate(publishedDate)}</p>
          <h2 className="text-gray-700 dark:text-stone-300 text-xl font-bold">
            <a href={url} target="_blank">{title}</a>
          </h2>
        </div>
        <div style={{ overflowY: 'auto' }}>
          <p className="text-gray-600 dark:text-stone-300 ">
            {summaryHighlights ? summaryHighlights : "Generating description..."}
          </p>
        </div>
        <div className='mt-2' dangerouslySetInnerHTML={{ __html: embedHtml }} />
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