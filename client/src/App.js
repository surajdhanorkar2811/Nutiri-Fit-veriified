import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import Account from "./components/Account/Account";
import Search from "./components/Search/Search";
import Searchlogin from "./components/Search/Searchlogin";
import News from "./components/news/News";
import Help from "./components/help/Help";
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/searchlogin" element={<Searchlogin />} />
        <Route path="/news" element={<News />} />
        <Route path="/help" element={<Help />} />

        
      </Routes>
    </Router>
  );
}

export default App;
