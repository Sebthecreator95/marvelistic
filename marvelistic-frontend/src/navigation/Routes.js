import React from "react";
import { Routes, Route} from "react-router-dom";
import Comics from "../comics/Comics";
import NotFound from "./NotFound";
import Characters from "../characters/Characters";
import Search from "../search/Search";
import Character from "../character/Character";
import Creators from "../creators/Creators";
import Creator from "../creator/Creator";
import Comic from "../comic/Comic"
import Events from "../events/Events"
import Event from "../event/Event"

function AppRoutes() {
  
    return (
    
        <Routes>
                 
          <Route path = '/search/:search' element = {<Search/>}/>
          

          <Route path = '/characters' element = {<Characters/>}/>
          <Route path = '/characters/:id' element ={<Character/>}/>
          

          <Route path = '/comics' element = {<Comics/>}/>
          <Route path = '/comics/:id' element = {<Comic/>}/>

          <Route path = '/creators' element = {<Creators/>}/>
          <Route path = '/creators/:id' element = {<Creator/>}/>

          <Route path = '/events' element = {<Events/>}/>
          <Route path = '/events/:id' element = {<Event/>}/>

         

          <Route path = '/notfound' element={<NotFound />}/>
        </Routes>
    
    );
}

export default AppRoutes;