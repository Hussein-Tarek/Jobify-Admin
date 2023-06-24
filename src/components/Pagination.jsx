import { useSearchParams } from "react-router-dom";

const Pagination = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleNext = () => {
    searchParams.set("page", pagination.page + 1);
    setSearchParams(searchParams);
  };

  const handlePrev = () => {
    pagination.page > 2
      ? searchParams.set("page", pagination.page - 1)
      : searchParams.delete("page");
    setSearchParams(searchParams);
  };
  return (
    <div className=" mt-8 text-primary flex gap-1 justify-center">
      <button
        className={`btn btn-outline hover:text-primary shadow disabled:text-blue-300`}
        disabled={!pagination.prev}
        onClick={handlePrev}
      >
        «
      </button>
      <button className="btn btn-outline hover:text-primary shadow">
        Page {pagination.page}
      </button>
      <button
        className="btn btn-outline hover:text-primary shadow disabled:text-blue-300"
        disabled={!pagination.next}
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
