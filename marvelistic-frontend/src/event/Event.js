import React ,{ useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import MarvelApi from "../api/MarvelApi";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Event.css"
import Button from 'react-bootstrap/Button';
function Event() {
    
    const [result, updateResult] = useState([]);
    const [image, updateImage] = useState([]);

    const [characters, updateCharacters] = useState([]);
    const [totalCharacters, updateTotalCharacters] = useState([]);

    const [comics, updateComics] = useState([]);
    const [totalComics, updateTotalComics] = useState([]);

    const [series, updateSeries] = useState([]);
    const [totalSeries, updateTotalSeries] = useState([]);


    const [creators, updateCreators] = useState([]);
    const [totalCreators, updateTotalCreators] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        async function getEventById(){
            try{
                
                let apiResult = await MarvelApi.getEvent(id);
                updateResult(apiResult[0])
                updateImage(apiResult[0].thumbnail)

                let apiEventCharacters = await MarvelApi.eventCharacters(id)
                updateCharacters(apiEventCharacters.results)
                updateTotalCharacters(apiEventCharacters.total)

                let apiEventComics = await MarvelApi.eventComics(id)
                updateComics(apiEventComics.results)
                updateTotalComics(apiEventComics.total)


                let apiEventSeries = await MarvelApi.eventSeries(id);
                updateSeries(apiEventSeries.results)
                updateTotalSeries(apiEventSeries.total)



                let apiEventCreators = await MarvelApi.eventCreators(id);
                updateCreators(apiEventCreators.results)
                updateTotalCreators(apiEventCreators.total)
            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
        }
    }
    getEventById()
    },[id])



    let displayedCharacters = characters.map( (character)=>  ( <Col  className="character-cover" key ={character.id}> <a href={`/characters/${character.id}`}><img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="Character" width="100%" height="100%"/></a></Col> ) );
    let displayedComics = comics.map( (comic)=>  ( <Col  className="comic-cover" key ={comic.id}> <a href={`/comics/${comic.id}`}><img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Comic" width="100%" height="100%"/></a></Col> ) );
    let displayedSeries = series.map( (eachSeries)=>  ( <Col className="series-cover" key ={eachSeries.id}> <a href={`/series/${eachSeries.id}`}><img src={`${eachSeries.thumbnail.path}.${eachSeries.thumbnail.extension}`} alt="Series" width="100%" height="100%"/></a></Col> ) );
    let displayedCreators = creators.map( (creator)=>  ( <Col  className="creator-cover" key ={creator.id}><a href={`/creators/${creator.id}`}><img src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`} alt="Creator" width="100%" height="100%"/></a></Col> ) )
   
    return (
        <Card className="bg-dark text-white" key={result.id}  >
            <Card.Img src={`${image.path}.${image.extension}`} alt="Card"  />
            <Card.ImgOverlay>
                <Card.Title  ><a href={`/events/${result.id}`}>{result.title}</a></Card.Title>
                
            </Card.ImgOverlay>
            <Card.Body className="description">
                {result.description}
            </Card.Body>
            <Card.Footer>
                <Card.Link to={`/events/${result.id}`} >{result.title}</Card.Link>
                <p> </p>
                <div>
                    <Button variant="outline-primary">{totalComics}</Button> - Comics
                </div>
                <Container className="justify-content-center creators" >
                    <Row  xs={1} sm={4} md={8} lg ={12} className="justify-content-center  " >
                    {displayedComics}
                    </Row>

                </Container>
                <div>
                    <Button variant="outline-primary">{totalCharacters}</Button> - Characters
                </div>
                <Container className="justify-content-center characters" >
                    <Row  xs={1} sm={4} md={8} lg ={12} className="justify-content-center  " >
                    {displayedCharacters}
                    </Row>

                </Container>
                <div>
                    <Button variant="outline-primary">{totalSeries}</Button> - Series
                </div>
                <Container className="justify-content-center series" >
                    <Row  xs={1} sm={4} md={8} lg ={12} className="justify-content-center  " >
                    {displayedSeries}
                    </Row>

                </Container>

                
               
                <div>
                    <Button variant="outline-primary">{totalCreators}</Button> - Creators
                </div>
                <Container className="justify-content-center creators" >
                    <Row  xs={1} sm={3} md={8} lg ={12} className="justify-content-center  " >
                    {displayedCreators}
                    </Row>

                </Container>
            
            </Card.Footer>
            </Card>
    )
}

export default Event;