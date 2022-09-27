import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

// Emit a connect event.
stan.on('connect', () => {
    console.log('Listener connected to NATS.');

    // Send out a message to our NATS client to no longer send any messages or consider active.
    // Gracefully shutdown the service.
    stan.on('close', () => {
        console.log('NATS connection closed.');
        process.exit();
    })

    const options = stan.subscriptionOptions()
        .setManualAckMode(true)

    const subscription = stan.subscribe(
        'ticket:created',
        'orders-service-queue-group',
        options
    );

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }

        msg.ack();
    });
});

// Setup process watches for interrupt or terminate signal commands to gracefully shutdown the service.
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());