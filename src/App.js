import './App.css';

import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router";
import {AuthProvider} from "./context/authContext"
import { Navbar } from './components/Navbar';
import { Post } from './components/Post';
import {Protected} from "./components/Protected"
import {AddPost} from "./pages/AddPost"
import { UpdatePost } from './pages/UpdatePost';

function App() {

  return (

    <AuthProvider>

    <BrowserRouter>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path='/add-post' element={<Protected><AddPost/></Protected>} />
        <Route path='/post/:id/update' element={<Protected><UpdatePost/></Protected>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
