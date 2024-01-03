import { NavLink, Navbar } from "@mantine/core";
import {
  IconAddressBook,
  IconCalculator,
  IconLayoutDashboard,
  IconMessage,
  IconPaperBag,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const navs = [
  {
    label: "Dashboard",
    url: "/",
    icon: IconLayoutDashboard,
    children: [],
  },
  {
    label: "Customer Management",
    url: "",
    icon: IconUsers,
    children: [],
  },
  {
    label: "Bill Management",
    url: "",
    icon: IconCalculator,
    children: [],
  },
  {
    label: "Configuration",
    url: "",
    icon: IconSettings,
    children: [
      {
        label: "Profile",
        url: "/configuration/profile",
        icon: IconUser,
      },
      {
        label: "Employee",
        url: "/configuration/employee",
        icon: IconAddressBook,
      },
      {
        label: "Service",
        url: "",
        icon: IconPaperBag,
      },
      {
        label: "Sms",
        url: "",
        icon: IconMessage,
      },
    ],
  },
];

const Li = ({ items }: any) => {
  const router = useRouter();
  return (
    <>
      {items.map((item: any, index: number) => (
        <NavLink
          label={item.label}
          active={router.pathname === item.url}
          py={12}
          icon={<item.icon size="1rem" />}
          component={Link}
          key={index}
          href={item.url}
        >
          {item?.children?.length && <Li items={item.children} />}
        </NavLink>
      ))}
    </>
  );
};

export default function Nav() {
  return (
    <Navbar
      width={{ sm: "100%", md: "300" }}
      hiddenBreakpoint="sm"
      hidden={true}
    >
      <Navbar.Section grow mt={5}>
        <Li items={navs}></Li>
      </Navbar.Section>
      <Navbar.Section>{}</Navbar.Section>
    </Navbar>
  );
}
