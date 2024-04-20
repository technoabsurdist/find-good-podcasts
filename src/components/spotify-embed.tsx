import React, { useEffect } from 'react';

interface SpotifyPodcastEmbedProps {
  episodeUri: string;
}

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    }
}

const SpotifyPodcastEmbed: React.FC<SpotifyPodcastEmbedProps> = ({ episodeUri }) => {
  useEffect(() => {

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('spotify-embed') as HTMLElement;
      const options = {
        uri: episodeUri, // Spotify URI of the episode
        width: 300,      // Width of the iframe
        height: 80       // Height of the iframe
      };
      const callback = (EmbedController: any) => {
        EmbedController.addListener('ready', () => {
          console.log('The Embed has initialized');
        });
      };

      // Create the controller with the provided options
      IFrameAPI.createController(element, options, callback);
    };

    // Load the Spotify iFrame API script
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [episodeUri]);

  return <div id="spotify-embed" />;
};

export default SpotifyPodcastEmbed;
