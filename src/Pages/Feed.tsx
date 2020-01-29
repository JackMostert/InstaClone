import * as React from "react";
import { Page } from "../Personal-Design-Language/Page/Page";
import { Grid } from "../Personal-Design-Language/Grid/Grid";
import { Card } from "../Personal-Design-Language/Card/Card";
import CardImage from "../Personal-Design-Language/CardImage/Index";
import CardContent from "../Personal-Design-Language/CardContent/Index";
import CardTitle from "../Personal-Design-Language/CardTitle/Index";
import Persona from "../Personal-Design-Language/Persona";
import Icon from "../Personal-Design-Language/Icon";
import { Link } from "../Personal-Design-Language/Link/Link";

export interface IFeedProps {
  history: any;
  cookie: any;
}

export interface IFeedState {}

export default class Feed extends React.Component<IFeedProps, IFeedState> {
  constructor(props: IFeedProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="Feed">
        <Page
          width="100%"
          isRoot
          pageColor="rgb(245, 245, 245)"
          pageAlignment="center"
          navLinksNear={[{ displayName: "Feed", isHeader: true }]}
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
          <div className="feed-content">
            <Grid col={5} row={0} colGap="20px" rowGap="20px">
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardImage src="https://picsum.photos/400/300" />{" "}
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
              </div>
              <div>
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardImage src="https://picsum.photos/200/300" />{" "}
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardImage src="https://picsum.photos/400/300" />{" "}
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
              </div>
              <div>
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardImage src="https://picsum.photos/200/300" />{" "}
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
              </div>
              <div>
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardImage src="https://picsum.photos/200/300" />{" "}
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
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
                      <Icon icon="lar la-heart" fontSize="1.7rem" text="1234" />
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
              </div>
              <div>
                <Card
                  size="fill"
                  shadowSpread={3}
                  style={{ borderRadius: "5px" }}
                >
                  <CardImage src="https://picsum.photos/200/300" />{" "}
                  <CardTitle size={5}>
                    {" "}
                    <Persona
                      size={45}
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      text="cezer121"
                    />
                  </CardTitle>
                  <CardContent>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptates nemo harum nesciunt magnam, hic minima
                    accusantium doloremque. Id voluptas aliquid similique
                    incidunt ipsa necessitatibus. Quo impedit et eligendi ea
                    aliquam.
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
              </div>
            </Grid>
          </div>
        </Page>
      </div>
    );
  }
}
