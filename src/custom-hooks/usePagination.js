import { useState } from "react";

function usePagination(data, limit) {
    let [currentPage, setCurrentPage] = useState(1);
    let maximumPages = Math.ceil(data.length / limit);
  
    function currentData() {
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      return data.slice(start, end);
    }
  
    function next() {
      setCurrentPage((currentPage + 1 < maximumPages) ? ++currentPage : currentPage);
    }
  
    function previous() {
      setCurrentPage((currentPage - 1 > 0) ? --currentPage : currentPage);
    }
  
    function jump(pageNumber) {
      setCurrentPage(pageNumber);
    }
  
    return { next, previous, jump, currentData, currentPage, maximumPages };
  }
  
  export default usePagination;