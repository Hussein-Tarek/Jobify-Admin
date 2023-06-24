import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import AuthProvider from "./context/auth-context";

import "./App.css";
import Jobs from "./pages/Jobs";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Employers from "./pages/Employers";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Guard from "./utils/Guard";
import Container from "./components/Container";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Container>
            <Navbar />
            <Sidebar />
            <div className="container flex flex-col items-center  mt-5">
              <Routes>
                <Route element={<Guard />}>
                  <Route path="/" element={<Employers />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/users" element={<Users />} />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
