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
import * as functions from 'firebase-functions';

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

// export const helloWorld = onCall((data, context) => {
export const helloWorld = onCall((request) => {
    // The `data` parameter contains the request data sent from the client.
    // The `context` parameter contains the authentication context, such as user info.
    // console.log('Function called with data:', data);
    // console.log('Function called with context:', context);
    // logger.info('Function called with data:', data);
    // logger.info('Function called with context:', context);
    logger.info('auth:', request.auth);
    logger.info('uid:', request.auth?.uid);
    logger.info('data:', request.data);
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
    const previousMessages = data.previousMessages;
    logger.info('Getting OpenAI object');
    const openai = await getOpenAIObject();
    logger.info('OpenAI object created');
    const allMessages = [...(previousMessages || []).map(message => ({
        role: 'user',
        content: message
    }))]

    console.log('allMessages:', allMessages);

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        store: true,
        messages: [
            ...allMessages,
            {
                'role': 'user',
                'content': inputMessage,
            },
        ],
    });
    logger.info('Completion created');
    console.log('Function called with completion:', completion);
    const outputMessage = completion.choices[0].message.content;
    logger.info('Output message created');
    logger.info('\nFunction called with outputMessage:', outputMessage);
    logger.info('\nFunction called with previousMessages:', previousMessages);
    const updatedAllMessages = [...(previousMessages || []), outputMessage];
    logger.info('\n\n');
    logger.info('\nFunction called with updatedAllMessages:', updatedAllMessages);

    return {
        latestMessage: outputMessage,
        allMessages: updatedAllMessages
    };
});
