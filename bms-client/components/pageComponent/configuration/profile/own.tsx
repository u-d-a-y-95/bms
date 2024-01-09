import { useGetEmployeeById, useUpdateEmployees } from "@/hooks/apis/employee";
import { useAuthContext } from "@/state/auth";
import {
  Button,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().nonempty(`Name can't be empty`),
    email: z.string().email().optional().or(z.null()),
    mobile: z
      .string()
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid mobile number"),
    address: z.string().optional().or(z.null()),
  })
  .transform((obj) => obj);

export const OwnProfile = () => {
  const {
    state: { user },
  } = useAuthContext();
  const { data } = useGetEmployeeById(user?.userId || null);
  const { mutate, isLoading } = useUpdateEmployees();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: zodResolver(schema),
    transformValues: (values) => {
      const { name, mobile, email, address } = values;
      return Object.fromEntries(
        Object.entries({ name, mobile, email, address }).filter(
          ([key, value]) => value
        )
      );
    },
  });

  useEffect(() => {
    if (data?.data) form.setValues(data.data);
  }, [data]);

  const submitForm = (values: any) => {
    mutate({
      id: user?.userId,
      employee: values,
    });
  };
  return (
    <Grid mt="md">
      <Grid.Col md={3}>
        <Image
          mt="md"
          width={250}
          height={250}
          src={null}
          alt="With default placeholder"
          withPlaceholder
        />
      </Grid.Col>
      <Grid.Col md={6} pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps("name")}
          />
          <TextInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Mobile"
            placeholder="Enter your mobile"
            {...form.getInputProps("mobile")}
          />
          <Textarea
            label="Address"
            placeholder="Enter your address"
            {...form.getInputProps("address")}
          />
          <Group position="right">
            <Button
              mt="md"
              type="submit"
              disabled={!form.isTouched() || !form.isValid()}
            >
              Update
            </Button>
          </Group>
        </form>
      </Grid.Col>
    </Grid>
  );
};
