import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto">
        <div className="mx-auto text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold text-blue-600 ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoMatch;
