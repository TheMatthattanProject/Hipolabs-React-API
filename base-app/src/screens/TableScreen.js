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


  return (
    <div>
      <button onClick={async (event) => {fetchTableData()}}>Load</button>
    </div>
  );
}
