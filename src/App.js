import "./App.css";
import Login from "./components/Login";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddContacts from "./components/AddContacts";
import ViewContacts from "./components/ViewContacts";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer position="top-center" limit={1} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/addcontacts" element={<AddContacts />} />
          <Route path="/ViewContacts/:id" element={<ViewContacts />} />
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
