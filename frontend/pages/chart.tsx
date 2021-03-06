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
import { Code, Line } from "../src/components/code";

function getBaseUrl() {
  const port = process.env.PORT || 3000;
  return isServer ? `http://localhost:${port}/` : "/";
}

const ReadmeCard = styled(Card as any)`
  margin-top: 1em;
`;

const ExternalRepoDisclaimer = styled.p`
  font-size: 0.8em;
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
    const isStable = this.props.username === "stable";

    return (
      <Wrapper>
        {chartYaml && (
          <Row xsTop={true} xsCenter={true}>
            <Col xs={12} sm={12} md={5}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="title" component="h1">
                    {chartYaml.name}
                  </Typography>
                  <p>{chartYaml.description}</p>

                  <p>
                    <strong>Latest Version:</strong> {chartYaml.version}
                  </p>
                  <p>
                    <strong>Home:</strong>{" "}
                    <a
                      href={chartYaml.home}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {chartYaml.home}
                    </a>
                  </p>
                  <p>
                    <strong>Sources:</strong>{" "}
                    {chartYaml.sources.map(source => (
                      <a
                        key={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={source}
                      >
                        {source}
                      </a>
                    ))}
                  </p>

                  {isStable && (
                    <ExternalRepoDisclaimer>
                      This is imported from the{" "}
                      <a href="https://github.com/helm/charts/tree/master/stable">
                        stable
                      </a>{" "}
                      repository and is not hosted by HelmHub
                    </ExternalRepoDisclaimer>
                  )}
                </CardContent>
              </Card>
              <ReadmeCard>
                <CardContent>
                  <Typography gutterBottom variant="subheading" component="h2">
                    Readme
                  </Typography>
                  <ReactMarkdown source={this.props.readme} />
                </CardContent>
              </ReadmeCard>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subheading" component="h2">
                    To install
                  </Typography>
                  <Code>
                    {!isStable && (
                      <Line>
                        helm repo add {this.props.username}{" "}
                        {"https://helmhub.com/charts/"}
                        {this.props.username}
                      </Line>
                    )}

                    <Line>
                      helm install {isStable ? "" : this.props.username + "?"}
                      {chartYaml.name}
                    </Line>
                  </Code>
                </CardContent>
              </Card>
            </Col>
          </Row>
        )}
      </Wrapper>
    );
  }
}
