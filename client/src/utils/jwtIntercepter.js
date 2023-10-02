import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = JSON.parse(
      window.localStorage.getItem("sb-wjxguyrdfqbtwsetylfq-auth-token")
    );

    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${hasToken.access_token}`,
      };
    }

    return req;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        window.localStorage.removeItem("sb-wjxguyrdfqbtwsetylfq-auth-token");
        window.location.replace("/");
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
