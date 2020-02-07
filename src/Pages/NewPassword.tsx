import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import Header from "../Personal-Design-Language/Header/Index";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import Axios from "axios";

export interface INewPasswordProps {
  history: any;
  cookie: any;
}

export interface INewPasswordState {
  email: string;
}

export default class NewPassword extends React.Component<
  INewPasswordProps,
  INewPasswordState
> {
  constructor(props: INewPasswordProps) {
    super(props);
    this.state = {
      email: ""
    };
  }

  private newPassword = () => {
    const formData = new FormData();
    let info = this.props.cookie.get("token");

    formData.append("token", info.token);
    formData.append("selector", info.selector);
    formData.append("pwd", this.state.email);
    formData.append("method", "Second");

    Axios.post(
      "http://localhost/InstaClone/backend/ResetPassword.php",
      formData
    ).then(res => {
      this.props.history.push("/login");
    });
  };

  public render() {
    return (
      <div className="NewPassword">
        <Page
          width="100%"
          isRoot
          pageAlignment="center"
          navLinksNear={[{ displayName: "New Password", isHeader: true }]}
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
                padding: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexFlow: "column"
              }}
            >
              <Header hNumber={4}>New Password</Header>
              <TextInput
                type="password"
                size={3}
                labelValue="Enter new password"
                value={this.state.email}
                onChange={value => this.setState({ email: value })}
              ></TextInput>
              <CallToAction size={3} onClick={this.newPassword}>
                Recover my email
              </CallToAction>
            </Card>
          </div>
        </Page>
      </div>
    );
  }
}
