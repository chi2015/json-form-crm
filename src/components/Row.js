import React from 'react';

import Input from './Input';
import Label from './Label';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rowVal: this.props.rowDefault || ''};
        this.handleChange = this.handleChange.bind(this);
        
      }

      componentDidMount() {
        this.handleChange(this.state.rowVal);
      }

      handleChange(val) {
        this.props.handleChange(this.props.rowKey, val);
        this.setState({rowVal: val});
      }

      render() {
        return  (
            <div className="form-row">
                <Label labelKey={this.props.rowKey} 
                       isRequired={this.props.rowRequired}>{this.props.title}</Label> 
                <Input inputType={this.props.rowType} 
                       inputValue={this.state.rowVal} 
                       inputRequired={this.props.rowRequired} 
                       inputChange={this.handleChange} inputKey={this.props.rowKey}/>
            </div>
          );
      }
}