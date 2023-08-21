import React, { useEffect,useState } from "react";
import MarvelApi from "../api/MarvelApi";
import useUpdateState from "../hooks/useUpdateState";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Creators.css"
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
function Creators(){
    const [creators, updateCreators] = useUpdateState([]);
    const [totalCreators, updateTotalCreators] = useState([]);
    useEffect(() => {
        async function getCreators(){
            try{
                let total = await MarvelApi.allCreators(10);
                updateTotalCreators(total.total)
                for(let i = 0; i <= total.total+100; i =i+100){
                    let apiCreators = await MarvelApi.allCreators(i);
                    updateCreators(apiCreators.results)
                    
                }
                
                    
            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
                    return err.message
        }
    }
    getCreators()
    }, [])
   
    let displayedCreators = creators.map( (creator)=>  ( <Col key={creator.id} ><Card className="bg-dark text-white"  >
    <Card.Img src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`} alt="Card" />
    <Card.ImgOverlay>
    <Card.Title  ><a href={`/creators/${creator.id}`}>{creator.fullName}</a></Card.Title>
    </Card.ImgOverlay>
    
    <Card.Body>
        <Link href={`/creators/${creator.id}`} className="card-link">{creator.fullName}</Link>
        <div>
        <a>
            {creator.comics.available}
        </a>
        - Comics
        </div>
        <div>
        <a>
            {creator.series.available} 
        </a>
        - Series
        </div>
        
        <div>
        <a>
            {creator.events.available}
        </a>
        - Events
        </div>
    </Card.Body>
    </Card></Col>))

    return(
        <>
            <a variant="outline-primary">{totalCreators}</a> - Creators
            <Container className="justify-content-center creators" >
            <Row  xs={1} sm={2} md={4} lg ={5} className="justify-content-center  " >
            {displayedCreators}
            </Row>
            </Container>
        </>

    )
}
export default Creators