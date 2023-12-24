//npm init -y
//npm install --save kafkajs

const { Kafka } = require("kafkajs");
//const Kafka = require("kafkajs")();

createTopic();

async function createTopic() {
    try {

        // Admin Stuff..
    const kafka = new Kafka({
        clientId: "kafka_ornek_1",
        brokers: ["192.168.56.1:19092"]
    });

    const admin = kafka.admin();
    console.log("Kafka Broker'a baglaniliyor...");
    await admin.connect();
    console.log("Kafka Broker'a baglanti basarili, Topic usertilecek...");
    await admin.createTopics({
        topics: [
            {
                topic: "logs",
                //Sadece 1 Partition'a sahip olabilirsin
                numPartitions: 1,
                
            },
            {
                topic: "logs2",
                //2 Partition'a sahip olabilirsin
                numPartitions: 2,
                
            }
        ]
    });

    console.log("Topic basarili bir sekilde olusturulmustur...");
    await admin.disconnect();
        
    } catch (error) {
        console.log("Bir Hata Olustu", error);
    } finally {
        process.exit(0);
    }
}