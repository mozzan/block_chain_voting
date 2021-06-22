import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
export class ShowOptions extends Component {
  handleChange = (option) => {
    this.props.vote(option)
  }
  render(){
    let optionList = this.props.options.map((option, i)=>
      <tr key={i}>
        <td onClick={this.handleChange.bind(this, option.name)}>{option.name}</td>
        <td>{option.vote}</td>
        <td><Button onClick={this.handleChange.bind(this, option.name)} bsStyle="primary">投票</Button></td>
      </tr>
    )
    const style = {
      padding: '30px'
    }
    return(
      <div style={style}>
        <h3>投票候選人之以太坊：Ethereum, ReactJS</h3>
        <hr />
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>選舉人</th>
            <th>投票數</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {optionList}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default ShowOptions;