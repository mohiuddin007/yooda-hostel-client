import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Modal from "react-modal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

export default function EditFood({
    editFoodInfo,
    setEdit,
    edit,
}) {
    const [foodEditInfo, setFoodEditInfo] = useState({});

    useEffect(() => setFoodEditInfo(editFoodInfo), []);

    const foodEdit = async (e) => {
        e.preventDefault();
        try {
            const boyanInserted = await axios.put(
              `${process.env.REACT_APP_API_URL}food/${editFoodInfo._id}`,
              foodEditInfo
            );
    
            //if request success, will show success notification
            if (boyanInserted.data.code === 200) {
                
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

         <h1>Edit this food</h1>
         <form onSubmit={foodEdit} className="mt-3">
                <div className="row">

                    <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                            Food Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded"
                              placeholder="Write food name here"
                              id="exampleInputPassword1"
                              name="name"
                              value={foodEditInfo?.name || ""}
                              required
                              onChange={(e) =>
                                setFoodEditInfo((prev) => ({
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
                       Price<span className="text-danger">*</span>
                       </label>
                       <input
                         type="number"
                         className="form-control rounded"
                         placeholder="Write price here"
                         id="exampleInputPassword1"
                         name="price"
                         value={foodEditInfo?.price || ""}
                         required
                         onChange={(e) =>
                            setFoodEditInfo((prev) => ({
                             ...prev,
                             [e.target.name]: e.target.value,
                           }))
                         }
                       />
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
