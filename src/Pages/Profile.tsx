import * as React from "react";
import Page from "../Personal-Design-Language/Page/Index";
import PageGroup from "../Personal-Design-Language/PageGroup/Index";
import Card from "../Personal-Design-Language/Card/Index";
import Link from "../Personal-Design-Language/Link/Index";
import CardImage from "../Personal-Design-Language/CardImage/Index";
import CardTitle from "../Personal-Design-Language/CardTitle/Index";
import Persona from "../Personal-Design-Language/Persona";
import CardContent from "../Personal-Design-Language/CardContent/Index";
import Icon from "../Personal-Design-Language/Icon";
import Header from "../Personal-Design-Language/Header/Index";
import TextInput from "../Personal-Design-Language/TextInput/Index";
import { Text } from "../Personal-Design-Language/Text/Text";
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import { Grid } from "../Personal-Design-Language/Grid/Grid";

export interface IProfileProps {
  history: any;
}

export interface IProfileState {
  isEditing: boolean;
  usernameField: string;
  emailField: string;
}

export default class Profile extends React.Component<
  IProfileProps,
  IProfileState
> {
  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      isEditing: false,
      usernameField: "jmgxymp",
      emailField: "j_mostert@outlook.com"
    };
  }

  public render() {
    return (
      <div className="Profile">
        <Page
          width="100%"
          isRoot
          pageColor="rgb(245, 245, 245)"
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
              height: "100%",
              padding: "40px 20px",
              boxSizing: "border-box",
              width: "90%",
              maxWidth: "1400px",
              margin: "0 auto"
            }}
          >
            <PageGroup>
              <Card
                size="fill"
                shadowSpread={2}
                className="information-card"
                style={{ maxHeight: this.state.isEditing ? "560px" : "500px" }}
              >
                <div className="edit">
                  {!this.state.isEditing && (
                    <Link
                      inlineLine
                      onClick={() => {
                        this.setState({ isEditing: true });
                      }}
                    >
                      Edit
                    </Link>
                  )}
                </div>
                <CardTitle size="">
                  {" "}
                  <Persona
                    size={240}
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                  />
                </CardTitle>
                <CardContent>
                  <Header hNumber={5}>Profile</Header>
                  <br></br>
                  <div className="profile-text">
                    <div className="profile-info">
                      <Text weight="regular">Username:</Text>
                    </div>
                    {this.state.isEditing ? (
                      <TextInput
                        type="text"
                        size={2}
                        labelValue="Lebel"
                        value={this.state.usernameField}
                      />
                    ) : (
                      <Text weight="regular">{this.state.usernameField}</Text>
                    )}
                  </div>
                  <div className="profile-text">
                    <div className="profile-info">
                      <Text weight="regular">Email:</Text>
                    </div>
                    {this.state.isEditing ? (
                      <TextInput
                        type="text"
                        size={2}
                        labelValue="Lebel"
                        value={this.state.emailField}
                      />
                    ) : (
                      <Text weight="regular">{this.state.emailField}</Text>
                    )}
                  </div>
                  {this.state.isEditing && (
                    <>
                      <br></br>
                      <br></br>
                      <CallToAction
                        size={3}
                        onClick={() => {
                          this.setState({ isEditing: false });
                        }}
                      >
                        Save
                      </CallToAction>
                    </>
                  )}
                </CardContent>
              </Card>
              <Grid row={0} col={2} colGap="10px" rowGap="10px">
                <div>
                  <div className="newUpload">
                    <CallToAction
                      size={3}
                      onClick={() => {
                        this.setState({ isEditing: false });
                      }}
                    >
                      New Post
                    </CallToAction>
                  </div>
                </div>
                <div>
                  <Card
                    size="fill"
                    shadowSpread={3}
                    style={{ borderRadius: "5px" }}
                  >
                    <CardImage src="https://picsum.photos/400/300"></CardImage>
                    <CardTitle size={5}>
                      <Persona
                        size={45}
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        text="cezer121"
                      />
                      <Link
                        inlineLine
                        onClick={() => this.props.history.push("")}
                      >
                        Edit
                      </Link>
                    </CardTitle>
                    <CardContent>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptates nemo harum nesciunt magnam, hic minima
                      accusantium doloremque. Id voluptas aliquid similique
                      incidunt ipsa necessitatibus. Quo impedit et eligendi ea
                      aliquam. <br></br>
                      <br></br>
                      <br></br>
                      <div className="card-stats">
                        <Icon
                          icon="lar la-comments"
                          fontSize="1.7rem"
                          text="1234"
                        />
                        <Icon
                          icon="lar la-heart"
                          fontSize="1.7rem"
                          text="1234"
                        />
                        <div style={{ textAlign: "right", width: "100%" }}>
                          <Link
                            onClick={() => this.props.history.push("/view:1")}
                          >
                            VIEW
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </PageGroup>
          </div>
        </Page>
      </div>
    );
  }
}
