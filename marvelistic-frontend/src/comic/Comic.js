import React ,{ useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import MarvelApi from "../api/MarvelApi";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Comic.css"
import Button from 'react-bootstrap/Button';
function Comic() {
    
    const [result, updateResult] = useState([]);
    const [image, updateImage] = useState([]);


    const [creators, updateCreators] = useState([]);
    const [totalCreators, updateTotalCreators] = useState([]);


    const [characters, updateCharacters] = useState([]);
    const [totalCharacters, updateTotalCharacters] = useState([]);


    const [events, updateEvents] = useState([]);
    const [totalEvents, updateTotalEvents] = useState([]);


    const [stories, updateStories] = useState([]);
    const [totalStories, updateTotalStories] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        async function getComicById(){
            try{
                
                let apiResult = await MarvelApi.getComic(id);
                updateResult(apiResult[0])
                updateImage(apiResult[0].thumbnail)


                let apiComicCreators = await MarvelApi.comicCreators(id)
                updateCreators(apiComicCreators.results)
                updateTotalCreators(apiComicCreators.total)


                let apiComicCharacters = await MarvelApi.comicCharacters(id);
                updateCharacters(apiComicCharacters.results)
                updateTotalCharacters(apiComicCharacters.total)


                let apiComicEvents = await MarvelApi.comicEvents(id);
                updateEvents(apiComicEvents.results)
                updateTotalEvents(apiComicEvents.total)


                let apiComicStories = await MarvelApi.comicStories(id);
                updateStories(apiComicStories.results)
                updateTotalStories(apiComicStories.total)

            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
        }
    }
    getComicById()
    },[id])



    let displayedCharacters = characters.map( (character)=>  ( <Col xs={3} sm ={2} md={1} className="character-cover" key ={character.id}> <a href={`../characters/${character.id}`}><img src={`${character.thumbnail.path}.${character.thumbnail.extension}`}alt="Character" width="100%" height="100%"/></a></Col> ) );
    let displayedCreators = creators.map( (creator)=>  ( <Col xs={3} sm ={2} md={1} className="creator-cover" key ={creator.id}> <a href={`../creators/${creator.id}`}><img src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}alt="Creators" width="100%" height="100%"/></a></Col> ) );
    let displayedEvents = events.map( (event)=>  ( <Col xs={3} sm ={2} md={1} className="events-cover" key ={event.id}><a href={`../events/${event.id}`}><img src={`${event.thumbnail.path}.${event.thumbnail.extension}`}alt="Events" width="100%" height="100%"/></a></Col> ) )
    let displayedStories = stories.map( (story)=>  ( <Col xs={3} sm ={2} md={1} className="stories-cover"  key ={story.id}> <a href={`../stories/${story.id}`}><img src={story.thumbnail === null ? '' : `${story.thumbnail.path}.${story.thumbnail.extension}`}alt="Stories" width="100%" height="100%"/></a></Col> ) )
    return (
        <Card className="bg-dark text-white" key={result.id}  >
            <Card.Img src={`${image.path}.${image.extension}`} alt="Card"  />
            <Card.ImgOverlay>
                <Card.Title  ><a href={`../comics/${result.id}`}>{result.title}</a></Card.Title>
            
                
            </Card.ImgOverlay>
            <Card.Body className="description">
                {result.description}
            </Card.Body>
            <Card.Footer>
                <a href={`../characters/${result.id}`} >{result.title}</a>
                <p> </p>
                <div>
                    <Button variant="outline-primary">{totalCreators}</Button> - Creators
                </div>
                <Container className="justify-content-center creators" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
                    {displayedCreators}
                    </Row>

                </Container>
                <div>
                    <Button variant="outline-primary">{totalCharacters}</Button> - Characters
                </div>
                <Container className="justify-content-center characters" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
                    {displayedCharacters}
                    </Row>

                </Container>

                
                <div>
                    <Button variant="outline-primary">{totalStories}</Button> - Stories
                </div>
                <Container className="justify-content-center stories" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
                    {displayedStories}
                    </Row>

                </Container>
                <div>
                    <Button variant="outline-primary">{totalEvents}</Button> - Events
                </div>
                <Container className="justify-content-center events" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
                    {displayedEvents}
                    </Row>

                </Container>
            
            </Card.Footer>
            </Card>
    )
}

export default Comic;