import { TransactionData } from "../../types";
import EventsServices from "../database/events.database";

const { insertEvent } = EventsServices();

export default async function QueueServices() {
    try {
        var connection = await require('amqplib').connect(process.env.AMQP_URL as string);
        var channel = await connection.createChannel();
        console.log('✅ Connected to RabbitMQ');
        const queue = 'events';
        await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, async (message: any) => {
            try {
                if (message) {
                    const data = JSON.parse(message.content.toString());
                    console.log('Received Event: ', data);
                    await insertEvent(data);
                    await channel.ack(message);
                }
            } catch (error) {
                console.error('Error processing event: ', error);
                channel.nack(message);
            }
        });

        async function sendToQueue(message: TransactionData) {
            try {
                await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            } catch (error) {
                console.error('Error sending event to RabbitMQ: ', error);
                throw error;
            }
        }

        return {
            sendToQueue,
        }
    } catch (error) {
        console.error('Error connecting to RabbitMQ: ', error);
        await channel.close();
        await connection.close();
        process.exit(1);
    }
};