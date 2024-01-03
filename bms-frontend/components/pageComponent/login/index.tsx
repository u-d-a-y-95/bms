import { Button, Group, TextInput, Title, PasswordInput, Text } from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import styles from "./index.module.scss";
import { useLogin } from "@/hooks/apis/auth";
import { useAuthContext } from "@/state/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const schema = z.object({
  mobile: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/),
  password: z.string().nonempty().min(5, "At least 5 charecter needs"),
});

export const Login = () => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const router = useRouter();
  const { mutate: save, isLoading } = useLogin();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      mobile: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = () => {
    save(form.values);
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}> </div>
      <div className={styles.right}>
        <div className={styles.signup}>
          <Title align="center">Login</Title>
          <Form form={form} onSubmit={handleSubmit}>
            <TextInput
              mt="xs"
              label="Mobile"
              placeholder="Enter a mobile number"
              {...form.getInputProps("mobile")}
            />
            <PasswordInput
              my="xs"
              styles={{
                label:{
                  width:"100%"
                }
              }}
              label={<Group position="apart"><span>Password</span> <Link href="/forgotpassword" >Forgot Password?</Link></Group>}
              placeholder="Enter a password"
              {...form.getInputProps("password")}
            />
            <Group position="right">
              <Button type="submit" loading={isLoading}>
                submit
              </Button>
            </Group>
          </Form>
          <div>
            <Text size="sm">Don&apos;t have an account? <Link href="/signup">create</Link></Text>
          </div>
        </div>
      </div>
    </div>
  );
};
