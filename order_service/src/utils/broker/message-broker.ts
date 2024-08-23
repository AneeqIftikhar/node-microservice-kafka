import { MessageBrokerType, PublishType } from "./broker.type";


export const MessageBroker: MessageBrokerType = {
    connectionProducer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disConnectProducer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    publish: function (data: PublishType): Promise<void> {
        throw new Error("Function not implemented.");
    },
    connectionConsumer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disConnectConsumer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    subscribe: function (messageHandler: Function, topic: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
}