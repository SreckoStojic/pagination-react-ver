import { useState } from "react";

function usePagination(data, limit) {
    let [currentPage, setCurrentPage] = useState(0);
    let maximumPages = Math.ceil(data.length / limit);
  
    function currentData() {
      const start = currentPage * limit;
      const end = start + limit;
      return data.slice(start, end);
    }
  
    function next() {
      if (Number(currentPage) <= Number(maximumPages)) {
        console.log("if next");
        setCurrentPage(currentPage + 1);
      }
    }
  
    function previous() {
      if (Number(currentPage) > -1) {
        console.log("if previous");
        setCurrentPage(currentPage - 1);
      }
    }
  
    function jump(pageNumber) {
      setCurrentPage(pageNumber);
    }
  
    return { next, previous, jump, currentData, currentPage, setCurrentPage, maximumPages };
  }
  
  export default usePagination;