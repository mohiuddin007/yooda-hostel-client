import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "react-modal";
import DataTable from 'react-data-table-component';
import EditFood from '../EditFoodItem';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

const FilterComponent = ({ filterText, onFilter, onClear }) => (
 <div className="d-flex">
     <input
       id="search"
             className="form-control dataTableSearch"
       type="text"
       placeholder="Filter By Category"
       aria-label="Search Input"
       value={filterText}
       onChange={onFilter}
     />
     <button className="btn btn-primary" type="button" onClick={onClear}>
       X
     </button>
 </div>
);

export default function SeeallFood() {
   const [allFood, setAllFood] = useState([]);
   const [edit, setEdit] = useState(false);
   const [editFoodInfo, setEditFoodInfo] = useState({});
   const [deletePopUP, setDeletePopUP] = useState(false);
   const [deleteId, setDeleteId] = useState();

   const [filterText, setFilterText] = React.useState('');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    useEffect(() => {
        try {
          axios
            .get(`${process.env.REACT_APP_API_URL}food`)
            .then((res) => {
                setAllFood(res.data.response);
            });
        } catch (err) {
          console.log(err);
        }
      }, [edit]);


      const handleEdit = (e) => {
        setEditFoodInfo(e);
        setEdit(true);
      };

      const deleteConfirmation = (e) => {
        setDeletePopUP(true);
        setDeleteId(e);
      };
    
      const deleteCoupon = async (e) => {
        try {
          //
          axios
            .delete(`${process.env.REACT_APP_API_URL}food/${e}`)
            .then((res) => console.log(res));
    
          const filteredFood = allFood.filter((boyan) => boyan._id !== e);
          setAllFood(filteredFood);
          toast.success("Food deleted successfully!");
          setDeletePopUP(false);
        } catch (error) {
          console.log(error);
        }
      };

    //data table related functions
	  const columns = [
      {
        name: 'Food Name',
        selector: row => row.name,
        sortable: true,
      },
      {
        name: 'Price',
        selector: row => row.price,
        sortable: true,
      },
      {
        cell: (row) => 	<>
          <span
          onClick={() => handleEdit(row)}
          style={{ cursor: "pointer" }}
          >
          {" "}
            <FaEdit />{" "}
          </span>
          <span
          onClick={() => deleteConfirmation(row._id)}
          style={{ cursor: "pointer" }}
          className="ml-2"
          >
              <RiDeleteBin6Line />
          </span>
        </>,
        allowOverflow: true,
        button: true,
        width: '56px',
      },
    ];
  
  
    const filteredItems = allFood.filter(
      item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
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
            {edit && (
                <EditFood
                setEdit={setEdit}
                editFoodInfo={editFoodInfo}
                edit={edit}
                />
            )}
            <div>
                 <DataTable
                    title="Food List"
                    columns={columns}
                    data={filteredItems}
                    //  expandableRows
                    // expandableRowsComponent={ExpandedComponent}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    highlightOnHover
                 />
            </div>
            <Modal isOpen={deletePopUP} style={customStyles}>
                <div className="p-3">
                <p className="font-weight-bold text-center">Are you sure?</p>
                <div className="row justify-content-between">
                    <div className="col-5">
                    <button
                        className="btn btn-danger rounded-pill px-4"
                        onClick={() => deleteCoupon(deleteId)}
                    >
                        Yes
                    </button>
                    </div>
                    <div className="col-5 mr-3">
                    <button
                        className="btn btn-success rounded-pill px-3"
                        onClick={() => setDeletePopUP(false)}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                </div>
            </Modal>
        </div>
    )
}