import { NextResponse } from 'next/server'
import { searchPodcasts } from './helpers';

export async function POST(req: Request) {
    const body = await req.json();
    const query = body?.query;

    if (!query) {
        return NextResponse.json({ error: 'Please enter a search query.' }, { status: 200 });
    }

    const result = await searchPodcasts(query);
    if (!result) {
        return NextResponse.json({ error: 'No search results found.' }, { status: 205 });
    }

    return new NextResponse(JSON.stringify({ result }), { status: 200 });
}
