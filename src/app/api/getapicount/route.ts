import { NextResponse } from "next/server";
import { HfAgent, LLMFromHub, defaultTools } from "@huggingface/agents"; // Import Hugging Face Agents library

import { HfInference } from "@huggingface/inference";

import { checkApiLimit, incrementApiLimit, getApiLimitCount } from '../../utils/api-limit';

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

export async function POST(req) {
  try {
  
      const body = await req.json();
      const { userEmail  } = body;
      

      if (!userEmail) {
      return new NextResponse("Prompt is required", { status: 400 });
      }

    

      const response = await getApiLimitCount(userEmail); 

      
    
    
        return NextResponse.json(response);
      } catch (error) {
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    };