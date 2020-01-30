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
import Axios from "axios";

export interface IViewProps {
  history: any;
  cookie: any;
  match: any;
}

export interface IViewState {
  hasLikedImage: boolean;
  data?: any;
}

export default class View extends React.Component<IViewProps, IViewState> {
  constructor(props: IViewProps) {
    super(props);

    const formData = new FormData();
    formData.append("ID", this.props.match.params.id);

    Axios.post(
      "http://localhost/InstaClone/backend/" + "getImage.php",
      formData
    ).then(res => {
      this.setState({ data: res.data });
    });

    this.state = {
      hasLikedImage: false,
      data: {
        Username: "",
        ImageURL: "",
        ImageContent: ""
      }
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
              url: "/profile",
              iconName: "la la-sign-in-alt"
            }
          ]}
          onNavLinkClick={url => url && this.props.history.push(url)}
        >
          <div
            style={{
              width: " 90%",
              maxWidth: "1000px",
              margin: "0 auto"
            }}
          >
            <PageGroup>
              <Card
                size="fill"
                shadowSpread={3}
                style={{
                  borderRadius: "5px",
                  marginTop: "3%"
                }}
              >
                {!!this.state.data.ImageURL && (
                  <CardImage
                    src={
                      "http://localhost/InstaClone/backend/" +
                      this.state.data.ImageURL
                    }
                  ></CardImage>
                )}
                <CardTitle size={5}>
                  <Persona
                    size={45}
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    text={this.state.data.Username}
                  />
                </CardTitle>
                <CardContent>
                  {this.state.data.ImageContent}
                  <br></br>
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
									width: '100%',
                  boxShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.2);"
                }}
              ></TextInput>
              <Card
                size="fill"
                shadowSpread={3}
                style={{
                  borderRadius: "5px",
                  width: "100%",
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
