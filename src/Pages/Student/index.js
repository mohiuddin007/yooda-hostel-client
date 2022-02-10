import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';


export default function AddStudent() {
    const [studentInfo, setStudentInfo] = useState({});

    const saveStudent = async (e) => {
        e.preventDefault();
        try {
            console.log(studentInfo);
              const studentInserted = await axios.post(
                `${process.env.REACT_APP_API_URL}student`,
                studentInfo
              );
      
              //if request success, will show success notification
              if (studentInserted.data.code === 200) {
                setStudentInfo({});
                toast.success("Student added successfully!");
                e.target.reset();
              }
            
        } catch (error) {
          console.log(error);
          // toast.error("Internal Server Error!");
        }
      };

    return (
        <div className='mt-4 formCardStyle'>
            
           <h1>Add a new Student</h1>
                    
            <form onSubmit={saveStudent} className="mt-3">
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
                              value={studentInfo?.fullName || ""}
                              required
                              onChange={(e) =>
                                setStudentInfo((prev) => ({
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
                         value={studentInfo?.roll || ""}
                         required
                         onChange={(e) =>
                           setStudentInfo((prev) => ({
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
                         value={studentInfo?.age || ""}
                         required
                         onChange={(e) =>
                           setStudentInfo((prev) => ({
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
                         value={studentInfo?.class || ""}
                         required
                         onChange={(e) =>
                           setStudentInfo((prev) => ({
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
                         value={studentInfo?.hall || ""}
                         required
                         onChange={(e) =>
                           setStudentInfo((prev) => ({
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
                                value={studentInfo?.status || ""}
                                required
                                onChange={(e) =>
                                    setStudentInfo((prev) => ({
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
                           type="submit"
                           className="btn btn-success rounded-pill px-4 ml-auto"
                         >
                           Done
                         </button>
                       </div>  
                    </div> 

                </div>
            </form>
        
           
        </div>
    )
}
