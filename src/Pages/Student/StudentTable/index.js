import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "react-modal";
import DataTable from 'react-data-table-component';
import EditStudentInformation from '../EditStudentInfo';

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
             className="form-control"
       type="text"
       placeholder="Filter By Name"
       aria-label="Search Input"
       value={filterText}
       onChange={onFilter}
     />
     <button className="btn btn-primary" type="button" onClick={onClear}>
       X
     </button>
 </div>
);

export default function SeeAllStudent() {
   const [allStudent, setAllStudent] = useState([]);
   const [edit, setEdit] = useState(false);
   const [editStudentInfo, setEditStudentInfo] = useState({});
   const [deletePopUP, setDeletePopUP] = useState(false);
   const [deleteId, setDeleteId] = useState();

   const [filterText, setFilterText] = React.useState('');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

   const [selectedStudent, setSelectedStudent] = useState([]);

    useEffect(() => {
        try {
          axios
            .get(`${process.env.REACT_APP_API_URL}student`)
            .then((res) => {
                setAllStudent(res.data.response);
            });
        } catch (err) {
          console.log(err);
        }
      }, [edit]);


      const handleEdit = (e) => {
        setEditStudentInfo(e);
        setEdit(true);
      };

      const handleMultiUpdate = () => {
        try {
          //
          axios
            .put(`${process.env.REACT_APP_API_URL}student/multipleUpdate`, selectedStudent)
            .then((res) => console.log(res));
    
          toast.success("Student updated successfully!");
          setSelectedStudent([]);
        } catch (error) {
          console.log(error);
        }
      }

      const deleteConfirmation = (e) => {
        setDeletePopUP(true);
        setDeleteId(e);
      };
    
      const deleteCoupon = async (e) => {
        try {
          //
          axios
            .delete(`${process.env.REACT_APP_API_URL}student/${e}`)
            .then((res) => console.log(res));
    
          const filtered = allStudent.filter((boyan) => boyan._id !== e);
          setAllStudent(filtered);
          toast.success("Student deleted successfully!");
          setDeletePopUP(false);
        } catch (error) {
          console.log(error);
        }
      };

    //data table related functions
    const handleChange = ({ selectedRows }) => {
      // You can set state or dispatch with something like Redux so we can use the retrieved data
      setSelectedStudent(selectedRows);
    };

	  const columns = [
      {
        name: 'Full Name',
        selector: row => row.fullName,
        sortable: true,
      },
      {
        name: 'Roll',
        selector: row => row.roll,
        sortable: true,
      },
      {
        name: 'Age',
        selector: row => row.age,
        sortable: true,
      },
      {
        name: 'Class',
        selector: row => row.class,
        sortable: true,
      },
      {
        name: 'Hall',
        selector: row => row.hall,
        sortable: true,
      },
      {
        name: 'Status',
        selector: row => row.status,
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
  
  
    const filteredItems = allStudent.filter(
      item => item.fullName && item.fullName.toLowerCase().includes(filterText.toLowerCase()),
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
          <div className="col-md-4">
            {
              selectedStudent.length > 0 && 
                <>
                    <button className='btn btn-info' onClick={() => handleMultiUpdate()}>
                      Change Status 
                    </button>
                </>
            }
             
          </div>
          <div className="col-md-8 ">
               <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
          </div>
        </div>
      );
    }, [filterText, resetPaginationToggle, selectedStudent]);
  

    return (
        <div>
            {edit && (
                <EditStudentInformation
                setEdit={setEdit}
                editStudentInfo={editStudentInfo}
                edit={edit}
                />
            )}
            <div className="">
                 <DataTable
                    title="Student List"
                    columns={columns}
                    data={filteredItems}
                    selectableRows
                    onSelectedRowsChange={handleChange}
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