import React from "react";
import fetch from "isomorphic-fetch";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import isServer from "../src/util/is-server";
import Wrapper from "../src/components/universal/wrapper";
import { Row, Col, media } from "../src/components/grid";

function getBaseUrl() {
  const port = process.env.PORT || 3000;
  return isServer ? `http://localhost:${port}/` : "/";
}

const ReadmeCard = styled(Card as any)`
  margin-top: 1em;
`;

export default class Chart extends React.Component<{
  chartYaml: any;
  username: string;
  readme: string;
}> {
  static async getInitialProps({ query }) {
    const { username, chart } = query;

    const response = await fetch(
      `${getBaseUrl()}api/v0/charts/${username}/${chart}`
    ).then(res => res.json());

    return { ...response };
  }

  render() {
    const chartYaml = this.props.chartYaml;

    return (
      <Wrapper>
        {chartYaml && (
          <Row xsTop={true} xsCenter={true}>
            <Col xs={12} sm={12} md={5}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h1">
                    {chartYaml.name}
                  </Typography>
                  <p>{chartYaml.description}</p>
                </CardContent>
              </Card>
              <ReadmeCard>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h1">
                    Readme
                  </Typography>
                  <ReactMarkdown source={this.props.readme} />
                </CardContent>
              </ReadmeCard>
            </Col>
            <Col xs={12} sm={12} md={3}>
              <Card>
                <CardContent>
                  <p>To install:</p>
                  <p>
                    helm repo add {this.props.username} helmhub.com/
                    {this.props.username}
                    <br />
                    helm install {this.props.username}/{chartYaml.name}
                  </p>

                  <p>Version: {chartYaml.version}</p>
                  <p>Home: {chartYaml.home}</p>
                  <p>Source: {chartYaml.sources[0]}</p>
                </CardContent>
              </Card>
            </Col>
          </Row>
        )}
      </Wrapper>
    );
  }
}
