import { Aside, Group, NavLink } from "@mantine/core";
import { AppShell, Header } from "@mantine/core";
import Nav from "./nav";
import Topbar from "./header";
// import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<Nav />}
      header={
        <Header height={60}>
          <Topbar />
        </Header>
      }
      // styles={() => {}}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
