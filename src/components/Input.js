import React from 'react';

export default class Input extends React.Component {
    handleChange(event) {
        this.props.inputChange(event.target.value);
    }
    
    render() {
         let inputType = 'text';
         switch (this.props.inputType) {
             case 'string': inputType = "text"; break;
             case 'integer': inputType = "number"; break;
             case 'password': inputType = "password"; break;
             default: inputType = 'text';
         } 
         return (<input type={inputType} value={this.props.inputValue} required={this.props.inputRequired} onChange={this.handleChange.bind(this)} id={`root_${this.props.inputKey}`}/>);
    }
}