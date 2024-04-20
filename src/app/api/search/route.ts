import { NextResponse } from 'next/server'
import { searchPodcasts } from './helpers';

export async function GET(request: Request) {
    return NextResponse.json({
        message: "Server running :)"
    }); 
}

export async function POST(req: Request) {
    const body = await req.json();
    const query = body?.query;

    if (!query) {
        return NextResponse.json({ error: 'Please enter a search query.' });
    }

    const result = await searchPodcasts(query);
    if (!result) {
        return NextResponse.json({ error: 'No search results found.' });
    }

    return new NextResponse(JSON.stringify({ result }));
}
