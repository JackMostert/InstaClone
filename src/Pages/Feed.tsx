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
import Axios from "axios";
import CardFooter from "../Personal-Design-Language/CardFooter/Index";
import Loading from "../Personal-Design-Language/Loading/Index";

export interface IFeedProps {
  history: any;
  cookie: any;
}

export interface IFeedState {
  images: Array<any>;
  dataLoaded?: boolean;
}

export default class Feed extends React.Component<IFeedProps, IFeedState> {
  constructor(props: IFeedProps) {
    super(props);

    const formData = new FormData();
    formData.append("method", "GET");
    formData.append("table", "Posts");
    formData.append("schema", "RequestAll");
    formData.append("returnType", "Data");
    formData.append("route", "/Feed");
    formData.append(
      "data",
      JSON.stringify({
        NULL: ""
      })
    );

    Axios.post(
      "http://localhost/InstaClone/backend/New/Core/" + "Core.php",
      formData
    ).then(res => {
      this.setState({ images: res.data, dataLoaded: true });
    });

    this.state = { images: [], dataLoaded: false };
  }

  public render() {
    return (
      <div className="Feed">
        <Page
          width="100%"
          isRoot
          pageColor="rgb(245, 245, 245)"
          pageAlignment="center"
          navigationOptions={{
            style: "fixed"
          }}
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
              url: "/profile",
              iconName: "la la-sign-in-alt"
            }
          ]}
          onNavLinkClick={url => url && this.props.history.push(url)}
        >
          <Loading
            fadout={this.state.dataLoaded}
            animationConfig={{ delay: 1.5, animationLength: 1.2 }}
            type={{ spinner: { size: "50px" } }}
          />
          <div className="feed-content">
            <Grid col={1} row={0} colGap="20px" rowGap="20px">
              {this.state.images.map(card => (
                <div>
                  <Card
                    size="fill"
                    shadowSpread={3}
                    style={{ borderRadius: "5px" }}
                  >
                    {card.URL && (
                      <CardImage
                        src={"http://localhost/InstaClone/backend/" + card.URL}
                      ></CardImage>
                    )}
                    <CardTitle size={5}>
                      <Persona
                        size={33}
                        src={`https://avatars.dicebear.com/v2/identicon/${card.ID}.svg`}
                        text={card.User}
                      />
                    </CardTitle>
                    {card.content && <CardContent>{card.content}</CardContent>}
                    <CardFooter>
                      <div className="card-stats">
                        <Icon
                          icon="lar la-comments"
                          fontSize="1.7rem"
                          text={card.Comments || "0"}
                        />
                        <Icon
                          icon="lar la-heart"
                          fontSize="1.7rem"
                          text={card.Likes || "0"}
                        />
                        <div style={{ textAlign: "right", width: "100%" }}>
                          <Link
                            inlineLine
                            onClick={() =>
                              this.props.history.push(`/view${card.ID}`)
                            }
                          >
                            VIEW
                          </Link>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </Grid>
          </div>
        </Page>
      </div>
    );
  }
}
