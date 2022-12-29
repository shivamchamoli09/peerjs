import { Button } from "@mui/material";
import { useRouter } from "next/router";
import initHttpInterceptor from "../core/interceptors/http.interceptor";
import { isUserSessionActive, logoutUser } from "../core/services/user.service";
import AlertComponent from "./alert";
import Header from "./Header";

function Layout({ children }: { children: any }) {
  initHttpInterceptor();
  return (
    <>
      {isUserSessionActive() && <Header />}
      <AlertComponent />
      {children}
    </>
  );
}

export default Layout;
