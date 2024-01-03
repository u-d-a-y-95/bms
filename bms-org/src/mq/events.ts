export const SEND_EVENT = {
  ADD_USER: "ORG:ADD-USER",
};

interface ConsumeEvent {
  name: string;
  action: Function;
}
export const CONSUME_EVENT: ConsumeEvent[] = [];
