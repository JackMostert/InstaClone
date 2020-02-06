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
import CallToAction from "../Personal-Design-Language/CallToAction/Index";
import CardFooter from "../Personal-Design-Language/CardFooter/Index";

export interface IViewProps {
  history: any;
  cookie: any;
  match: any;
}

export interface IViewState {
  hasLikedImage: boolean;
  data?: any;
  comment: string;
}

export default class View extends React.Component<IViewProps, IViewState> {
  constructor(props: IViewProps) {
    super(props);

    const formData = new FormData();

    formData.append("method", "GET");
    formData.append("table", "Posts");
    formData.append("schema", "RequestConditional");
    formData.append("returnType", "Data");
    formData.append("route", "/Feed");
    formData.append(
      "data",
      JSON.stringify({
        field: "Post_ID",
        toSearch: this.props.match.params.id
      })
    );

    Axios.post(
      "http://localhost/InstaClone/backend/Core/" + "Core.php",
      formData
    ).then(res => {
      if (res.data[0]) {
        this.setState({
          data: res.data[0]
        });
        console.log(this.state.data);
      }
    });

    this.state = {
      hasLikedImage: false,
      data: {
        Username: "",
        ImageURL: "",
        ImageContent: "",
        LikeCount: "",
        CommentCount: "",
        comments: []
      },
      comment: ""
    };
  }

  private postLike = () => {
    const formData = new FormData();
    formData.append("userID", this.props.cookie.get("token"));
    formData.append("imageID", this.props.match.params.id);

    Axios.post(
      "http://localhost/InstaClone/backend/" + "postLike.php",
      formData
    ).then(res => window.location.reload());
  };

  private postComment = () => {
    const formData = new FormData();
    formData.append("userID", this.props.cookie.get("token"));
    formData.append("imageID", this.props.match.params.id);
    formData.append("comment", this.state.comment);

    Axios.post(
      "http://localhost/InstaClone/backend/" + "postComment.php",
      formData
    ).then(res => window.location.reload());
  };

  public render() {
    return (
      <div className="View">
        <Page
          width="100%"
          isRoot
          pageColor="rgb(245, 245, 245)"
          pageAlignment="center"
          navigationOptions={{
            style: "fixed"
          }}
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
              margin: "60px auto 20px auto"
            }}
          >
            <PageGroup>
              <Card
                size="fill"
                shadowSpread={3}
                style={{ borderRadius: "5px" }}
              >
                {this.state.data.Post_ImageURL && (
                  <CardImage
                    src={
                      "http://localhost/InstaClone/backend/" +
                      this.state.data.Post_ImageURL
                    }
                  ></CardImage>
                )}
                <CardTitle size={5}>
                  <Persona
                    size={33}
                    src={`https://avatars.dicebear.com/v2/identicon/${this.state.data.Username}.svg`}
                    text={this.state.data.Username}
                  />
                </CardTitle>
                {this.state.data.Post_Content && (
                  <CardContent>{this.state.data.Post_Content}</CardContent>
                )}
                <CardFooter>
                  <div className="card-stats">
                    <Icon
                      icon="lar la-comments"
                      fontSize="1.7rem"
                      text={this.state.data.commentCount || "0"}
                    />
                    <Icon
                      icon="lar la-heart"
                      fontSize="1.7rem"
                      text={this.state.data.likeCount || "0"}
                    />
                    <div style={{ textAlign: "right", width: "100%" }}>
                      <Link
                        inlineLine
                        onClick={() =>
                          this.props.history.push(
                            `/view${this.state.data.Post_ID}`
                          )
                        }
                      >
                        VIEW
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </PageGroup>
            <PageGroup>
              <Header hNumber={5}>Comments</Header>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4fr 1fr",
                  alignItems: "center",
                  gridColumnGap: "10px"
                }}
              >
                <TextInput
                  size={5}
                  type="text"
                  borderRadius={5}
                  labelValue="Write your comment"
                  onChange={value => this.setState({ comment: value })}
                  style={{
                    width: "100%",
                    boxShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.2);"
                  }}
                ></TextInput>
                <div style={{ marginTop: "9px" }}>
                  <CallToAction size={4} onClick={this.postComment}>
                    Comment
                  </CallToAction>
                </div>
              </div>
              {/* {this.state.data.comments.map((el: any) => (
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
                      text={el.Username}
                    />
                  </CardTitle>
                  <CardContent>{el.Comment}</CardContent>
                </Card>
              ))} */}
            </PageGroup>
          </div>
        </Page>
      </div>
    );
  }
}
