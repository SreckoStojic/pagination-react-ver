import './App.css';
import usePagination  from './custom-hooks/usePagination';
import faker from  'faker';
import { useState, useEffect } from 'react';

  let fakeData = [];
  const fakeDataCount = 50;
  for (let i = 0; i < fakeDataCount; i++) {
    let obj = new Object({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobArea: faker.name.jobArea()
    })
    fakeData.push(obj);
  }

function App() {
  const pageLimit = 7;
  let data = usePagination(fakeData, pageLimit);
  let [page, setPage] = useState(data.currentPage);
  
  function handleChange(event) {
    setPage(Number(event.target.value));
    data.jump(Number(event.target.value));
  }

  function handleNext() {
    data.next();
    setPage(data.currentPage); 
  }

  function handlePrevious() {
    data.previous();
    setPage(data.currentPage);
  }

  function pagesToArray(array){
    let pageArray = [];
    for (let i = 0; i < array; i++){
      pageArray.push(i);
    }
    return pageArray;
  }
  let pagesArray = pagesToArray(data.maximumPages);
  
  useEffect(() => {
    setPage(data.currentPage);
  }, [data.currentPage]);

  return (
    <div className="App">
      <table className="css-table">
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Job Area</th>
        </tr>
        {data.currentData().map(fd => 
          <tr>
            <td>{fd.id}</td>
            <td>{fd.firstName}</td>
            <td>{fd.lastName}</td>
            <td>{fd.jobArea}</td>
          </tr>  
        )}
      </table>
      <div className="css-pages">
        <button onClick={handlePrevious} disabled={page === 0 ? true : ''}>Previous</button>
        <select value={page} onChange={handleChange}>
          {
            pagesArray.map(pageNum => 
              <option value={pageNum}>{pageNum}</option>
            )
          }
        </select>
        <button onClick={handleNext} disabled={page === data.maximumPages - 1 ? true : ''}>Next</button>
      </div>
    </div>
  );
}

export default App;
