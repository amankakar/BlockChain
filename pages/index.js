import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampiagnIndex extends Component {
  static async getInitialProps() {
    const campiagns = await factory.methods.getDeployedCompaigns().call();
    if (typeof window === "undefined") {
      return { campiagns };
    } else {
      return { campiagns };
    }
  }

  renderCampiagns() {
    const items = this.props.campiagns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });
    console.log(this.props.campiagns.length);

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campiagn</h3>
          <Link route="campaigns/new">
            <a>
              <Button
                floated="right"
                primary
                content="Create Campaign"
                icon="add circle"
                labelPosition="left"
              />
            </a>
          </Link>
          {this.renderCampiagns()}
        </div>
      </Layout>
    );
  }
}

export default CampiagnIndex;
