import dotenv from 'dotenv'
import Exa from 'exa-js'

export async function searchPodcasts(prompt: string) {
    dotenv.config()
    const exa = new Exa()

    const options = {
        num_results: 9,
        use_autoprompt: true,
        type: 'neural',
        highlights: { highlightsPerUrl: 7, numSentences: 1, query: "Summary of the podcast episode"},
        includeDomains: ['open.spotify.com', 'spotify.com'],
    }
    const formattedPrompt = `Spotify Podcasts on Spotify about the following topic: ${prompt}`
    const response = await exa.searchAndContents(formattedPrompt, options)
    return response
}