import React from "react"
import { Route, Routes } from "react-router-dom"
import HoneyTrap from "./HoneyTrap"
import Post from "./Post"
import PostEdit from "./PostEdit"

function App() {
  

  return (
   <Routes>
    <Route exact path="/" element={<HoneyTrap />} />
    <Route exact path="/app" element={<Post />} />
    <Route exact path="/app/:id" element={<PostEdit />} />
   </Routes>
  )
}

export default App
