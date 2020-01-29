import * as React from "react";
import image from "../Personal-Design-Language/styles/hugo-information-security.svg";
import { Page } from "../Personal-Design-Language/Page/Page";
import Header from "../Personal-Design-Language/Header/Index";

export interface IUnauthProps {
  history: any;
  cookie: any;
}

export default class Unauth extends React.Component<IUnauthProps> {
  public render() {
    return (
      <div className="Unauth">
        <Page
          width="100%"
          isRoot
          pageColor="rgb(245, 245, 245)"
          pageAlignment="center"
          navLinksNear={[{ displayName: "Feed", isHeader: true }]}
          navLinksFar={[
            { displayName: "Home", url: "/", iconName: "la la-home" },
            { displayName: "Feed", url: "/feed", iconName: "la la-rss" },
            {
              displayName: "Register",
              url: "/register",
              iconName: "la la-user-plus"
            },
            {
              displayName: "Login",
              url: "/login",
              iconName: "la la-sign-in-alt"
            },
            {
              displayName: "Profile",
              url: "/profile:1",
              iconName: "la la-sign-in-alt"
            }
          ]}
          onNavLinkClick={url => url && this.props.history.push(url)}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "1000px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
            className="page"
          >
            <Header hNumber={3}>You need to be logged in for this</Header>
            <img src={image} style={{ width: "100%" }}></img>
          </div>
        </Page>
      </div>
    );
  }
}
