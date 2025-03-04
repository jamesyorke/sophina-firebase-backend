/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";

 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
export declare const helloWorld: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    message: string;
}>, unknown>;
export declare const chatGptChat: import("firebase-functions/v2/https").CallableFunction<any, Promise<{
    message: string;
}>, unknown>;
