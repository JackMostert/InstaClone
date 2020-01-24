import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";
import { Grid } from "../Personal-Design-Language/Grid/Grid";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import PageGroup from "../Personal-Design-Language/PageGroup/Index";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";

export interface IRegisterProps {
  history: any;
}

export default class Register extends React.Component<IRegisterProps> {
  public render() {
    return (
      <div className="Home">
        <Page
          width="100%"
          isRoot
          pageAlignment="center"
          navLinksNear={[{ displayName: "Register", isHeader: true }]}
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
              size="large"
              style={{ padding: "30px 10px", borderRadius: "5px" }}
            >
              <Header hNumber={4} alignment="center">
                Register
              </Header>
              <form>
                <Grid row={0} col={0} rowGap="20px">
                  <TextInput
                    autoFocus={true}
                    style={{ width: "80%", margin: "0 auto" }}
                    borderRadius={3}
                    type="email"
                    size={5}
                    labelValue="Email"
                    required={true}
                  />
                  <TextInput
                    style={{ width: "80%", margin: "0 auto" }}
                    borderRadius={3}
                    type="text"
                    size={5}
                    labelValue="Username"
                    required={true}
                  />
                  <TextInput
                    style={{ width: "80%", margin: "0 auto" }}
                    borderRadius={3}
                    type="password"
                    size={5}
                    labelValue="Password"
                    required={true}
                  />
                  <div style={{ margin: "0 auto", width: "80%" }}>
                    <CallToAction size={5}>Register</CallToAction>
                  </div>
                </Grid>
              </form>
            </Card>
          </div>
        </Page>
      </div>
    );
  }
}
