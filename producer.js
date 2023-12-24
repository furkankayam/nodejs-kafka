//npm init -y
//npm install --save kafkajs

const { Kafka } = require("kafkajs");
//const Kafka = require("kafkajs")();

const topic_name = process.argv[2] || "logs2"
const partition = process.argv[3] || 0

createProducer();

async function createProducer() {
    try {

    const kafka = new Kafka({
        clientId: "kafka_ornek_1",
        brokers: ["192.168.56.1:19092"]
    });

    const producer = kafka.producer();
    console.log("Producer'a baglaniliyor...");
    await producer.connect();
    console.log("Baglanti basarili...");
    
    const message_result = await producer.send({
        topic: topic_name,
        messages: [
            {
                value: "Bu bir test log mesajidir...",
                partition : partition
            }
        ]
    })
        
        console.log("Gonderim islemi basarilidir", JSON.stringify(message_result));
        
        await producer.disconnect();
        
    } catch (error) {
        console.log("Bir Hata Olustu", error);
    } finally {
        process.exit(0);
    }
}