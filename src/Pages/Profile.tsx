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
import Axios from "axios";

export interface IProfileProps {
  history: any;
  cookie: any;
  match: any;
}

export interface IProfileState {
  isEditing: boolean;
  usernameField: string;
  emailField: string;
  firstName: string;
  lastName: string;
  age: string;
  joined: string;
  newImage: {
    isEditing?: boolean;
    image?: any;
    content?: string;
  };
  imageURL: any;
  images: Array<Array<any>>;
}

export default class Profile extends React.Component<
  IProfileProps,
  IProfileState
> {
  constructor(props: IProfileProps) {
    super(props);

    const formData = new FormData();
    formData.append("Token", this.props.cookie.get("token"));
    formData.append("method", "GET");
    formData.append("table", "Users");
    formData.append("schema", "RequestConditional");
    formData.append("returnType", "Data");
    formData.append("route", "/Profile");

    formData.append(
      "data",
      JSON.stringify({
        toSearch: "",
        field: ""
      })
    );

    Axios.post(
      "http://localhost/InstaClone/backend/New/Core/" + "Core.php",
      formData
    ).then((res: any) => {
      if (res.data.User_Email) {
        this.setState({
          usernameField: res.data.User_Username || "",
          emailField: res.data.User_Email || "",
          firstName: res.data.User_FirstName || "",
          lastName: res.data.User_LastName || "",
          age: res.data.User_Age || "",
          joined: res.data.User_DateJoined || "",
          images: [res.data.posts] || []
        });
      }
    });

    this.state = {
      isEditing: false,
      usernameField: "",
      emailField: "",
      firstName: "",
      lastName: "",
      age: "",
      joined: "",
      newImage: {
        isEditing: false,
        image: undefined,
        content: ""
      },
      imageURL: "https://via.placeholder.com/600x400",
      images: []
    };
  }

  private imageRef = React.createRef<HTMLInputElement>();

  private postImage = () => {
    const formData = new FormData();
    if (this.state.newImage.image) {
      formData.append(
        "image",
        this.state.newImage.image,
        this.state.newImage.image.name
      );
    }

    formData.append("content", this.state.newImage.content || "");
    formData.append("user_id", this.props.cookie.get("token"));

    Axios.post(
      "http://localhost/InstaClone/backend/" + "upload_file.php",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data;`
        }
      }
    )
      .then(re => {
        if (re.data.Sstatus) {
          this.setState({
            imageURL: "",
            newImage: { content: "", image: "", isEditing: false }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  public render() {
    if (!this.props.cookie.get("token")) {
      this.props.history.push("/Unauth");
    }

    return (
      <div className="Profile">
        <div
          className="model"
          style={{ display: this.state.newImage.isEditing ? "flex" : "none" }}
        >
          <Card size="large" shadowSpread={5} style={{ borderRadius: "5px" }}>
            <CardImage src={this.state.imageURL}>
              <CallToAction
                size={3}
                onClick={() => {
                  this.imageRef.current?.click();
                }}
              >
                Add Image
              </CallToAction>
              <input
                ref={this.imageRef}
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={event => {
                  if (
                    !!event.target.files &&
                    event.target.files?.length !== 0
                  ) {
                    this.setState({
                      newImage: {
                        image: event.target.files[0],
                        isEditing: true,
                        content: this.state.newImage.content
                      },
                      imageURL:
                        (URL.createObjectURL &&
                          URL.createObjectURL(event.target.files[0])) ||
                        this.state.imageURL
                    });
                  } else {
                    this.setState({
                      imageURL: "https://via.placeholder.com/600x400"
                    });
                  }
                }}
              ></input>
            </CardImage>
            <CardTitle size={5}>
              <Persona
                size={45}
                src="https://randomuser.me/api/portraits/men/75.jpg"
                text="cezer121"
              />
            </CardTitle>
            <CardContent>
              <textarea
                placeholder="Type a message..."
                className="content-text-editor"
                value={this.state.newImage.content}
                onChange={value => {
                  this.setState({
                    newImage: {
                      content: value.currentTarget.value,
                      isEditing: true,
                      image: this.state.newImage.image
                    }
                  });
                }}
                style={{
                  width: "100%",
                  height: "200px",
                  boxSizing: "border-box"
                }}
              ></textarea>
              <br></br>
              <div className="card-stats">
                <Link
                  inlineLine
                  onClick={() => {
                    this.postImage();
                  }}
                >
                  POST
                </Link>
                <div style={{ textAlign: "right", width: "100%" }}>
                  <Link
                    onClick={() =>
                      this.setState({
                        newImage: {
                          isEditing: false,
                          image: undefined,
                          content: ""
                        }
                      })
                    }
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            filter: this.state.newImage.isEditing ? "blur(8px)" : "unset"
          }}
        >
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
                height: "100%",
                padding: "40px 20px",
                boxSizing: "border-box",
                width: "90%",
                maxWidth: "1920px",
                margin: "0 auto"
              }}
            >
              <div className="CommandBar-root">
                <Header hNumber={5}>Profile</Header>
                <div className="left"></div>
              </div>
              <PageGroup>
                <Card size="fill" shadowSpread={2} className="information-card">
                  <div className="edit"></div>
                  <CardTitle size="">
                    {" "}
                    <Persona
                      size={240}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                    />
                  </CardTitle>
                  <CardContent>
                    <br></br>
                    <div className="profile-text">
                      <div className="profile-info">
                        <Text weight="regular">First Name:</Text>
                      </div>
                      {this.state.isEditing ? (
                        <TextInput
                          type="text"
                          size={2}
                          labelValue="Lebel"
                          value={this.state.firstName}
                        />
                      ) : (
                        <Text weight="regular">{this.state.firstName}</Text>
                      )}
                    </div>
                    <div className="profile-text">
                      <div className="profile-info">
                        <Text weight="regular">Last Name:</Text>
                      </div>
                      {this.state.isEditing ? (
                        <TextInput
                          type="text"
                          size={2}
                          labelValue="Lebel"
                          value={this.state.lastName}
                        />
                      ) : (
                        <Text weight="regular">{this.state.lastName}</Text>
                      )}
                    </div>
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
                    <div className="profile-text">
                      <div className="profile-info">
                        <Text weight="regular">Age:</Text>
                      </div>
                      {this.state.isEditing ? (
                        <TextInput
                          type="text"
                          size={2}
                          labelValue="Lebel"
                          value={this.state.age}
                        />
                      ) : (
                        <Text weight="regular">{this.state.age}</Text>
                      )}
                    </div>
                    <div className="profile-text">
                      <div className="profile-info">
                        <Text weight="regular">Joined:</Text>
                      </div>
                      {this.state.isEditing ? (
                        <TextInput
                          type="text"
                          size={2}
                          labelValue="Lebel"
                          value={this.state.joined}
                        />
                      ) : (
                        <Text weight="regular">{this.state.joined}</Text>
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
              </PageGroup>
              <div className="CommandBar-root">
                <Header hNumber={5}>All Posts</Header>
                <div className="left">
                  <CallToAction
                    size={3}
                    onClick={() => {
                      this.setState({ newImage: { isEditing: true } });
                    }}
                  >
                    New Post
                  </CallToAction>
                </div>
              </div>
              <Grid row={0} col={4} colGap="20px" rowGap="20px">
                {this.state.images.map((el, index) => (
                  <div>
                    {el.map(card => (
                      <Card
                        size="fill"
                        shadowSpread={3}
                        style={{ borderRadius: "5px" }}
                      >
                        {card.Post_ImageURL && (
                          <CardImage
                            src={
                              "http://localhost/InstaClone/backend/" +
                              card.Post_ImageURL
                            }
                          ></CardImage>
                        )}
                        <CardTitle size={5}>
                          <Persona
                            size={45}
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            text={this.state.usernameField}
                          />
                        </CardTitle>
                        <CardContent>
                          {card.Post_Content} <br></br>
                          <br></br>
                          <br></br>
                          <div className="card-stats">
                            <Icon
                              icon="lar la-comments"
                              fontSize="1.7rem"
                              text={`${card.commentCount}`}
                            />
                            <Icon
                              icon="lar la-heart"
                              fontSize="1.7rem"
                              text={`${card.likeCount}`}
                            />
                            <div style={{ textAlign: "right", width: "100%" }}>
                              <Link
                                inlineLine
                                onClick={() => this.props.history.push("/view")}
                              >
                                VIEW
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </Grid>
            </div>
          </Page>
        </div>
      </div>
    );
  }
}
