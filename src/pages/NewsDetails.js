// ** React Imports
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// ** Third Party Components
import {
  Bookmark,
  Facebook,
  GitHub,
  Gitlab,
  Linkedin,
  MessageSquare,
  Share2,
  Twitter,
} from "react-feather";

// ** Core Imports
import { getNewsWithIdAPI } from "../core/services/api/news/get-news-with-id.api";
import { convertDateToPersian } from "../core/utils/date-helper.utils";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import NewsSidebar from "../@core/components/NewsDetails/NewsSidebar";

// ** Reactstrap Imports
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import blankThumbnail from "../assets/images/common/blank-thumbnail.jpg";

const NewsDetails = () => {
  // ** States
  const [news, setNews] = useState();
  const [describe, setDescribe] = useState();

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const getNews = await getNewsWithIdAPI(id);

        const convertDescribe = JSON.parse(getNews?.detailsNewsDto.describe);

        setNews(getNews);
        setDescribe(convertDescribe);
      } catch (error) {
        toast.error("مشکلی در دریافت خبر به وجود آمد !");
      }
    };

    fetchNews();
  }, []);

  // const renderComments = () => {
  //   return news.comments.map((comment) => {
  //     return (
  //       <Card className="mb-3" key={comment.userFullName}>
  //         <CardBody>
  //           <div className="d-flex">
  //             <div>
  //               <Avatar
  //                 className="me-75"
  //                 img={comment.avatar}
  //                 imgHeight="38"
  //                 imgWidth="38"
  //               />
  //             </div>
  //             <div>
  //               <h6 className="fw-bolder mb-25">{comment.userFullName}</h6>
  //               <CardText>{comment.commentedAt}</CardText>
  //               <CardText>{comment.commentText}</CardText>
  //               <a href="/" onClick={(e) => e.preventDefault()}>
  //                 <div className="d-inline-flex align-items-center">
  //                   <CornerUpLeft size={18} className="me-50" />
  //                   <span>Reply</span>
  //                 </div>
  //               </a>
  //             </div>
  //           </div>
  //         </CardBody>
  //       </Card>
  //     );
  //   });
  // };

  const convertUpdateDate = convertDateToPersian(
    news?.detailsNewsDto.updateDate
  );

  const loadContent = () => {
    return describe?.blocks?.map((block, ind) => {
      switch (block.type) {
        case "header":
          return <h3 key={ind}>{block.data.text}</h3>;

        case "paragraph":
          return (
            <p key={ind} className="news-details-paragraph">
              {block.data.text}
            </p>
          );

        default:
          return null;
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="جزئیات خبر"
        data={[
          { title: "مدیریت اخبار", link: "/news" },
          { title: "جزئیات خبر" },
        ]}
      />
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {news !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardImg
                      src={news?.detailsNewsDto.currentImageAddress}
                      className="img-fluid news-details-picture"
                      top
                    />
                    <CardBody>
                      <CardTitle tag="h4">
                        {news?.detailsNewsDto.title}
                      </CardTitle>
                      <div className="d-flex">
                        <Badge color="light-primary" pill>
                          {news?.detailsNewsDto.newsCatregoryName}
                        </Badge>
                        <span className="text-muted ms-50 me-25">|</span>
                        <div>
                          <small>
                            <span>{news?.detailsNewsDto.addUserFullName}</span>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">
                            {convertUpdateDate}
                          </small>
                        </div>
                      </div>
                      <div className="mt-3">{loadContent()}</div>
                      <div className="d-flex align-items-center">
                        <div>
                          <Avatar
                            img={blankThumbnail}
                            className="me-2"
                            imgHeight="60"
                            imgWidth="60"
                          />
                        </div>
                        <div>
                          <h6 className="fw-bolder">
                            {news?.detailsNewsDto.addUserFullName}
                          </h6>
                          <div className="d-flex">
                            <span className="news-details-bold-text">
                              تعداد نظرات:{" "}
                              <span>{news?.detailsNewsDto?.commentsCount}</span>
                            </span>
                            <span className="ms-50 me-25">|</span>
                            <div>
                              <span className="news-details-bold-text">
                                آخرین آپدیت: <span>{convertUpdateDate}</span>
                              </span>
                              <span className="ms-50 me-25">|</span>
                              <span className="news-details-bold-text">
                                تعداد لایک:{" "}
                                <span>
                                  {news?.detailsNewsDto.currentLikeCount}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center me-1">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <MessageSquare
                                size={21}
                                className="text-body align-middle"
                              />
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {kFormatter(news?.detailsNewsDto.comments)}
                              </div>
                            </a>
                          </div>
                          <div className="d-flex align-items-cente">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Bookmark
                                size={21}
                                className="text-body align-middle"
                              />
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {news?.detailsNewsDto.bookmarked}
                              </div>
                            </a>
                          </div>
                        </div>
                        <UncontrolledDropdown className="dropdown-icon-wrapper">
                          <DropdownToggle tag="span">
                            <Share2
                              size={21}
                              className="text-body cursor-pointer"
                            />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem className="py-50 px-1">
                              <GitHub size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Gitlab size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Facebook size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Twitter size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Linkedin size={18} />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12" id="blogComment">
                  <h6 className="section-label">نظرات</h6>
                  {/* {renderComments()} */}
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <NewsSidebar />
      </div>
    </Fragment>
  );
};

export default NewsDetails;
