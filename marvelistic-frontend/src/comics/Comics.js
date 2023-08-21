import React, { useEffect,useState } from "react";
import MarvelApi from "../api/MarvelApi";
import useUpdateState from "../hooks/useUpdateState";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Comics.css"
function Comics(){
    const [comics, updateComics] = useUpdateState([]);
    const [totalComics, updateTotalComics] = useState(0);
    useEffect(() => {
        async function getComics(){
            try{
                let total = await MarvelApi.allComics(10);
                updateTotalComics(total.total)
                for(let i = 0; i <=(total.total+100); i =i+100){
                    let apiComics = await MarvelApi.allComics(i);
                    updateComics(apiComics.results)
                    
                }
                
                    
            } catch (err){
                    console.error("App loadUserInfo: problem loading", err);
                    return err.message
        }
    }
    getComics()
    }, [])
   
    let displayedComics = comics.map( (comic)=>  (<Col xs={3} sm ={2} md={1} className="comic-cover" key ={comic.id}> <a href={`/comics/${comic.id}`}><img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}alt="Comic" width="100%" height="100%"/></a></Col> ))

    return(
        <>
            <Button variant="outline-primary">{totalComics}</Button> - Comics
            <Container className="justify-content-center comics" >
            <Row  xs={12} sm={8} md={6} lg ={12} className="justify-content-center  " >
            {displayedComics}
            </Row>
            </Container>
        </>

    )
}
export default Comics