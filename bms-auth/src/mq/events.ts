import { addUser, updateUser, deleteUser } from "../services/mq/consumer/user";

export const CONSUME_EVENT = [
  {
    exchangeName: "ORG",
    exchangeType: "topic",
    routingKey: "UPDATE-USER",
    queueName: "AUTH:ORG:UPDATE-USER",
    action: updateUser,
  },
  {
    exchangeName: "ORG",
    exchangeType: "topic",
    routingKey: "ADD-USER",
    queueName: "AUTH:ORG:ADD-USER",
    action: addUser,
  },
  {
    exchangeName: "ORG",
    exchangeType: "topic",
    routingKey: "DELETE-USER",
    queueName: "AUTH:ORG:DELETE-USER",
    action: deleteUser,
  },
];
