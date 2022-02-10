import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import moment from 'moment';


export default function Distribution() {
    const [distributionInfo, setDistributionInfo] = useState({});
    const [allDistribution, setAllDistribution] = useState([]);
    const [allStudent, setAllStudent] = useState([]);
    const [allFood, setAllFood] = useState([])


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
    }, []);

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
    }, []);

    const saveDistribution = async (e) => {
        e.preventDefault();
        try {
            // console.log(distributionInfo);

            const specificStudent = allDistribution.filter(item => item.studentId === distributionInfo.studentId);
            const mealShift = specificStudent.filter(item => item.shift == distributionInfo.shift);
            const mealDate = specificStudent.filter(item => moment(item.date).format('L') == moment(distributionInfo.date).format('L'));

            if(mealShift.length < 1 && mealDate.length < 3) { 
              const distributionInserted = await axios.post(
                `${process.env.REACT_APP_API_URL}distribution`,
                distributionInfo
              );
      
              //if request success, will show success notification
              if (distributionInserted.data.code === 200) {
                setDistributionInfo({});
                toast.success("Food distributed successfully!");
                e.target.reset();
              }
            }else{
                toast.warning("Already Served!")
            }
            
        } catch (error) {
          console.log(error);
          // toast.error("Internal Server Error!");
        }
      };

      // console.log(distributionInfo)

    return (
        <div className='mt-4 formCardStyle'>
            
           <h1>Food Distribution</h1>
                    
            <form onSubmit={saveDistribution} className="mt-3">
                <div className="row">

                    <div className="col-md-6">
                          <div className="form-group">
                              <label for="exampleInputEmail1" className="font-weight-bold">
                                Select Student<span className="text-danger">*</span>
                              </label>
                              
                              <input list="brow" 
                               className="form-control rounded"
                               id="exampleInputEmail1"
                               placeholder='Search student by roll'
                               name="studentId"
                               value={distributionInfo?.studentId || ""}
                               required
                               onChange={(e) =>
                                   setDistributionInfo((prev) => ({
                                   ...prev,
                                   [e.target.name]: e.target.value,
                                 }))
                               }
                              />
                              <datalist id="brow">
                                {
                                  allStudent && allStudent.map(item => 
                                    <option value={item._id}>{item.fullName} {item.roll}</option>
                                    )
                                }
                                </datalist>
                          </div>
                        </div>  

                    <div className="col-md-6">
                     <div className="form-group">
                       <label htmlFor="exampleInputPassword1" className="font-weight-bold">
                       Date<span className="text-danger">*</span>
                       </label>
                       <input
                         type="date"
                         className="form-control rounded"
                         id="exampleInputPassword1"
                         name="date"
                         value={distributionInfo?.date || ""}
                         required
                         onChange={(e) =>
                           setDistributionInfo((prev) => ({
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
                                Select shift<span className="text-danger">*</span>
                              </label>
                              
                              <select
                                className="form-control rounded"
                                id="exampleInputEmail1"
                                name="shift"
                                value={distributionInfo?.shift || ""}
                                required
                                onChange={(e) =>
                                    setDistributionInfo((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                  }))
                                }
                              >
                                <option>Select</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                              </select>  
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
                                value={distributionInfo?.status || ""}
                                required
                                onChange={(e) =>
                                    setDistributionInfo((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                  }))
                                }
                              >
                                <option>Select</option>
                                <option value="served">Served</option>
                              </select>  
                          </div>
                        </div>   

                        <div className="col-md-6">
                          <div className="form-group">
                              <label for="exampleInputEmail1" className="font-weight-bold">
                                Select Food Item<span className="text-danger">*</span>
                              </label>
                              
                              <select
                                className="form-control rounded"
                                id="exampleInputEmail1"
                                name="foodItemList"
                                value={distributionInfo?.foodItemList || ""}
                                required
                                onChange={(e) =>
                                    setDistributionInfo((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                  }))
                                }
                              >
                                <option>Select Food</option>
                                {
                                  allFood && allFood.map(item => 
                                    <option value={item.name}>{item.name}</option>
                                    )
                                }
                                
                              </select>  
                          </div>
                        </div>  
                          
                    <div className="col-md-4">
                       <div className="mt-4 ">
                         <button
                           type="submit"
                           className="btn btn-success rounded-pill px-4 ml-auto"
                         >
                           Submit
                         </button>
                       </div>  
                    </div> 

                </div>
            </form>
        
           
        </div>
    )
}
