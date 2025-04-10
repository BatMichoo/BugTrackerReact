import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  const errorData = JSON.parse(error.data);

  return (
    <>
      <h1>Something went wrong!</h1>
      <h3>{errorData.status}</h3>
      <p>{errorData.message}</p>
    </>
  );
};

export default ErrorPage;
