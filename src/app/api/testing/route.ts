import { NextResponse } from 'next/server'
import { Result } from '@/components/search';

export async function GET(request: Request) {
    return NextResponse.json({
        message: "Server running :)"
    }); 
}

export async function POST(req: Request) {
    const body = await req.json();

    // make a fake response
    const fakeResponse: Result = {
        author: null,
        id: "https://open.spotify.com/episode/1xesVhrRcngCAqK5BmEbvf",
        publishedDate: "",
        title: "A.I Could Solve Some of Humanity's Problems. It Already Has.",
        url: "https://open.spotify.com/episode/1xesVhrRcngCAqK5BmEbvf",
        score: 0.0,
        highlights: ["Since the release of ChatGPT, huge amounts of attention and funding have been directed toward chatbots. ", "These A.I. systems are trained on copious amounts of human-generated data and designed to predict the next word in a given sentence. "]
    };
    const response: Result[] = Array(12).fill(fakeResponse)


    return new NextResponse(JSON.stringify(response));
}
