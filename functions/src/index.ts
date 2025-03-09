/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";

 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//  const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// import { onRequest } from "firebase-functions/v2/https";
import { onCall } from 'firebase-functions/v2/https';

// import * as logger from 'firebase-functions/logger';
// import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

// const completion = await openai.chat.completions.create({
//     model: 'gpt-4o',
//     store: true,
//     messages: [
//         {'role': 'user', 'content': 'write a haiku about ai'}
//     ]
// });


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// Setup Guide - Docs
// https://firebase.google.com/docs/functions/get-started?gen=2nd

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });

// export const helloWorld = onCall((data, context) => {
export const helloWorld = onCall(() => {
    return {
        message: 'Hello, World!',
    };
});

// ChatGPT Chat

async function getOpenAIObject() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    return openai;
}

const systemPrompt = `You are the AI assistant of Sophia. Sophia is good at writing TikTok and Instagram Video Scripts, 
Hooks for videos and Optimizing Captions and Sophia has given you all of her transcripts so you have to write a script based 
on that. She is good at writing scripts on serious and sensitive topics as well as more light-hearted ones, and is adaptable in her tone between the two.
If I ask you anything related to scriptwriting then You have to turn that information into a compelling script for TikTok or 
Instagram Reels which includes a hook to attract viewers in the first five to ten seconds and an engaging story or explanation.
When I have responded to you, You should write a script in Sophia’s style. Your first sentence must be an engaging hook in the style 
of Sophia's videos, which means it needs to be a shocking fact or a question that is no longer than 20 words. 
This should then be followed by an engaging explanation and ending in a call to action.You should never use the phrase 'Let's dive in!' 
or 'Here's the tea'. Your script should use a similar structure to Sophia's scripts and should not exceed 270 words in length. 
It should not use emoji and limit its use of exclamation marks. At the end of the script, you should begin a new paragraph beginning with 
"This would be my recommended caption" and then recommend a caption optimised for search engine results that is connected to the script's topic. 
The hashtags featured in this caption should only use words in the script which a user would search for, and should not be made-up hashtags of trends. 
Your caption should be written in Sophia Smith Galer's style and should not use emoji.You should always endeavour to provide the user with a script, 
even if the text they have submitted does not include enough detail. If this happens, let them know the script didn't include enough detail, 
and suggest areas of research they may wish to investigate to bulk out their research. 
There should be a json array of 3 items, each with a "hook" and "script" property.`;

// const systemPrompt = `One word answers please.`;

export const chatGptChat = onCall(async (request) => {
    // The `data` parameter contains the request data sent from the client.
    // The `context` parameter contains the authentication context, such as user info.
    const user = request.auth;
    const data = request.data;
    if (!user) {
        logger.error('User must be logged in');
        throw new Error('User must be logged in');
    }
    if (!data) {
        logger.error('No data provided to function');
        throw new Error('No data provided to function');
    }
    const inputMessage = data.message;
    const previousMessages = data.previousMessages.map((message) => {
        console.log('message:', message);
        return createMessage(message.id, message.text, message.dateCreated, message.userType);
    });
    const openai = await getOpenAIObject();
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        store: true,
        messages: [
            {
                'role': 'system',
                'content': systemPrompt,
            },
            ...previousMessages.map(convertToOpenAIMessage),
            {
                'role': 'user',
                'content': inputMessage,
            },
        ],
        response_format: zodResponseFormat(z.object({
            items: z.array(z.object({
                'hook': z.string(),
                'script': z.string(),
            })),
        }), 'items'),
    });
    // console.log('completion.choice:', completion.choices);
    const output = completion.choices[0].message.parsed;
    console.log('output:', output);
    return output;
    // const outputMessage = completion.choices[0].message.content;
    // const newMessage = createMessage(crypto.randomUUID(), outputMessage, new Date().toISOString(), 'assistant');
    // console.log('newMessage:', newMessage);
    // const updatedAllMessages: Message[] = [...(previousMessages || []), newMessage];
    // console.log('updatedAllMessages:', updatedAllMessages);
    // return {
    //     allMessages: ["Hello world"],// ...updatedAllMessages],
    // };
});

interface Message {
    id: string;
    text: string;
    dateCreated: string;
    userType: 'user' | 'assistant';
}

function createMessage(id: string, text: string, dateCreated: string, userType: 'user' | 'assistant'): Message {
    return {
        id,
        text,
        dateCreated: dateCreated,
        userType,
    };
}

interface OpenAIMessage {
    role: 'user' | 'assistant';
    content: string;
}

const convertToOpenAIMessage = (message: Message): OpenAIMessage => {
    return {
        role: message.userType === 'user' ? 'user' : 'assistant',
        content: message.text,
    };
};
