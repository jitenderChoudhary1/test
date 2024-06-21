import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import TextEditor from './pages/TextEditor';
import Post from './pages/Post';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={ <PrivateRoute> <Home/> </PrivateRoute> }/>
        <Route path="/text" element={ <PrivateRoute> <TextEditor /> </PrivateRoute> }/>
        <Route path="/post" element={ <PrivateRoute> <Post /> </PrivateRoute> }/>
        <Route path="/edit/:id" element={ <PrivateRoute> <TextEditor /> </PrivateRoute> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
