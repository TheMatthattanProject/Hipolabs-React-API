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
    return
  }

  const deleteLastTableEntry = () => 
  {
    // Remove last element from table array
    setTableEntries((currentArray) => 
    {
        // Array.pop() doesn't work in this context due to way objects are referenced
        // Technically it could be used on tableEntries directly, but this skips
        // the change propagation process.

        // Therefore, slice must be used to return an array.
        // The second input into slice is excluded, so we can use this to offset the start from 1 index.
        // - 1 to represent removing the last element
        return currentArray.slice(0, currentArray.length - 1)
    })
    return
  }


  return (
    <div>
      <button onClick={async (event) => {fetchTableData()}}>Load</button>
      <button onClick={() => {addTableEntry()}}>Add</button>
      <button onClick={() => {deleteLastTableEntry()}}>Delete</button>
      <button onClick={() => {console.log(tableEntries)}}>Print</button>
    </div>
  );
}
