import { PineconeClient } from "@pinecone-database/pinecone";
import axios from 'axios';
//import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

import pineconeStore from "../../utils/pineconeStore";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from '../../utils/api-limit';




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);


export async function POST(req, res) {
  try {
    const body = await req.json();
    const { messages, chatbotName, userEmail  } = body;
    console.log("messages: "+JSON.stringify(messages))

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
        temperature: 1,
        messages: [
          {
            role: "system",
            content: `
            Imagine you are ${chatbotName} and you want to interact with the user as if you were them.
            Introduce yourself and respond as ${chatbotName} in a normal conversation.
            `,
          },
          ...(messages || [
            {
              role: "user",
              content: "Hi There!",
            },
          ]),
        ],
      });

      await incrementApiLimit(userEmail)
  
    console.log("answare: "+JSON.stringify(response.data.choices[0].message))

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error('Error in OpenAI API route:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}