import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export function TableScreen() {
  
  const [tableEntries, setTableEntries] = useState([]);

  const fetchTableData = async () => 
  {
    const res = await fetch(`http://universities.hipolabs.com/search?country=Australia`)
    const json = await res.json()
    setTableEntries(json)
    return
  }

  const addTableEntry = () => 
  {
    // Adding deep-copied version of the first element to the end
    setTableEntries((currentArray) => 
    {
        return currentArray.concat([JSON.parse(JSON.stringify(currentArray[0]))])
    })
  }


  return (
    <div>
      <button onClick={async (event) => {fetchTableData()}}>Load</button>
      <button onClick={() => {addTableEntry()}}>Add</button>
      <button onClick={() => {console.log(tableEntries)}}>Print</button>
    </div>
  );
}
