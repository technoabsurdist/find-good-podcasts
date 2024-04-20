import { NextResponse } from 'next/server'
import dotenv from 'dotenv';
import OpenAI from 'openai' 

export async function POST(req: Request) {
    const body = await req.json();
    const query = body?.query;

    if (!query) {
        return NextResponse.json({ error: 'Please enter a search query.' });
    }

    const result = await generateSummary(query);
    if (!result) {
        return NextResponse.json({ error: 'No search results found.' });
    }

    return new NextResponse(JSON.stringify({ result }));
}


async function generateSummary(query: string) {
    dotenv.config()
    const openai = new OpenAI()
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": query}
        ],
        model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content
}