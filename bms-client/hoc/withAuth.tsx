import { useAuthContext } from "@/state/auth";
import { useRouter, Router } from "next/router";
import { useEffect } from "react";

export const withAuth = (InnerComponent: any) => {
  return function Auth(props: any) {
    const {
      state: { isLoggedIn },
    } = useAuthContext();
    const router = useRouter();
    useEffect(() => {
      if (!isLoggedIn) router.push("/login");
    }, [router, isLoggedIn]);

    return <InnerComponent {...props} />;
  };
};
