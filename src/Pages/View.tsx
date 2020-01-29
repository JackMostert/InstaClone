import * as React from "react";
import { Card } from "../Personal-Design-Language/Card/Card";
import CardImage from "../Personal-Design-Language/CardImage/Index";
import CardTitle from "../Personal-Design-Language/CardTitle/Index";
import Persona from "../Personal-Design-Language/Persona";
import CardContent from "../Personal-Design-Language/CardContent/Index";
import Icon from "../Personal-Design-Language/Icon";
import { Link } from "../Personal-Design-Language/Link/Link";
import { Page } from "../Personal-Design-Language/Page/Page";
import PageGroup from "../Personal-Design-Language/PageGroup/Index";
import Header from "../Personal-Design-Language/Header/Index";
import TextInput from "../Personal-Design-Language/TextInput/Index";

export interface IViewProps {
  history: any;
  cookie: any;
}

export interface IViewState {
  hasLikedImage: boolean;
}

export default class View extends React.Component<IViewProps, IViewState> {
  constructor(props: IViewProps) {
    super(props);

    this.state = {
      hasLikedImage: false
    };
  }

  public render() {
    return (
      <div>
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
              flexFlow: "column",
              height: "100%"
            }}
          >
            <PageGroup>
              <Card
                size="fill"
                shadowSpread={3}
                style={{
                  borderRadius: "5px",
                  maxWidth: "1000px",
                  marginTop: "3%",
                  width: "90%"
                }}
              >
                <CardImage src="https://picsum.photos/400/300"></CardImage>
                <CardTitle size={5}>
                  <Persona
                    size={45}
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    text="cezer121"
                  />
                </CardTitle>
                <CardContent>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptates nemo harum nesciunt magnam, hic minima accusantium
                  doloremque. Id voluptas aliquid similique incidunt ipsa
                  necessitatibus. Quo impedit et eligendi ea aliquam. <br></br>
                  <br></br>
                  <br></br>
                  <div className="card-stats">
                    <Icon
                      icon="lar la-comments"
                      fontSize="1.7rem"
                      text="1234"
                    />
                    <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
                    <div
                      style={{ textAlign: "right", width: "100%", margin: "0" }}
                    >
                      <Link
                        inlineLine={this.state.hasLikedImage}
                        onClick={() =>
                          this.setState({
                            hasLikedImage: !this.state.hasLikedImage
                          })
                        }
                        iconProps={{ icon: "la la-heart", fontSize: "2rem" }}
                      ></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PageGroup>
            <PageGroup>
              <Header hNumber={5}>Comments</Header>
              <TextInput
                size={5}
                type="text"
                borderRadius={5}
                labelValue="Write your comment"
                style={{
                  maxWidth: "1000px",
                  width: "90%",
                  boxShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.2);"
                }}
              ></TextInput>
              <Card
                size="fill"
                shadowSpread={3}
                style={{
                  borderRadius: "5px",
                  maxWidth: "1000px",
                  width: "90%",
                  marginTop: "20px"
                }}
              >
                <CardTitle size={5}>
                  <Persona
                    size={45}
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    text="cezer121"
                  />
                </CardTitle>
                <CardContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  aliquam, quia provident sapiente tempore nihil alias similique
                  beatae ad molestias cupiditate fugiat laborum natus, quas sunt
                  sit doloremque molestiae delectus.
                </CardContent>
              </Card>
            </PageGroup>
          </div>
        </Page>
      </div>
    );
  }
}
