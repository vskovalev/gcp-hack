import Replicate from "replicate";
import { NextResponse } from "next/server";

import { checkApiLimit, incrementApiLimit } from '../../utils/api-limit';


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
  });



export async function POST(req: Request) {
    try {
    
        const body = await req.json();
        const { prompt, userEmail  } = body;
        console.log("prompt:", prompt)

        if (!prompt) {
        return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit(userEmail); // Check API limit using user's email
        console.log("freetrial: "+freeTrial);
        if (!freeTrial) {
          console.log("Free Trial expired console")
          return new NextResponse('Free trial expired', { status: 403 });
        }
    

        const response = await replicate.run(
            "stability-ai/sdxl:a00d0b7dcbb9c3fbb34ba87d2d5b46c56969c84a628bf778a7fdaec30b1b99c5",
            {
              input: {
                prompt: prompt
              }
            }
          );

        await incrementApiLimit(userEmail)
      
      
          return NextResponse.json(response);
        } catch (error) {
          console.log('[IMAGE_ERROR]', error);
          return new NextResponse("Internal Error", { status: 500 });
        }
      };


