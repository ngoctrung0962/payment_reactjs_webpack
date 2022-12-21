import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import FormResult from './components/FormResult/FormResult';


export default function App() {
  return (
    <Routes>
        <Route path='/' exact={true} element={<Form />}  />
       <Route path='/result'  element={<FormResult />} />
    
    </Routes>
  );
}
