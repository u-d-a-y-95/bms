import { useSignup } from "@/hooks/apis/auth";
import { mantineValidate } from "@/utils/mantine";
import { Button, Group, Stepper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";
import styles from "./index.module.scss";
import { SignupInfo } from "./signupInfo";

const companySchema = z.object({
  companyName: z.string().nonempty("Name cannot be empty"),
  companyEmail: z.string().email("Invalid email"),
});
const ownerSchema = z.object({
  ownerName: z.string().nonempty("Name cannot be empty"),
  ownerMobile: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/),
  ownerPassword: z.string().nonempty().min(5, "At least 5 charecter needs"),
});

export const Signup = () => {
  const { mutate: signup } = useSignup();
  const [active, setActive] = useState(0);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      companyName: "",
      companyEmail: "",
      ownerName: "",
      ownerMobile: "",
      ownerPassword: "",
    },
    validate: (values) => {
      if (active == 0) {
        return mantineValidate(values, companySchema);
      }
      if (active == 1) {
        return mantineValidate(values, ownerSchema);
      }
      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const save = () => {
    const { ownerName, ownerMobile, ownerPassword, companyEmail, companyName } =
      form.values;
    const payload = {
      company: {
        name: companyName,
        email: companyEmail,
      },
      employee: {
        name: ownerName,
        mobile: ownerMobile,
        password: ownerPassword,
      },
    };
    signup(payload);
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}> </div>
      <div className={styles.right}>
        <div className={styles.signup}>
          <Title align="center">Sign Up</Title>
          <Stepper
            active={active}
            my="xl"
            radius="sm"
            styles={{
              root: {
                height: "320px",
              },
              stepIcon: {
                width: "3rem",
                height: "3rem",
              },
              stepDescription: {
                width: "65px",
                fontSize: ".65rem",
              },
            }}
          >
            <Stepper.Step label="First step" description="Company information">
              <TextInput
                label="Name"
                placeholder="Enter company name"
                {...form.getInputProps("companyName")}
              />
              <TextInput
                mt="xs"
                label="Email"
                placeholder="Enter a email"
                {...form.getInputProps("companyEmail")}
              />
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Owner information">
              <TextInput
                label="Name"
                placeholder="Enter your name"
                {...form.getInputProps("ownerName")}
              />
              <TextInput
                mt="xs"
                label="Mobile"
                placeholder="Enter a mobile number"
                {...form.getInputProps("ownerMobile")}
              />
              <TextInput
                mt="xs"
                label="Password"
                placeholder="Enter a password"
                {...form.getInputProps("ownerPassword")}
              />
            </Stepper.Step>
            <Stepper.Completed>
              <SignupInfo info={form.values} />
            </Stepper.Completed>
          </Stepper>

          <Group position="right">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active < 2 && <Button onClick={nextStep}>Next step</Button>}
            {active === 2 && <Button onClick={save}>Procced</Button>}
          </Group>
        </div>
      </div>
    </div>
  );
};
