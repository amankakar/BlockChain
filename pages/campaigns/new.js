import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  handleInput = event => {
    this.setState({
      minimumContribution: event.target.value,
      errorMessage: ""
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCompaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="Wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={this.handleInput}
            />
          </Form.Field>
          <Message error header="Oops..!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            {" "}
            Create{" "}
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
