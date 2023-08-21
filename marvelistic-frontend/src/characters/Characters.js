import React, { useEffect } from "react";
import MarvelApi from "../api/MarvelApi";
import useUpdateState from "../hooks/useUpdateState";
import CharacterCard from "./CharacterCard"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
function Characters(){
    const [characters, updateCharacters] = useUpdateState([]);
   
    useEffect(() => {
        async function getCharacters(){
            try{
                for(let i = 0; i <= 1500; i =i+100){
                    let apiCharacters = await MarvelApi.allCharacters(i);
                    updateCharacters(apiCharacters)
                }
                    
                    
            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
                    return err.message
        }
    }
    getCharacters()
    }, [])
   
    let displayedCharcaters = characters.map( (character)=>  ( <Col key={character.id}><CharacterCard  character={character}/></Col> ) )

    return(
        <Container className="justify-content-center " >
             <Row xs={1} sm={2} md={3} lg ={5} className="justify-content-center  " >
                {displayedCharcaters}
             </Row>

        </Container>
    )
}
export default Characters