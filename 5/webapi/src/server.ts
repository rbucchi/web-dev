/*
Made with Fastify
    https://www.fastify.io/

    
        Execute "npm start" to run application

        API URL: http://127.0.0.1:3000/api/messages

*/

import { app } from "./app";
import { IMessage } from "./model/messages/imessage";

const webServer = (() => {
    const TOP = 25;

    // Require the framework and instantiate it
    const fastify = require('fastify')({ logger: true });

    const chat = app.GetChat(app.GetGUIDs()[0]);


    // get the list of messages
    fastify.get('/api/messages', (request, reply): IMessage<any>[] => {
        return chat.GetTop(TOP);
    });

    // get a single message
    fastify.get('/api/messages/:id', (request, reply): IMessage<any> | undefined => {
        return chat.Get(Number(request.params.id));
    });

    // create a message
    fastify.post('/api/messages', (request, reply): IMessage<any> => {
        return chat.Push(request.body.text);
    });

    // update a message
    fastify.put('/api/messages/:id', (request, reply): IMessage<any> | undefined => {
        const message = chat.Edit(Number(request.params.id), request.body.text);
        return message;
    });

    // delete a message
    fastify.delete('/api/messages/:id', (request, reply): { msg: string } => {
        const id = Number(request.params.id);
        if (chat.Get(id)) {
            chat.Delete(id);
            return { msg: `message with ID ${id} is deleted` };
        }
        return { msg: `message with ID ${id} doesn't exists` }
    });
    return fastify;
})();


// Run the server!
const start = async () => {
    try {
        await webServer.listen(3000);
    } catch (err) {
        webServer.log.error(err);
        process.exit(1);
    }
};

export { start }