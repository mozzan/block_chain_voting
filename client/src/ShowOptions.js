import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
export class ShowOptions extends Component {
  handleChange = (option) => {
    this.props.vote(option)
  }
  componentDidUpdate = async () => {
    const { web3, contract } = this.props;

    let that = this;
    const options = this.props.options;

    options.map(function(option) {
      contract.methods.totalVotesFor(web3.utils.asciiToHex(option.name)).call().then(function(count) {
        debugger;
        let target = options.find(element => element.name == option.name);
        target.vote = count;
        that.setState({ options: options });
      })
    });
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
        <h3>{ this.props.title }</h3>
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