import React ,{ useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import MarvelApi from "../api/MarvelApi";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Character.css"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
function Character() {
    
    const [result, updateResult] = useState([]);
    const [image, updateImage] = useState([]);
    const [comics, updateComics] = useState([]);
    const [series, updateSeries] = useState([]);
    const [events, updateEvents] = useState([]);
    
    const [totalComics, updateTotalComics] = useState('');
    const [totalSeries, updateTotalSeries] = useState('');
    const [totalEvents, updateTotalEvents] = useState('');
    const { id } = useParams();
    useEffect(() => {
        async function getCharacter(){
            try{
                
                let apiResult = await MarvelApi.getCharacterById(id);
                updateResult(apiResult[0])
                updateImage(apiResult[0].thumbnail)
                
                let apiComics = await MarvelApi.characterComics(id)
                updateTotalComics(apiComics.total)
                updateComics(apiComics.results)
                
                let apiSeries = await MarvelApi.characterSeries(id);
                updateSeries(apiSeries.results)
                updateTotalSeries(apiSeries.total)
                
                let apiEvents = await MarvelApi.characterEvents(id);
                updateEvents(apiEvents.results)
                updateTotalEvents(apiEvents.total)

            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
        }
    }
    getCharacter()
    },[id])



    let displayedComics = comics.map( (comic)=>  ( <><img  className="comic-cover" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}alt="Comic" width="100%" height="100%"/><a href={`/comics/${comic.id}`} key ={comic.id}><h6>{comic.title}</h6></a> </>) );
    let displayedSeries = series.map( (eachSeries)=>  ( <><img src={`${eachSeries.thumbnail.path}.${eachSeries.thumbnail.extension}`}alt="Series" width="100%" height="100%"/><a  className="series-cover" href={`/series/${eachSeries.id}`} key ={eachSeries.id}>{eachSeries.title}</a></> ) );
    let displayedEvents = events.map( (event)=>  ( <><img src={`${event.thumbnail.path}.${event.thumbnail.extension}`}alt="Events" width="100%" height="100%"/><a className="events-cover" href={`/events/${event.id}`} key ={event.id}>{event.title}</a></> ) )
    
    return (
        <Card className="bg-dark text-white" key={result.id}  >
            <Card.Img src={`${image.path}.${image.extension}`} alt="Card"  />
            <Card.ImgOverlay>
                <Card.Title  ><a href={`/characters/${result.id}`}>{result.name}</a></Card.Title>
            
                
            </Card.ImgOverlay>
            <Card.Body className="description">
                {result.description}
            </Card.Body>
            <Card.Footer>
                <Link to={`/characters/${result.id}`} >{result.name}</Link>
                <p>  Appeared in over</p>
                <div>
                    <Button variant="outline-primary">{totalComics}</Button> - Comics
                </div>
                <Container className="justify-content-center comics" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
                    {displayedComics}
                    </Row>

                </Container>

                <div>
                    <Button variant="outline-primary">{totalSeries}</Button> - Series
                </div>
                <Container className="justify-content-center " >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  series" >
                    {displayedSeries}
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

export default Character;