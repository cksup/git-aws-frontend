import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";

import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import DeleUser from "./users/DeleUser";
import Login from "./users/Login";
import Logout from "./users/Logout";
import Join from "./users/Join";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrintUser from "./users/PrintUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/auth/join" element={<Join />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/auth/signin" element={<Login />} />
          <Route exact path="/auth/signout" element={<Logout />} />
          <Route exact path="/auth/members" element={<Home />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/auth/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/deleuser/:id" element={<DeleUser />} />
          <Route exact path="/auth/printuser" element={<PrintUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
