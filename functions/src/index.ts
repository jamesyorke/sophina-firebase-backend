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

export const helloWorld = onCall((data, context) => {
    // The `data` parameter contains the request data sent from the client.
    // The `context` parameter contains the authentication context, such as user info.
    console.log('Function called with data:', data);
    console.log('Function called with context:', context);
    logger.info('Function called with data:', data);
    logger.info('Function called with context:', context);
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

console.log('Getting OpenAI object: ', process.env.OPENAI_API_KEY);

export const chatGptChat = onCall(async (data) => {
    // The `data` parameter contains the request data sent from the client.
    // The `context` parameter contains the authentication context, such as user info.
    console.log('Function called with data:', data);
    // console.log('Function called with context:', context);
    const openai = await getOpenAIObject();
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        store: true,
        messages: [
            {
                'role': 'user',
                'content': 'write a haiku about ai',
            },
        ],
    });

    const message = completion.choices[0].message.content;
    return {
        message: message,
    };
});
