"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";

 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatGptChat = exports.helloWorld = void 0;
//  const {onDocumentCreated} = require("firebase-functions/v2/firestore");
// import { onRequest } from "firebase-functions/v2/https";
var https_1 = require("firebase-functions/v2/https");
// import * as logger from 'firebase-functions/logger';
// import { onRequest } from 'firebase-functions/v2/https';
var logger = require("firebase-functions/logger");
var openai_1 = require("openai");
var openai = new openai_1.default();
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
exports.helloWorld = (0, https_1.onCall)(function (data, context) {
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
exports.chatGptChat = (0, https_1.onCall)(function (data, context) { return __awaiter(void 0, void 0, void 0, function () {
    var completion, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // The `data` parameter contains the request data sent from the client.
                // The `context` parameter contains the authentication context, such as user info.
                console.log('Function called with data:', data);
                console.log('Function called with context:', context);
                return [4 /*yield*/, openai.chat.completions.create({
                        model: 'gpt-4o',
                        store: true,
                        messages: [
                            {
                                'role': 'user',
                                'content': 'write a haiku about ai',
                            },
                        ],
                    })];
            case 1:
                completion = _a.sent();
                message = completion.choices[0].message.content;
                return [2 /*return*/, {
                        message: message,
                    }];
        }
    });
}); });
