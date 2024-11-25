import kafka from 'kafka-node'
import { JsonFormatter } from 'tslint/lib/formatters'

const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'})
const producer = new kafka.Producer(client)

producer.on('ready',  () => {
    console.log("Kafka Producer is connected and ready.")
})
producer.on('error',  (err) => {
    console.log("Error with Kafka Producer:", err)
})

const sendMessageToKafka = async (topic: string, message: any) => {
    const payloads = [{
        topic: topic,
        messages: JSON.stringify(message)
    }]
    producer.send(payloads, (err, data) => {
        if(err) {
            console.error("Error sending message:", err)
            return err
        } else {
            console.log("Message sent:", data)
            return data
        }
    })
}

export default sendMessageToKafka