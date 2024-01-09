import { useAuthContext } from "@/state/auth";
import { Avatar, Menu } from "@mantine/core";
import { IconLogout, IconMessageCircle, IconUser } from "@tabler/icons-react";

export default function UserSetting() {
  const { dispatch } = useAuthContext();
  const logout = () => {
    dispatch({
      type: "SET_LOGOUT",
    });
  };
  return (
    <Menu shadow="md" width={200} position="bottom-end" withArrow>
      <Menu.Target>
        <Avatar color="cyan" radius="xl">
          MK
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>
          Notifications
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item icon={<IconLogout size={14} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
