import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthnContext } from "./hooks/useAuthnContext";

import HeaderComponent from "./components/HeaderComponent";
import MainPageLecturer from "./pages/MainPageLecturer";
import SetExamPage from "./pages/SetExamPage";
import TakeExamPage from "./pages/TakeExamPage";
import MainPageStudent from "./pages/MainPageStudent";
import FooterComponent from './components/FooterComponent';
import SignInPageStudent from "./pages/SignInPageStudent";
import SignInPageLecturer from "./pages/SignInPageLecturer";
import MainPage from "./pages/MainPage";
import ExamResultsPage from "./pages/ExamResultsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { user } = useAuthnContext();

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={!user ? <MainPage /> : user.userRole === 'lecturer' ? <Navigate to='/lecturer' /> : <Navigate to='/student' />} />

        <Route path='/signin' element={!user ? <SignInPageStudent /> : user.userRole === 'lecturer' ? <Navigate to='/lecturer' /> : <Navigate to='/student' />} />

        <Route path='/signin/lecturer' element={!user ? <SignInPageLecturer /> : user.userRole === 'lecturer' ? <Navigate to='/lecturer' /> : <Navigate to='/student' />} />

        <Route path="/lecturer" element={user ? <MainPageLecturer /> : <Navigate to='/signin/lecturer' />} />

        <Route path="/lecturer/set-exam" element={user ? <SetExamPage /> : <Navigate to='/signin/lecturer' />} />

        <Route path="/lecturer/results" element={user ? <ExamResultsPage /> : <Navigate to='/signin/lecturer' />} />

        <Route path='/student' element={user ? <MainPageStudent /> : <Navigate to='/signin' />} />

        <Route path="/student/:id" element={user ? <TakeExamPage /> : <Navigate to='/signin' />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterComponent />
    </div >
  )
}

export default App
