import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {createFilter} from 'react-select';
import AsyncSelect from 'react-select/async';

export default function BirthDetailsForm(){


  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    console.log(event.target[2]);
  };

  const cities_and_countries = require('../data/cities_and_countries.json')

  const filterCities = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : cities_and_countries.filter(place => {
        const keep = count < 5 && (place['city_and_country'].toLowerCase().indexOf(inputValue) >=0);
        if(keep){count+=1;}
        return keep;
      });

  };

  const PromiseOptions = (inputValue) => Promise.resolve(filterCities(inputValue));

    return(
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formDateOfBirth">
                <Form.Label>When were you born?</Form.Label>
                <Form.Control type="date" placeholder="Date of Birth" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTimeOfBirth">
                <Form.Label>What time where you born?</Form.Label>
                <Form.Control type="time" placeholder="Time of Birth" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPlaceOfBirth">
                <Form.Label>Where were you born?</Form.Label>
              <AsyncSelect
                placeholder='Start typing...'
                isClearable
                isSearchable
                name="place"
                loadOptions={PromiseOptions}
                getOptionValue={(option) => `["lat": "${option['lat']}", "lng": "${option['lng']}]`}
                getOptionLabel={(option) => `${option['city_and_country']}`}
                filterOption={createFilter({ ignoreAccents: false })}
              />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" type="submit">Get your birthchart</Button>
            </Col>
          </Row>
      </Form>
    )
}
