import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from '../../utils/api-limit';


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);


export async function POST(req, res) {
  try {
    const body = await req.json();
    const { messages, userEmail  } = body;

    if (!configuration.apiKey) {
        return new NextResponse("OpenAI API Key not configured.", { status: 500 });
      }

    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
      }

    
    const freeTrial = await checkApiLimit(userEmail); // Check API limit using user's email
    console.log("freetrial: "+freeTrial);
    if (!freeTrial) {
      console.log("Free Trial expired console")
      return new NextResponse('Free trial expired', { status: 403 });
    }

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
      });
    
    await incrementApiLimit(userEmail)
    
  
    

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error('Error in OpenAI API route:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
