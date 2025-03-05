/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";

 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from 'firebase-functions';
export declare const helloWorld: functions.https.CallableFunction<any, Promise<{
    message: string;
}>, unknown>;
export declare const chatGptChat: functions.https.CallableFunction<any, Promise<{
    latestMessage: string;
    allMessages: any[];
}>, unknown>;
