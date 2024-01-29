
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./components/Books";
import React from "react";
import Forms from "./components/Form"

export default class App extends React.Component{

  render(){
    return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Books/>} />
          <Route path="/Forms" element={<Forms/>} />
        </Routes>
      </div>
    </BrowserRouter>
    )
  }  
}