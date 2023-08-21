import React, { useEffect, useState } from "react";
import MarvelApi from "../api/MarvelApi";

import CharacterCard from "../characters/CharacterCard"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";
import NotFound from "../navigation/NotFound";

function Search(){
    
    const [results, updateResults] = useState([]);
    const { search } = useParams();
    useEffect(() => {
        async function searchCharacters(){
            try{
                
                let apiCharacters = await MarvelApi.searchCharacters(search);
                updateResults(apiCharacters)

            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
                    
        }
    }
    searchCharacters()
    }, [search])
   
    let displayedCharcaters = results.map( (result)=>  ( <CharacterCard key={result.id} character={result}/> ) )
    if(displayedCharcaters.length === 0){
        return <NotFound/>
    }
    return(
        <Container className="justify-content-center " >
             <Row xs={1} sm={2} md={3} lg={5} className="justify-content-center  " >
                {displayedCharcaters}
             </Row>

        </Container>)
}
export default Search;