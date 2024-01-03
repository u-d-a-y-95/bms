import { Grid, Stepper, Text, Title } from "@mantine/core";
import { FC, ReactElement } from "react";

interface Props {
  info: {
    companyName: string;
    companyEmail: string;
    ownerName: string;
    ownerMobile: string;
    ownerPassword: string;
  };
}

export const SignupInfo: FC<Props> = ({ info }: Props) => {
  return (
    <Grid h={"80%"} p="xl">
      <Grid.Col span={6}>
        <Title size="h5">Company Info</Title>
        <Text fz="sm">Name</Text>
        <Text fz="xs" c="dimmed">
          {info.companyName}
        </Text>
        <Text fz="sm">Email</Text>
        <Text fz="xs" c="dimmed">
          {info.companyEmail}
        </Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <Title size="h5">Owner Info</Title>
        <Text fz="sm">Name</Text>
        <Text fz="xs" c="dimmed">
          {info.ownerName}
        </Text>
        <Text fz="sm">Mobile</Text>
        <Text fz="xs" c="dimmed">
          {info.ownerMobile}
        </Text>
        <Text fz="sm">Password</Text>
        <Text fz="xs" c="dimmed">
          *********
        </Text>
      </Grid.Col>
    </Grid>
  );
};
