import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";
import { Grid } from "../Personal-Design-Language/Grid/Grid";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import PageGroup from "../Personal-Design-Language/PageGroup/Index";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import Link from "../Personal-Design-Language/Link/Index";

export interface ILoginProps {
  history: any;
}

export default class Login extends React.Component<ILoginProps> {
  public render() {
    return (
      <div className="Home">
        <Page
          width="100%"
          isRoot
          pageAlignment="center"
          navLinksNear={[{ displayName: "Login", isHeader: true }]}
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
            <Card
              shadowSpread={5}
              size="large"
              style={{ padding: "30px 10px", borderRadius: "5px" }}
            >
              <Header hNumber={4} alignment="center">
                Login
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
                    type="password"
                    size={5}
                    labelValue="Password"
                    required={true}
                  />
                  <div
                    style={{
                      margin: "0 auto",
                      width: "80%",
                      textAlign: "center"
                    }}
                  >
                    <p>
                      Forgot password?{" "}
                      <Link
                        text="Click Here"
                        onClick={() =>
                          this.props.history.push("/forgotpassword")
                        }
                      />
                    </p>
                    <CallToAction size={5}>Login</CallToAction>
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
