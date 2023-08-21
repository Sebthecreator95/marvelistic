import React, { useEffect,useState } from "react";
import MarvelApi from "../api/MarvelApi";
import useUpdateState from "../hooks/useUpdateState";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Events.css"
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
function Events(){
    const [events, updateEvents] = useUpdateState([]);
    const [totalEvents, updateTotalEvents] = useState([]);
    useEffect(() => {
        async function getEvents(){
            try{
                let total = await MarvelApi.allEvents(10)
                updateTotalEvents(total.total)
                for(let i = 0; i <= (total.total+100); i =i+100){
                    let apiEvents = await MarvelApi.allEvents(i);
                    updateEvents(apiEvents.results)
                    
                }
                
                    
            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
                    return err.message
        }
    }
    getEvents()
    }, [])
   
    let displayedEvents = events.map( (event)=>  ( <Col key={event.id} ><Card className="bg-dark text-white"  >
    <Card.Img src={`${event.thumbnail.path}.${event.thumbnail.extension}`} alt="Card" />
    
    <Card.Footer>
        <a href={`/events/${event.id}`}>{event.title}</a>
        <div>
        <a>
            {event.characters.available}
        </a>
        - Characters
        </div>
        <div>
        <a>
            {event.comics.available}
        </a>
        - Comics
        </div>
        <div>
        <a>
            {event.series.available} 
        </a>
        - Series
        </div>
        <div>
        <a>
            {event.creators.available}
        </a>
        - Creators
        </div>
    </Card.Footer>
    </Card></Col>))

    return(
        <>
            <Button variant="outline-primary">{totalEvents}</Button> - Events
            <Container className="justify-content-center events" >
            <Row  xs={1} sm={2} md={4} lg ={5} className="justify-content-center  " >
            {displayedEvents}
            </Row>
            </Container>
        </>

    )
}
export default Events