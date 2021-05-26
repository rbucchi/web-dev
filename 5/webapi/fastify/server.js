/*
Made with Fastify
    https://www.fastify.io/

    
        Execute "npm start" to run application

        API URL: http://127.0.0.1:3000/api/messages

*/

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

// Initialize Fastify App
const app = fastify;

// Demo data
let messages = [
    {
        id: 1,
        text: 'This is an experiment'
    },
    {
        id: 2,
        text: 'Fastify is pretty cool'
    },
    {
        id: 3,
        text: 'Just another message, yea!'
    }
];




  
// get the list of messages
app.get('/api/messages', (request, reply) => {
    return messages;
});

// get a single message
app.get('/api/messages/:id', (request, reply) => {

    const id = Number(req.params.id); // message ID

    const message = messages.find(message => message.id === id);

    return message;
});

// create a message
app.post('/api/messages', (request, reply) => {

    const id = messages.length + 1; // generate new ID

    const newmessage = {
        id,
        text: request.body.text
    };

    messages.push(newmessage);

    return newmessage;
});

// update a message
app.put('/api/messages/:id', (request, reply) => {

    const id = Number(request.params.id); // message ID

    const message = messages.find(message => message.id === id);
    if(message){
        message.text = request.body.text;
    }

    return message;
});

// delete a message
app.delete('/api/messages/:id', (request, reply) => {

    const id = Number(request.params.id); // message ID

    messages = messages.filter(message => message.id !== id);

    return { msg: `message with ID ${id} is deleted` };
});







// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();