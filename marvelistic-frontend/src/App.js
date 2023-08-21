
import React from "react";
import { BrowserRouter} from "react-router-dom";
import Title from "./title/Title";
import SearchForm from "./navigation/SearchForm";
import Routes from "./navigation/Routes"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Title />
        <SearchForm/>
        <div className="background align-items-center">
          <Routes/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
