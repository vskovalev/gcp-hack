import { NextResponse } from "next/server";
import { HfAgent, LLMFromHub, defaultTools } from "@huggingface/agents"; // Import Hugging Face Agents library

import { HfInference } from "@huggingface/inference";

import { checkApiLimit, incrementApiLimit } from '../../utils/api-limit';

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

export async function POST(req) {
  try {
  
      const body = await req.json();
      const { prompt,  userEmail  } = body;
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

      const response = await inference.summarization({
        model: 'google/pegasus-large',
        inputs: prompt
      })

      await incrementApiLimit(userEmail)
    
    
        return NextResponse.json(response);
      } catch (error) {
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    };