
import "./App.css";
import React  from "react";
import Home from "./components/Home";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import MovieResults from "./components/search/MovieResults";
import MovieSearch from "./components/search/MovieSearch";
function App() {
  
 

  return (
    
      <>
      <Router>
        <MovieSearch/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/search/:query" element={<MovieResults/>} />
        </Routes>
      </Router>
     
    
      </>
   
  );
 
}
export default App;
 