import './App.css';
import usePagination  from './custom-hooks/usePagination';
import faker from  'faker';
import { useState } from 'react';

function App() {

  let fakeData = [];
  const fakeDataCount = 50;
  for (let i = 0; i < fakeDataCount; i++) {
    let obj = new Object({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobArea: faker.name.jobArea()
    })
    fakeData.push(obj);
  }
  const pageLimit = 7;
  let data = usePagination(fakeData, pageLimit);
  let [page, setPage] = useState(data.currentPage);

  function handleChange(event) {
    data.jump(event.target.value);
    data.setCurrentPage(event.target.value);
    setPage(event.target.value);
  }

  function handleNext() {
    data.next();
    setPage(data.currentPage + 1);
  }

  function handlePrevious() {
    data.previous();
    setPage(data.currentPage - 1);
  }

  function pagesToArray(array){
    let pageArray = [];
    for (let i = 1; i <= array; i++){
      pageArray.push(i);
    }
    return pageArray;
  }
  let pagesArray = pagesToArray(data.maximumPages);

  return (
    <div className="App">
      <table className="css-table">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Job Area</th>
        </tr>
        {data.currentData().map(fd => 
          <tr>
            <td>{fd.firstName}</td>
            <td>{fd.lastName}</td>
            <td>{fd.jobArea}</td>
          </tr>  
        )}
      </table>
      <div className="css-pages">
        <button onClick={handlePrevious}>Previous</button>
        <select value={page} onChange={handleChange}>
          {
            pagesArray.map(pageNum => 
              <option value={pageNum}>{pageNum}</option>
            )
          }
        </select>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
