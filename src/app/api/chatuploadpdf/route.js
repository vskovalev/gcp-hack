import { PineconeClient } from "@pinecone-database/pinecone";
import axios from 'axios';
//import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

import pineconeStore from "../../utils/pineconeStore";
import { NextResponse } from "next/server";





const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);


export async function POST(req, res) {
  try {
    const body = await req.json();
    const { messages  } = body;
    console.log("messages: "+JSON.stringify(messages))

    if (!configuration.apiKey) {
        return new NextResponse("OpenAI API Key not configured.", { status: 500 });
      }

    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
      }

    
      const pinecone = await pineconeStore();

      console.log("messages req: ", messages);
    
      // updated the message content to include context snippets
      if (messages?.length > 0) {
        const lastMsgContent = messages[messages.length - 1].content;
    
        const data = await pinecone.similaritySearch(lastMsgContent, 3);
    
        console.log("pinecone data.length: ", data.length);
    
        const updatedMsgContent = `
        user question/statement: ${lastMsgContent}
        context snippets:
        ---
        1) ${data?.[0]?.pageContent}
        ---
        2) ${data?.[1]?.pageContent}
        ---
        3) ${data?.[2]?.pageContent}
        `;
    
        messages[messages.length - 1].content = updatedMsgContent;
      }
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
          {
            role: "system",
          
            content: `
          Imagine you are ${chat_name} and you want to give advice to the user you're interacting with that may ask you questions or advice.
          I will provide you context snippets from a vecor database that might help you answer the user's questions (do not use them if not needed, you can use just a part or as reference).
          Introduce youself. Don't mention context snippets when replying to user and only mention yourself by your first name ${chat_name} so do not say that you are an AI, act as if you were in a normal conversation.
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
  
    console.log("answare: "+JSON.stringify(response.data.choices[0].message))

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error('Error in OpenAI API route:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}