import React, { useState, useEffect } from 'react';
import InputField from './InputField.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {createFilter} from 'react-select';
import AsyncSelect from 'react-select/async';

export default function BirthDetailsForm(){
  const [formErrors, setFormErrors] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const errors={};
    if(dateOfBirth==='' || dateOfBirth===undefined){
      errors.dateOfBirth = "Please enter your date of birth";
    }
    if(timeOfBirth==='' || timeOfBirth===undefined){
      errors.timeOfBirth = "Please enter when you were born";
    }
    if(placeOfBirth==='' || placeOfBirth===undefined || placeOfBirth===null){
      errors.placeOfBirth = "Please enter where you were born";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0){
      return
    }
    // todo: generate birth chart
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
              <InputField 
                name="formDateOfBirth" 
                label="When were you born?" 
                error={formErrors.dateOfBirth}
                field={
                  <Form.Control 
                    className={formErrors.dateOfBirth && "invalid-field"}
                    type="date" 
                    placeholder="Date of Birth"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    />
                  }
              />
            </Col>
            <Col>
              <InputField
                name="formTimeOfBirth"
                label="What time were you born?"
                error={formErrors.timeOfBirth}
                field={
                  <Form.Control 
                    className={formErrors.timeOfBirth && "invalid-field"}
                    type="time" 
                    placeholder="Time of Birth"
                    value={timeOfBirth}
                    onChange={e => setTimeOfBirth(e.target.value)} 
                />
                }
              />
            </Col>
            <Col>
              <InputField
                name="formPlaceOfBirth"
                label="What city were you born in?"
                error={formErrors.placeOfBirth}
                field={
                  <AsyncSelect
                    placeholder='Start typing...'
                    isClearable
                    isSearchable
                    name="place"
                    loadOptions={PromiseOptions}
                    getOptionValue={(option) => `["lat": "${option['lat']}", "lng": "${option['lng']}]`}
                    getOptionLabel={(option) => `${option['city_and_country']}`}
                    filterOption={createFilter({ ignoreAccents: false })}
                    value={placeOfBirth}
                    onChange={value => setPlaceOfBirth(value)}
                    styles={{control: (baseStyles, state) => ({...baseStyles, border: !formErrors.placeOfBirth && "0px", borderColor: formErrors.placeOfBirth && "#fc2f92"})}}
                  />
                }
                />
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
