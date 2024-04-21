import { NextResponse } from 'next/server'
import { searchPodcasts } from './helpers';

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: e }), { status: 400 });
    }

    const query = body?.query;

    if (!query) {
        return new Response(JSON.stringify({ error: 'Please enter a search query.' }), { status: 400 });
    }

    try {
        const result = await searchPodcasts(query);
        if (!result) {
            return new Response(JSON.stringify({ error: 'No search results found.' }), { status: 404 });
        }

        return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (error) {
        console.error('Error during search:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

