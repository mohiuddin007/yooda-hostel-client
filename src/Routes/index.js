import React from 'react';
import { Route, Routes } from 'react-router-dom'
import NotFound from '../Components/NotFound/NotFound'
import Student from '../Pages/Student';
import Food from '../Pages/Food';
import AllFoodTable from '../Pages/Food/FoodTable';
import Distribution from '../Pages/Distribution';
import SeeAllStudent from '../Pages/Student/StudentTable';
import SeeAllDistribution from '../Pages/Distribution/DistributionInfo';

export default function AllRoutes() {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<Food/>}/>
        <Route path="/allFood" element={<AllFoodTable/>}/>

        <Route path='/addStudent' element={<Student/>}/>
        <Route path='/allStudent' element={<SeeAllStudent/>}/>
        
        <Route path="/distribution" element={<Distribution/>}/>
        <Route path="/allDistributedList" element={<SeeAllDistribution/>}/>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  )
}
