import React, { Component } from "react";
import { Card, Grid, Button, Row } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campiagn";
import web3 from "../../ethereum/web3";
import Contribute from "../../components/contribute";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approvesCount: summary[3],
      manager: summary[4]
    };
  }
  renderSummary() {
    const {
      balance,
      minimumContribution,
      requestsCount,
      approvesCount,
      manager
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "address of manager",
        description:
          "the manager created this campaign and can create request to withdraw money from it",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "minimum Contribution (Wei)",
        description:
          "you must spend at least this much wei to become an approver",
        style: { overflowWrap: "break-word" }
      },
      {
        header: requestsCount,
        meta: "Number of request",
        description: "A request tries t0 withdraw money from the campaign",
        style: { overflowWrap: "break-word" }
      },
      {
        header: approvesCount,
        meta: "Numbe rof approvers",
        description: "Number of people who have already donated tp campaign",
        style: { overflowWrap: "break-word" }
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Capmaign balance (Ether)",
        description:
          "this balance is how much money this campaign has left to spend",
        style: { overflowWrap: "break-word" }
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderSummary()}</Grid.Column>
            <Grid.Column width={5}>
              <Contribute address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Request</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default CampaignShow;
