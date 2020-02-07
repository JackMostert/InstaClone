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
import ReactSearchBox from "react-search-box";
import _ from "lodash";

export interface IFeedProps {
  history: any;
  cookie: any;
}

export interface IFeedState {
  images: Array<any>;
  dataLoaded?: boolean;
  hashTags?: Array<any>;
  searchValue?: string;
  filteredImages?: Array<any>;
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
      "http://localhost/InstaClone/backend/Core/" + "Core.php",
      formData
    ).then(res => {
      this.setState({
        images: _.orderBy(res.data, (o: any) => o.Post_DatePosted).reverse(),
        dataLoaded: true
      });
      let hashs: any = [];
      _.map(this.state.images, (el: any) => {
        const regex = /#[A-Za-z0-9]*/g;
        const hashTags = el.Post_Content.match(regex) || [];
        for (const key in hashTags) {
          if (hashTags.hasOwnProperty(key)) {
            const element = hashTags[key];
            hashs.push({ key: element, value: element });
          }
        }
      });
      this.setState({ hashTags: hashs });
    });

    this.state = { images: [], dataLoaded: false };
  }

  private search(value: any = undefined) {
    this.setState({
      filteredImages: _.filter(
        this.state.images,
        (el: any) => !!el.Post_Content.match(value)
      )
    });
  }

  public render() {
    let data = this.state.hashTags;
    let posts = this.state.filteredImages || this.state.images;
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
            animationConfig={{ delay: 1, animationLength: 1.2 }}
            type={{ spinner: { size: "50px" } }}
          />
          <div className="feed-content">
            <ReactSearchBox
              autoFocus
              placeholder="Search by #tag or text"
              data={data}
              // onSelect={record => }
              onChange={(value: string) => {
                this.setState({ searchValue: value });
                this.search(value);
              }}
              fuseConfigs={{
                threshold: 0.05,
                shouldSort: true
              }}
              value={this.state.searchValue || ""}
            />

            <Grid col={1} row={0} colGap="20px" rowGap="20px">
              {posts.map(card => (
                <div>
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
                        size={33}
                        src={`https://avatars.dicebear.com/v2/identicon/${card.Username}.svg`}
                        text={card.Username}
                      />
                    </CardTitle>
                    {card.Post_Content && (
                      <CardContent>{card.Post_Content}</CardContent>
                    )}
                    <CardFooter>
                      <div className="card-stats">
                        <Icon
                          icon="lar la-comments"
                          fontSize="1.7rem"
                          text={card.commentCount || "0"}
                        />
                        <Icon
                          icon="lar la-heart"
                          fontSize="1.7rem"
                          text={card.likeCount || "0"}
                        />
                        <div style={{ textAlign: "right", width: "100%" }}>
                          <Link
                            inlineLine
                            onClick={() =>
                              this.props.history.push(`/view${card.Post_ID}`)
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
