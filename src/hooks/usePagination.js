import { useState } from "react";

const usePage = () => {
  const [pageNumber, setpageNumber] = useState(1);

  const handlePageChange = (direction) => {
    if (direction === "prev") setpageNumber((page) => page - 1);
    else setpageNumber((page) => page + 1);

    window.scrollTo(0, 0);
  };

  return { pageNumber, handlePageChange };
};

export default usePage;
