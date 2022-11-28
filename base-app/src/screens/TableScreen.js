import React, { useState } from 'react';
import DataTable from 'react-data-table-component';



export function TableScreen() {
  
  const [tableEntries, setTableEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  
  
  const columns = [
    { name: "alpha_two_code", selector: row => row['alpha_two_code'], sortable: true },
    { name: "country", selector: row => row['country'], sortable: true },
    { name: "domains", selector: row => row['domains'], sortable: true },
    { name: "name", selector: row => row['name'], sortable: true },
    { name: "state-province", selector: row => row['state-province'], sortable: true },
    { name: "web_pages", selector: row => row['web_pages'], sortable: true },
  ]
  

  const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
            maxWidth: '80vh'
        },
    }
};

  const searchTableData = (val, array) => 
  {
    // Checks whether a string exists within a JSON object
    // Normalises compared strings by converting everything to lowercase
    setFilteredEntries(array.filter((obj) => 
    {
      return JSON.stringify(obj).toLocaleLowerCase().includes(val.toLocaleLowerCase());
    }))
  }

  const fetchTableData = async () => 
  {
    const res = await fetch(`http://universities.hipolabs.com/search?country=Australia`)
    const json = (await res.json());
    setTableEntries(() => {
      return json
    })

    setFilteredEntries(() => searchTableData("", json))
    return
  }

  const addTableEntry = () => 
  {
    // Adding deep-copied version of the first element to the end
    setFilteredEntries((currentArray) => 
    {
        return currentArray.concat([JSON.parse(JSON.stringify(currentArray[0]))])
    })
    
    return
  }

  const deleteLastTableEntry = () => 
  {
    // Remove last element from table array
    setFilteredEntries((currentArray) => 
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
      <input className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(val) => { searchTableData(val.target.value, tableEntries) }} placeholder="Search"/>
      <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l' onClick={async () => {fetchTableData()}}>Load</button>
      <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4' onClick={() => {addTableEntry()}}>Add</button>
      <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r' onClick={() => {deleteLastTableEntry()}}>Delete</button>
      <div className='tableContainer'>
        <DataTable
        data={filteredEntries}
        columns={columns}
        customStyles={customStyles}
        pagination
        dense
        striped
        fixedHeader
        />
      </div>
    </div>
  );
}
