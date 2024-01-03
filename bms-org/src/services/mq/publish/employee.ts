import { mq } from "../../../mq";

export const updateUserData = (payload: any) => {
  const exchangeName = "ORG";
  const exchangeType = "topic";
  const routingKey = "UPDATE-USER";
  mq.publishMessage(exchangeName, exchangeType, routingKey, payload);
};

export const addUserData = (payload: any) => {
  const exchangeName = "ORG";
  const exchangeType = "topic";
  const routingKey = "ADD-USER";
  mq.publishMessage(exchangeName, exchangeType, routingKey, payload);
};

export const deleteUserData = (payload: any) => {
  const exchangeName = "ORG";
  const exchangeType = "topic";
  const routingKey = "DELETE-USER";
  mq.publishMessage(exchangeName, exchangeType, routingKey, payload);
};
