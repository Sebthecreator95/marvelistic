import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Alert from "../common/Alert";
import MarvelApi from "../api/MarvelApi";
import { useNavigate} from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import './SearchForm.css';
function SearchForm(){
 

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ search: "" });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault()
    let result = await MarvelApi.searchCharacters(formData.search);
    if (result.length >= 1) {
      navigate(`/search/${formData.search}`)
    } else {
      setFormErrors(result);
      navigate(`/notfound`)
    }
  
}

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }


    
    return (
      <Form   onSubmit={handleSubmit} className="justify-content-center" >
      <Row className="align-items-center " >
        <Col></Col>
        
        <Col>
            <input
                name="search"
                className="form-control"
                value={formData.search}
                onChange={handleChange}
                placeholder='search'
                required
            />
            {formErrors.length > 0 ? <Alert type="danger" messages={formErrors} /> : null}
          </Col>
          <Col >
          <button
              className="btn btn-primary "
              onSubmit={handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
          
          </Col>
          <Col></Col>
      </Row>
    </Form>

        )
}

export default SearchForm;