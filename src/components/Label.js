import React from 'react';

export default class Label extends React.Component {
    render() {
        const required = this.props.isRequired && '*' || '';
        return (<label htmlFor={`root_${this.props.labelKey}`}>
                   {this.props.children + required}
               </label>);
    }
}