import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
export class ProposalPage extends Component {
  submit = () => {
    const proposalName = document.getElementById("proposal_name").value;
    const option1 = document.getElementById("option_1").value;
    const option2 = document.getElementById("option_2").value;
    const option3 = document.getElementById("option_3").value;
    const option4 = document.getElementById("option_4").value;
    const option5 = document.getElementById("option_5").value;

    const options = [option1, option2, option3, option4, option5].filter(option => option && option != '');
    this.props.submit(proposalName, options);
  }
  render(){
    const style = {
      padding: '30px'
    }
    const optionStyle = {
      paddingTop: '30px'
    }
    return(
      <div style={style}>
        <h3>投票之以太坊：Ethereum, ReactJS</h3>
        <hr />
        <form>
          <div className="form-group">
            <label>投票主題</label>
            <input className="form-control" id="proposal_name" />
          </div>
          <div className="form-group" style={optionStyle}>
            <label>投票選項 1</label>
            <input className="form-control" id="option_1" />
          </div>
          <div className="form-group">
            <label>投票選項 2</label>
            <input className="form-control" id="option_2" />
          </div>
          <div className="form-group">
            <label>投票選項 3</label>
            <input className="form-control" id="option_3" />
          </div>
          <div className="form-group">
            <label>投票選項 4</label>
            <input className="form-control" id="option_4" />
          </div>
          <div className="form-group">
            <label>投票選項 5</label>
            <input className="form-control" id="option_5" />
          </div>
          <div className="form-group">
            <Button onClick={this.submit.bind(this)} bsStyle="primary">送出</Button>
          </div>
        </form>
      </div>
    )
  }
}
export default ProposalPage;