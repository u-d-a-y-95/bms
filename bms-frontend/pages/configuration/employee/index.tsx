import Employee from "@/components/pageComponent/configuration/employee";
import { withAuth } from "@/hoc/withAuth";

import Head from "next/head";

function EmployeePage() {
  return (
    <>
      <Head>
        <title>Employee | BMS</title>
      </Head>
      <Employee />
    </>
  );
}

export default withAuth(EmployeePage);
