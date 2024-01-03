import { Channel } from "amqplib";
import { Employee, update } from "../../user";
export const addUser = async (channel: Channel, payload: any, message: any) => {
  try {
    const user: any = {
      name: payload.name,
      mobile: payload.mobile,
      password: payload.password,
      role: payload.role,
      userId: payload.id,
      companyId: payload.companyId,
      status: payload.status,
    };
    const employeeService = new Employee();
    await employeeService.createUser(user);
    channel.ack(message);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  channel: Channel,
  payload: any,
  message: any
) => {
  try {
    const { id, data } = payload;
    await update({ userId: id }, data);
    channel.ack(message);
  } catch (error) {}
};

export const deleteUser = async (
  channel: Channel,
  payload: any,
  message: any
) => {
  try {
    const { id } = payload;
    const employeeService = new Employee();
    await employeeService.deletedUsers({ userId: id });
    console.log("MQ : DELETE-USER ");
    channel.ack(message);
  } catch (error) {
    console.log(error);
  }
};
