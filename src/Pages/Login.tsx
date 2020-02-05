import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";
import { Grid } from "../Personal-Design-Language/Grid/Grid";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import Link from "../Personal-Design-Language/Link/Index";
import Axios from "axios";

export interface ILoginProps {
  history: any;
  cookie: any;
}

export interface ILoginState {
  email?: string;
  password?: string;
  error?: string;
}

export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = { email: "", password: "", error: "" };
  }

  private onSubmit = () => {
    const { email, password } = this.state;
    const formData = new FormData();

    formData.append("method", "POST");
    formData.append("table", "Users");
    formData.append("schema", "RequestConditional");
    formData.append("returnType", "Data");
    formData.append("route", "/Login");
    formData.append(
      "data",
      JSON.stringify({
        field: email,
        toSearch: password
      })
    );

    Axios.post(
      "http://localhost/InstaClone/backend/Core/" + "Core.php",
      formData
    ).then(res => {
      if (res.data) {
        let d = new Date();
        d.setTime(d.getTime() + 1 * 60 * 1000);
        this.props.cookie.set("token", res.data, { path: "/" });
        this.props.history.push("/profile");
      }
    });
  };

  public render() {
    return (
      <div className="Home">
        <Page
          width="100%"
          isRoot
          pageAlignment="center"
          navLinksNear={[{ displayName: "Login", isHeader: true }]}
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
              size="large"
              style={{ padding: "30px 10px", borderRadius: "5px" }}
            >
              <Header hNumber={4} alignment="center">
                Login
              </Header>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  this.onSubmit();
                }}
              >
                <Grid row={0} col={0} rowGap="20px">
                  <TextInput
                    onChange={value => this.setState({ email: value })}
                    autoFocus={true}
                    style={{ width: "80%", margin: "0 auto" }}
                    borderRadius={3}
                    type="email"
                    size={5}
                    labelValue="Email"
                    required={true}
                  />
                  <TextInput
                    onChange={value => this.setState({ password: value })}
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
                      width: "80%"
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      Forgot password?{" "}
                      <Link
                        inlineLine
                        text="Click Here"
                        onClick={() =>
                          this.props.history.push("/forgotpassword")
                        }
                      />
                    </p>
                    <p style={{ textAlign: "center", color: "#C62121" }}>
                      {this.state.error}
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
