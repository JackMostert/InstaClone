import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";
import { Text } from "../Personal-Design-Language/Text/Text";
import Link from "../Personal-Design-Language/Link/Index";

export interface IForgotPasswordProps {
  history: any;
  cookie: any;
}

export default class ForgotPassword extends React.Component<
  IForgotPasswordProps
> {
  public render() {
    return (
      <div className="Home">
        <Page
          width="100%"
          isRoot
          pageAlignment="center"
          navLinksNear={[{ displayName: "ForgotPassword", isHeader: true }]}
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
              url: "/profile",
              iconName: "la la-sign-in-alt"
            }
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
            <Card
              shadowSpread={5}
              size="xlarge"
              style={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexFlow: "column"
              }}
            >
              <Text weight="regular" fontSize="1.3rem">
                Check your email for a link to reset your password
              </Text>
              <Link inlineLine onClick={() => this.props.history.push("login")}>
                Click to return
              </Link>
            </Card>
          </div>
        </Page>
      </div>
    );
  }
}
