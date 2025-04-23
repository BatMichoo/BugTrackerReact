import { useRouteError } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "../components/Error";

const ErrorPage = () => {
  const routeError = useRouteError();

  let error;
  if (typeof routeError.data === "object") {
    const errorData = JSON.parse(routeError.data);
    error = {
      message: errorData.message,
      status: routeError.status,
    };
  } else {
    error = {
      message: routeError.data,
      status: routeError.status,
    };
  }

  return (
    <>
      <Header />
      <Error error={error} />
      <Footer />
    </>
  );
};

export default ErrorPage;
