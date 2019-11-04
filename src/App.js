import React from 'react';
import './App.css';
import Json2Form from './components/Json2Form';

const defaultJsonSchema = {
    "title": "A registration form",
    "description": "A simple form example.",
    "type": "object",
    "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
    "type": "string",
    "title": "First name",
    "default": "Chuck"
  },
    "lastName": {
    "type": "string",
    "title": "Last name"
  },
  "age": {
    "type": "integer",
    "title": "Age",
    "default": 75
  },
  "bio": {
    "type": "string",
    "title": "Bio"
  },
  "password": {
    "type": "password",
    "title": "Password",
    "minLength": 3
  },
  "telephone": {
    "type": "string",
    "title": "Telephone",
    "minLength": 10,
    "maxLength": 20
  }
  }
  };


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {jsonSchema: defaultJsonSchema, 
                  textAreaVal: JSON.stringify(defaultJsonSchema, null, 2),
                  formSchema: {}};
    this.generateForm = this.generateForm.bind(this);
    this.handleJsonSchemaChange = this.handleJsonSchemaChange.bind(this);
  }

  generateForm() {
    this.setState( { formSchema: this.state.jsonSchema} );
  }

  handleJsonSchemaChange(event) {
    const newTextAreaVal = event.target.value;
    const newState = { textAreaVal: newTextAreaVal };
    const newSchema = this.tryParseJSON(newTextAreaVal);
    if (newSchema) newState.jsonSchema = newSchema;
    this.setState(newState);
  }

  tryParseJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { 
      return false;
    }

    return false;
  }
  
  render() {
    return (
      <div className="App">
        <div className="json-block">
          <h1>Enter a valid JSON code to generate form</h1>
          <textarea value={this.state.textAreaVal} 
                    onChange={this.handleJsonSchemaChange}></textarea>
          <button onClick={this.generateForm}>Generate Form</button>
        </div>
        <div className="form-block">
          <Json2Form jsonSchema={this.state.formSchema}/>
        </div>
      </div>
    );
  }
}

