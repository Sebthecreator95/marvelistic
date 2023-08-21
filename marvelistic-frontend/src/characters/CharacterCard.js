import React from "react"
import "./CharacterCard.css"
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function CharacterCard({character}){
    
    let thumbnailPath = character.thumbnail.path;
    let thumbnailExtension = character.thumbnail.extension;
    let thumbnailUrl = `${thumbnailPath}.${thumbnailExtension}`
    return(
        <a href={`/characters/${character.id}`}>
            <Card className="bg-dark text-white" key={character.id}  >
            <Card.Img src={thumbnailUrl} alt="Card" />
            <Card.ImgOverlay>
               
                
            </Card.ImgOverlay>
            
            
            <a to={`/characters/${character.id}`}>{character.name}</a>
                <p>Appeared in over</p> 
                <div>
                   {character.comics.available} - Comics
                </div>
                <div>
                    {character.series.available} - Series
                </div>
                <div>
                    {character.events.available} - Events
                </div>
          
            </Card>
  
        </a>
    )
}

export default CharacterCard
