'use server'

import { streamText, } from "ai"
import { google } from "@ai-sdk/google"
import { createStreamableValue } from "ai/rsc"

export async function generateEmail(prompt: string) {
    const stream = createStreamableValue('');

    (async () => {
        const { textStream } = await streamText({
            model: google('gemini-1.5-pro-latest'),
            prompt: `
                 You are an AI7 assistant embedded in an policy and insurance client app. Your purpose is to help the user to clear doubts by providing suggestions and relevant information based on the context of their previous data.
        
        THE TIME NOW IS ${new Date().toLocaleString()}
        
        USER PROMPT:
        ${prompt}

                `
        })
        for await (const token of textStream) {
            stream.update(token)
        }

        stream.done()
    })()

    return { output: stream.value }
}

// export async function generate(input: string) {
//     const stream = createStreamableValue('');

//     (async () => {
//         const { textStream } = await streamText({
//             model: google('gemini-1.0-pro'),
//             prompt: `
//             You are a helpful AI embedded in an email client app that is used to autocomplete sentences, similar to Google Gmail autocomplete.
//             The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
//             AI is a well-behaved and well-mannered individual.
//             AI is always friendly, kind, and inspiring, and eager to provide vivid and thoughtful responses to the user.
//             I am writing a piece of text in an email editor.
//             Help me complete my train of thought here: ${input}
//             Keep the tone of the text consistent with the rest of the text.
//             Keep the response short and sweet. Act like a copilot, finish my sentence if need be, but don't try to generate a whole new paragraph.
//             Do not add fluff like "I'm here to help you" or "I'm a helpful AI" or anything like that.

//             IMPORTANT:
//             - Do not include any visible HTML tags in your response.
//             - Separate paragraphs with two newline characters to ensure proper spacing.
//             - Your output will be directly concatenated to the input, so do not add any unnecessary formatting.

//             Example input: Dear Alice, I'm sorry to hear that you are feeling down.

//             Example output:
//             Unfortunately, I can't help you with that. However, I hope you feel better soon and remember that there are people who care about you.

//             There are many ways to cope with difficult emotions, such as talking to a friend, practicing mindfulness, or engaging in activities you enjoy.

//             Please don't hesitate to reach out if you need support or someone to talk to.
//             `,
//         });

//         for await (const delta of textStream) {
//             stream.update(delta);
//         }

//         stream.done();
//     })();

//     return { output: stream.value };
// }