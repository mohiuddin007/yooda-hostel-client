import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';


export default function AddFood() {
    const [foodInfo, setFoodInfo] = useState({});

    const saveFood = async (e) => {
        e.preventDefault();
        try {
            console.log(foodInfo);
              const FoodInserted = await axios.post(
                `${process.env.REACT_APP_API_URL}food`,
                foodInfo
              );
      
              //if request success, will show success notification
              if (FoodInserted.data.code === 200) {
                setFoodInfo({});
                toast.success("Food added successfully!");
                e.target.reset();
              }
            
        } catch (error) {
          console.log(error);
          // toast.error("Internal Server Error!");
        }
      };

    return (
        <div className='mt-4 formCardStyle'>
            
           <h1 className="">Add New Food</h1>
                    
            <form onSubmit={saveFood} className="mt-3">
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
                              value={foodInfo?.name || ""}
                              required
                              onChange={(e) =>
                                setFoodInfo((prev) => ({
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
                         value={foodInfo?.price || ""}
                         required
                         onChange={(e) =>
                           setFoodInfo((prev) => ({
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
