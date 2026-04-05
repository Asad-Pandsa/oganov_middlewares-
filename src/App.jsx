import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentsList from "./pages/studentsList.jsx";
import StudentsDetail from "./pages/studentsDetail.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./styles/theme.css";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";



function App() {
  const theme = useSelector(state => state.ui.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<StudentsList />} />
        <Route path="/student/:id" element={<StudentsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;