import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { LoaderContext } from "../context/loader.context";
import { getCurrentUserToken, logoutUser } from "../services/user.service";
import { setAlert, setLoader } from "../stores/actions/actions";
// import { fetchCookie } from "../services/utility-service";
// import { showAlert } from "../store/alert/alert.store";

export default function InitHttpInterceptor() {
  const dispatch = useDispatch();

  function enableLoader(val = true) {
    dispatch({
      type: setLoader.toString(),
      payload: val,
    });
  }

  function showAlert(payload: { message: string; type: string }) {
    dispatch({
      type: setAlert.toString(),
      payload: payload,
    });
  }

  // Add a request interceptor
  axios.interceptors.request.use(
    function (config: any) {
      enableLoader();
      const session = getCurrentUserToken();
      // Do something before request is sent
      if (session && !config?.url?.includes("https://storage.googleapis.com")) {
        config.headers.Authorization = `Bearer ${session}`;
      }
      return config;
    },
    function (error) {
      enableLoader(false);
      console.log("error", error);
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setTimeout(() => {
        enableLoader(false);
      }, 1000);
      return response;
    },
    function (error) {
      enableLoader(false);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      handleError(error, dispatch);
      return Promise.reject(error);
    }
  );

  function handleError(error: any, dispatch: any) {
    switch (error?.response?.status) {
      case 401:
        logoutUser();
        dispatch({
          type: setAlert.toString(),
          payload: {
            type: "error",
            message: "Session expired, please login again",
          },
        });
        // return router.push('/');
        break;
      default:
        dispatch({
          type: setAlert.toString(),
          payload: { type: "error", message: error?.response?.data?.message },
        });
        break;
    }
  }
}
