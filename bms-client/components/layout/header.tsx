import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Indicator,
  Text,
  Title,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import UserSetting from "./userSetting";

export default function Topbar() {
  return (
    <Flex
      justify="space-between"
      align="center"
      px="md"
      sx={{ height: "100%" }}
    >
      <div>
        <Title order={3} color="teal">
          BMS
        </Title>
      </div>
      <Flex gap="md" align="center">
        <Indicator color="red">
          <ActionIcon>
            <IconBell />
          </ActionIcon>
        </Indicator>
        <UserSetting />
      </Flex>
    </Flex>
  );
}
