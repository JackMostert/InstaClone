import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Card } from "../Personal-Design-Language/Card/Card";
import { Text } from "../Personal-Design-Language/Text/Text";
import Link from "../Personal-Design-Language/Link/Index";
import Header from "../Personal-Design-Language/Header/Index";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import Axios from "axios";

export interface IForgotPasswordProps {
  history: any;
  cookie: any;
}
export interface IForgotPasswordState {
  email: string;
}

export default class ForgotPassword extends React.Component<
  IForgotPasswordProps,
  IForgotPasswordState
> {
  constructor(props: IForgotPasswordProps) {
    super(props);
    this.state = {
      email: ""
    };
  }

  private sendEmail = () => {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("method", "First");

    Axios.post(
      "http://localhost/InstaClone/backend/ResetPassword.php",
      formData
    ).then(res => {
      if (res.data) {
        let d = new Date();
        d.setTime(d.getTime() + 1 * 60 * 1000);
        this.props.cookie.set("token", res.data, { path: "/" });
        this.props.history.push("/NewPassword");
      }
    });
  };

  public render() {
    return (
      <div className="forgotPassword">
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
                padding: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexFlow: "column"
              }}
            >
              <Link inlineLine onClick={() => this.props.history.push("login")}>
                Click to return
              </Link>
              <Header hNumber={4}>Forgot your password?</Header>
              <Text weight="regular" fontSize="1.3rem">
                Enter your Email address and check your inbox
              </Text>
              <TextInput
                type="email"
                size={3}
                value={this.state.email}
                onChange={value => this.setState({ email: value })}
              ></TextInput>
              <CallToAction size={3} onClick={this.sendEmail}>
                Recover my email
              </CallToAction>
            </Card>
          </div>
        </Page>
      </div>
    );
  }
}
