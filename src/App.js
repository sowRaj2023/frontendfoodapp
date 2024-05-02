import React from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"


import LoginForm from "./components/LoginForm"
import Menu from "./components/Menu"
import MyOrder from "./components/MyOrder"
import NotFound from "./components/NotFound"
import Home from "./components/Home"

const App = () => (
  <Router>
  
  <Routes>
  <Route path="/login" element={<LoginForm />}/> 
  <Route path="/" element={<Home />}/>  
  
  <Route path="/menu" element={<Menu />}/>
  <Route path="/myorder" element={<MyOrder />}/>
  <Route path="*" element = {<NotFound/>}/>
  
 
  </Routes>
  </Router>

)

export default App
