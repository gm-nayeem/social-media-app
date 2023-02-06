import './app.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Error from './pages/error/Error';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"
          element={user ? <Home /> : <Navigate to="/register" replace />}
        />
        <Route path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />
        <Route path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        {
          user && (
            <>
              <Route path="/profile/:username" element={<Profile />} />
            </>
          )
        }
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;