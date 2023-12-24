//npm init -y
//npm install --save kafkajs

const { Kafka } = require("kafkajs");
//const Kafka = require("kafkajs")();

const topic_name = process.argv[2] || "logs2"
const partition = process.argv[3] || 0

createConsumer();

async function createConsumer() {
    try {

    const kafka = new Kafka({
        clientId: "kafka_ornek_1",
        brokers: ["192.168.56.1:19092"]
    });

    const consumer = kafka.consumer({
        groupId : "ornek_1_cg_1"
    });
        
    console.log("Consumer'a baglaniliyor...");
    await consumer.connect();
    console.log("Baglanti basarili...");
    
        //Consumer Subscribe..
        await consumer.subscribe({
            topic: topic_name,
            partition: partition,
            //Baslangictan basla
            fromBeginning : true
        })

        await consumer.run({
            eachMessage: async result => {
                console.log('Gelan Mesaj ${result.message.value}, Par => ${result.partition}');
            }
        })
        
    } catch (error) {
        console.log("Bir Hata Olustu", error);
    }
}