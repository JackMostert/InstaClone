import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";
import { Grid } from "../Personal-Design-Language/Grid/Grid";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import PageGroup from "../Personal-Design-Language/PageGroup/Index";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import Axios from "axios";
import Cookies from "universal-cookie";
const cookies: any = new Cookies();

export interface IRegisterProps {
  history: any;
  cookie: any;
}

export interface IRegisterState {
  email?: string;
  username?: string;
  password?: string;
  error?: string;
}

export default class Register extends React.Component<
  IRegisterProps,
  IRegisterState
> {
  constructor(props: IRegisterProps) {
    super(props);

    this.state = { email: "", username: "", password: "", error: "" };
  }

  private onSubmit = () => {
    const { email, username, password } = this.state;
    const formData = new FormData();
    formData.append("fullname", "");
    formData.append("username", username || "");
    formData.append("email", email || "");
    formData.append("password", password || "");

    Axios.post(
      "http://localhost/InstaClone/backend/" + "register.php",
      formData
    )
      .then(re => {
        if (re.data.Sstatus) {
          let d = new Date();
          d.setTime(d.getTime() + 1 * 60 * 1000);
          this.props.cookie.set("token", re.data.message, { path: "/" });
        } else {
          this.setState({ error: re.data.message });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
                    onChange={value => this.setState({ username: value })}
                    style={{ width: "80%", margin: "0 auto" }}
                    borderRadius={3}
                    type="text"
                    size={5}
                    labelValue="Username"
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
                  <p style={{ textAlign: "center", color: "#C62121" }}>
                    {this.state.error}
                  </p>
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
