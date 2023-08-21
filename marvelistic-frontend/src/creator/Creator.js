import React ,{ useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import MarvelApi from "../api/MarvelApi";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Creator.css"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
function Creator() {
    
    
    const [result, updateResult] = useState([]);
    const [image, updateImage] = useState([]);

    const [comics, updateComics] = useState([]);
    const [totalComics, updateTotalComics] = useState([]);

    const [series, updateSeries] = useState([]);
    const [totalSeries, updateTotalSeries] = useState([]);

    const [events, updateEvents] = useState([]);
    const [totalEvents, updateTotalEvents] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        async function getCreatorById(){
            try{
                
                let apiResult = await MarvelApi.getCreator(id);
                updateResult(apiResult[0])
                updateImage(apiResult[0].thumbnail)


                let apiCreatorComics = await MarvelApi.creatorComics(id)
                updateComics(apiCreatorComics.results)
                updateTotalComics(apiCreatorComics.total)


                let apiCreatorSeries = await MarvelApi.creatorSeries(id);
                updateSeries(apiCreatorSeries.results)
                updateTotalSeries(apiCreatorSeries.total)


    


                let apiCreatorEvents = await MarvelApi.creatorEvents(id);
                updateEvents(apiCreatorEvents.results)
                updateTotalEvents(apiCreatorEvents.total)
            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
        }
    }
    getCreatorById()
    },[id])



    let displayedComics = comics.map( (comic)=>  ( <Col xs={3} sm ={2} md={1} className="comic-cover" key ={comic.id}> <a href={`/comics/${comic.id}`}><img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}alt="Comic" width="100%" height="100%"/></a></Col> ) );
    let displayedSeries = series.map( (eachSeries)=>  ( <Col xs={3} sm ={2} md={1} className="creator-cover" key ={eachSeries.id}> <a href={`/series/${eachSeries.id}`}><img src={`${eachSeries.thumbnail.path}.${eachSeries.thumbnail.extension}`}alt="Series" width="100%" height="100%"/></a></Col> ) );
    let displayedEvents = events.map( (event)=>  ( <Col xs={3} sm ={2} md={1} className="events-cover" key ={event.id}><a href={`../events/${event.id}`}><img src={`${event.thumbnail.path}.${event.thumbnail.extension}`}alt="Events" width="100%" height="100%"/></a></Col> ) )
   
    return (
        <Card className="bg-dark text-white" key={result.id}  >
            <Card.Img src={`${image.path}.${image.extension}`} alt="Card"  />
            <Card.ImgOverlay>
               
            
                
            </Card.ImgOverlay>
           
            <Card.Footer>
                <Link to= {`/creators/${result.id}`}>{result.fullName}</Link>
                <p> </p>
                <div>
                    <Button variant="outline-primary">{totalComics}</Button> - Comics
                </div>
                <Container className="justify-content-center creators" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
                    {displayedComics}
                    </Row>

                </Container>
                <div>
                    <Button variant="outline-primary">{totalSeries}</Button> - Series
                </div>
                <Container className="justify-content-center characters" >
                    <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
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

export default Creator;