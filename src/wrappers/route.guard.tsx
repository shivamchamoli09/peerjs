import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PUBLIC_URLS } from "../core/constants/constants";
import {
  getCurrentUser,
  getCurrentUserToken,
} from "../core/services/user.service";
import { deleteAllCookies } from "../core/services/utility.service";

export default function RouteGuard({ children, pageProps }: any) {
  const router = useRouter();
  const [routeAccess, setRouteAccess] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      const session = getCurrentUser() && getCurrentUserToken();
      if (session && PUBLIC_URLS?.includes(url)) {
        return router?.push("/rooms");
      } else if (!session && !PUBLIC_URLS?.includes(url)) {
        deleteAllCookies();
        return router?.push("/login");
      }
      setRouteAccess(true);
    };
    handleRouteChange(router?.route?.split("/")[1]);
  }, [router]);

  return routeAccess ? <>{children}</> : <></>;
}
