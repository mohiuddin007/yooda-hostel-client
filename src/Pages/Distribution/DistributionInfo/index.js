import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import DataTable from 'react-data-table-component';


const FilterComponent = ({ filterText, onFilter, onClear }) => (
 <div className="d-flex">
     <input
       id="search"
       className="form-control dataTableSearch"
       type="text"
       placeholder="Filter By student id"
       aria-label="Search Input"
       value={filterText}
       onChange={onFilter}
     />
     <button className="btn btn-primary" type="button" onClick={onClear}>
       X
     </button>
 </div>
);

export default function SeeAllDistribution() {
   const [allDistribution, setAllDistribution] = useState([]);


   const [filterText, setFilterText] = React.useState('');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    useEffect(() => {
        try {
          axios
            .get(`${process.env.REACT_APP_API_URL}distribution`)
            .then((res) => {
                setAllDistribution(res.data.response);
            });
        } catch (err) {
          console.log(err);
        }
      }, []);

    

    //data table related functions
	  const columns = [
      {
        name: 'Student Id',
        selector: row => row.studentId,
        sortable: true,
      },
      {
        name: 'Date',
        selector: row => row.date,
        sortable: true,
      },
      {
        name: 'Shift',
        selector: row => row.shift,
        sortable: true,
      },      
      {
        name: 'Food Item',
        selector: row => row.foodItemList,
        sortable: true,
      },
      {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
      }
    ];
  
  
    const filteredItems = allDistribution.filter(
      item => item.studentId && item.studentId.toLowerCase().includes(filterText.toLowerCase()),
    );
  
    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
      };
      return (
        <div className="row">
          <div className="col-md-12 ">
               <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
          </div>
        </div>
      );
    }, [filterText, resetPaginationToggle]);

    return (
        <div>
            <div>
                 <DataTable
                    title="Food Distribution List"
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    highlightOnHover
                 />
            </div>
           
        </div>
    )
}