import { Tabs, Title } from "@mantine/core";
import { OwnProfile } from "./own";

export default function Profile() {
  return (
    <>
      <Title order={3}>Profile</Title>
      <Tabs
        defaultValue="own"
        mt="md"
        styles={{
          tabsList: {
            width: "fit-content",
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="own">Own</Tabs.Tab>
          <Tabs.Tab value="company">Company</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="own">
          <OwnProfile />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
