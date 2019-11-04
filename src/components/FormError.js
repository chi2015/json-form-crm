import React from 'react';

export default class FormError extends React.Component {
    render() {
        const minMaxArr = [];
        if (this.props.min > 0) minMaxArr.push(`${this.props.min} characters min`);
        if (this.props.max < Infinity) minMaxArr.push(`${this.props.max} characters max`);
        const minMaxStr = minMaxArr.join(' and ');
        
        return <div className="form-error">
                    {`Field ${this.props.property} should have ${minMaxStr}`}
                </div>
    }
}