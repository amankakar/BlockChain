import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Capmaign from "../ethereum/campiagn";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class contribute extends Component {
  state = {
    value: "",
    errMessage: "",
    loading: false
  };
  handleInput = event => {
    this.setState({
      value: event.target.value,
      errMessage: ""
    });
  };
  onSubmit = async event => {
    event.preventDefault();
    const campaign = Capmaign(this.props.address);
    this.setState({ loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false, value: "" });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            width={3}
            label="ether"
            labelPosition="right"
            onChange={this.handleInput}
          />
        </Form.Field>
        <Message error header="Oops..!" content={this.state.errMessage} />
        <Button primary loading={this.state.loading}>
          {" "}
          Contribute..!
        </Button>
      </Form>
    );
  }
}
export default contribute;
