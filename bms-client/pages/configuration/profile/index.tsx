import Profile from "@/components/pageComponent/configuration/profile";
import { withAuth } from "@/hoc/withAuth";

import Head from "next/head";

function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile | BMS</title>
      </Head>
      <Profile/>
    </>
  );
}

export default withAuth(ProfilePage);
