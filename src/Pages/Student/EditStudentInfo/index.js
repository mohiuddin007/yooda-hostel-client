import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Modal from "react-modal";
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : '55%',
  },
};

export default function EditStudentInformation({
    editStudentInfo,
    setEdit,
    edit,
}) {
    const [studentEditInfo, setStudentEditInfo] = useState({});

    useEffect(() => setStudentEditInfo(editStudentInfo), []);

    const studentEdit = async (e) => {
        e.preventDefault();
        try {
            const inserted = await axios.put(
              `${process.env.REACT_APP_API_URL}student/${editStudentInfo._id}`,
              studentEditInfo
            );
    
            //if request success, will show success notification
            if (inserted.data.code === 200) {
                
              setEdit(false)
              toast.success("Boayn edited successfully!");
              e.target.reset();
            }
        } catch (error) {
          console.log(error);
          toast.error("Internal Server Error!");
        }
      };
    return (
        <>
         <Modal isOpen={edit} style={customStyles}>
         <h1 className="ml-4">Edit a Boyan</h1>
         <form onSubmit={studentEdit} className="mt-3">
                <div className="row">

                    <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                            Full Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Write student's full name here"
                              id="exampleInputPassword1"
                              name="fullName"
                              value={studentEditInfo?.fullName || ""}
                              required
                              onChange={(e) =>
                                setStudentEditInfo((prev) => ({
                                  ...prev,
                                  [e.target.name]: e.target.value,
                                }))
                              }
                            />
                          </div>
                    </div>

                    <div className="col-md-6">
                     <div className="form-group">
                       <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                       Roll<span className="text-danger">*</span>
                       </label>
                       <input
                         type="number"
                         className="form-control rounded"
                         placeholder="Write student's roll"
                         id="exampleInputPassword1"
                         name="roll"
                         value={studentEditInfo?.roll || ""}
                         required
                         onChange={(e) =>
                           setStudentEditInfo((prev) => ({
                             ...prev,
                             [e.target.name]: e.target.value,
                           }))
                         }
                       />
                     </div>
                    </div>

                    <div className="col-md-6">
                     <div className="form-group">
                       <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                       Age<span className="text-danger">*</span>
                       </label>
                       <input
                         type="number"
                         className="form-control rounded"
                         placeholder="Write student age here"
                         id="exampleInputPassword1"
                         name="age"
                         value={studentEditInfo?.age || ""}
                         required
                         onChange={(e) =>
                           setStudentEditInfo((prev) => ({
                             ...prev,
                             [e.target.name]: e.target.value,
                           }))
                         }
                       />
                     </div>
                    </div>

                    <div className="col-md-6">
                     <div className="form-group">
                       <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                       Class<span className="text-danger">*</span>
                       </label>
                       <input
                         type="text"
                         className="form-control rounded"
                         placeholder="Write student's class name"
                         id="exampleInputPassword1"
                         name="class"
                         value={studentEditInfo?.class || ""}
                         required
                         onChange={(e) =>
                           setStudentEditInfo((prev) => ({
                             ...prev,
                             [e.target.name]: e.target.value,
                           }))
                         }
                       />
                     </div>
                    </div>

                    <div className="col-md-6">
                     <div className="form-group">
                       <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                       Hall No<span className="text-danger">*</span>
                       </label>
                       <input
                         type="text"
                         className="form-control rounded"
                         placeholder="Write hall number"
                         id="exampleInputPassword1"
                         name="hall"
                         value={studentEditInfo?.hall || ""}
                         required
                         onChange={(e) =>
                           setStudentEditInfo((prev) => ({
                             ...prev,
                             [e.target.name]: e.target.value,
                           }))
                         }
                       />
                     </div>
                    </div>


                    <div className="col-md-6">
                          <div className="form-group">
                              <label for="exampleInputEmail1" className="font-weight-bold">
                                Select status<span className="text-danger">*</span>
                              </label>
                              
                              <select
                                className="form-control rounded"
                                id="exampleInputEmail1"
                                name="status"
                                value={studentEditInfo?.status || ""}
                                required
                                onChange={(e) =>
                                    setStudentEditInfo((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                  }))
                                }
                              >
                                <option value="active">Active</option>
                                    <option value="inActive">In Active</option>
                              </select>  
                          </div>
                        </div>
                          
                    <div className="col-md-4">
                       <div className="mt-4 ">
                         <button
                           type="button"
                           className="btn btn-danger rounded-pill px-4"
                           onClick={() => setEdit(false)}
                         >
                           Cancel
                         </button>
                         <button
                           type="submit"
                           className="btn btn-success rounded-pill px-4 ml-2"
                         >
                           Done
                         </button>
                       </div>  
                    </div> 

                </div>
            </form>
         </Modal>   
        </>
    )
}
