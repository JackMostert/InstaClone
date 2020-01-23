import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";

export interface IHomeProps {
  history: any;
}

export default class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div className="Home">
        <Page
          width="100%"
          isRoot
          pageAlignment="center"
          navLinksNear={[{ displayName: "Home", isHeader: true }]}
          navLinksFar={[
            { displayName: "Home", url: "/" },
            { displayName: "Feed" },
            { displayName: "Register", url: "/register" },
            { displayName: "Login", url: "/login" }
          ]}
          onNavLinkClick={url => url && this.props.history.push(url)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <Card shadowSpread={5} size="medium">
              <Header hNumber={4} alignment="center">
                Home
              </Header>
            </Card>
          </div>
        </Page>
      </div>
    );
  }
}
