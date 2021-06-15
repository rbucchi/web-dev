/*
Made with Fastify
    https://www.fastify.io/

    
        Execute "npm start" to run application

        API URL: http://127.0.0.1:3000/api/messages

*/

import { app as Application } from "./app";
import { IMessage } from "./model/messages/imessage";

const webServer = (() => {
    const TOP = 25;

    // Require the framework and instantiate it
    const fastify = require('fastify')({ logger: true });
    const app = Application;
    fastify.register(require('fastify-cors'), {
        origin: (origin, cb) => {
            if (/localhost/.test(origin)) {
                //  Request from localhost will pass
                cb(null, true)
                return
            }
            // Generate an error on other origins, disabling access
            // cb(new Error("Not allowed"))
            // for testing purpose:
            cb(null, true)
        }
    })

    // get the list of messages
    fastify.get('/api/messages', (request, reply): IMessage<any>[] => {
        const chatId = request.query.chat ? Number(request.query.chat) : 0;
        const selectedChat = app.GetChat(app.GetChatGUIDs()[chatId]);
        return selectedChat.GetTop(TOP);
    });

    // get a single message
    fastify.get('/api/messages/:id', (request, reply): IMessage<any> | undefined => {
        const chatId = request?.query?.chat ? Number(request.query.chat) : 0;
        const selectedChat = app.GetChat(app.GetChatGUIDs()[chatId]);
        return selectedChat.Get(Number(request.params.id));
    });

    // create a message
    fastify.post('/api/messages', (request, reply): IMessage<any> => {
        const chatId = request?.query?.chat ? Number(request.query.chat) : 0;
        const selectedChat = app.GetChat(app.GetChatGUIDs()[chatId]);
        return selectedChat.Push(request.body.text);
    });

    // update a message
    fastify.put('/api/messages/:id', (request, reply): IMessage<any> | undefined => {
        const chatId = request?.query?.chat ? Number(request.query.chat) : 0;
        const message = app.GetChat(app.GetChatGUIDs()[chatId]).Edit(Number(request.params.id), request.body.text);
        return message;
    });

    // delete a message
    fastify.delete('/api/messages/:id', (request, reply): { msg: string } => {
        const chatId = request?.query?.chat ? Number(request.query.chat) : 0;
        const selectedChat = app.GetChat(app.GetChatGUIDs()[chatId]);
        const id = Number(request.params.id);
        if (selectedChat.Get(id)) {
            selectedChat.Delete(id);
            return { msg: `message with ID ${id} is deleted` };
        }
        reply
            .code(404)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ msg: `message with ID ${id} doesn't exists` })
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