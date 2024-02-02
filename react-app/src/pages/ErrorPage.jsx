import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-screen h-screen mx-auto flex flex-col justify-center items-center space-y-8">
      <h1 className="text-2xl text-orange-400 font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={'/'} className="text-blue-300 p-2 text-sm font-semibold">Go Back</Link>
    </div>
  );
}