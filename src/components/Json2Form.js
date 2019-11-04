import React from 'react';
import './Json2Form.css';

import Row from './Row';
import FormError from './FormError';

export default class Json2Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formData: {}, errors: []};
    this.handleRowChange = this.handleRowChange.bind(this);
  }

  /*componentWillReceiveProps(props) {
    this.onChangeParentState(props);
    this.handleRowChange = this.handleRowChange.bind(this);
  }

  onChangeParentState(props) {
    const formData = {};
    if (typeof props.jsonSchema.properties === "object") 
        Object.keys(props.jsonSchema.properties).forEach((property) => {
            console.log('property', property)
            formData[property] = props.jsonSchema.properties[property].default || '';
    });
    console.log('form data', formData);
    this.setState = { formData: formData };
  }*/

  isRequired(property) {
    return Array.isArray(this.props.jsonSchema.required) && 
        this.props.jsonSchema.required.indexOf(property) !== -1;
  }

  handleRowChange(property, value) {
    const newFormData = this.state.formData;
    newFormData[property] = value;
    this.setState({formData: newFormData});
    this.validateForm();
    console.log('state', this.state);
  }

  validateForm() {
    const formErrors = [];
    Object.keys(this.state.formData).forEach((property) => {
        if (!this.state.formData[property].length) return;
        const min = this.props.jsonSchema.properties[property].minLength || 0;
        const max = this.props.jsonSchema.properties[property].maxLength || Infinity;
        if (this.state.formData[property].length < min || 
            this.state.formData[property].length > max)
            formErrors.push({ property, min, max });
    });
    this.setState({ errors: formErrors});
  }

  submitData() {
      alert(`Form data: ${JSON.stringify(this.state.formData)}`);
      return false;
  }

  render() {
    if (typeof this.props.jsonSchema !== "object") return (<div>Incorrect JSON</div>);
    
    let propertiesHtml = '';

    if (typeof this.props.jsonSchema.properties === "object") {
        propertiesHtml = Object.keys(this.props.jsonSchema.properties).map((property) => 
            <Row title={this.props.jsonSchema.properties[property].title || ''} 
                 key={property}
                 rowKey={property}
                 rowType={this.props.jsonSchema.properties[property].type || 'string'} 
                 rowRequired={this.isRequired(property)}
                 rowDefault={this.props.jsonSchema.properties[property].default || ''}
                 handleChange={this.handleRowChange}/>
        );
    }

    let errorsHtml = this.state.errors.map((error) => <FormError key={error.property} {...error}/>);
    
    return (
      <div className="form-content">
          <form onSubmit={this.submitData.bind(this)}>
          <h1>{this.props.jsonSchema.title || "No title"}</h1>
          {this.props.jsonSchema.description && <div className="desc">{this.props.jsonSchema.description}</div>}
         { propertiesHtml }
         { errorsHtml }
         <button type="submit">Submit</button>
         </form>
      </div>
    );
  }
}