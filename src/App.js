import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import ReactDOM from 'react-dom';
import FormResult from './components/FormResult/FormResult';


export default function App() {
  const _id = "62aff2b13257701b47989e28"
  return (
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='/result' element={<FormResult />} />
    </Routes>
  );
}
