import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import { useEffect, useState } from "react";
import './App.css';
import './index.css';
import TaskItem from "./components/TaskItem";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/taskList" element={<TaskItem />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/editTask/:id" element={<EditTask />} /> {/* Updated Route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
