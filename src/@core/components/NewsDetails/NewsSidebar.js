// ** React Imports
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Core Imports
import { getNewsCategoryListsAPI } from "../../../core/services/api/news/get-news-category-lists";

// ** Third Party Components
import { CheckCircle, Star } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports

const NewsSidebar = () => {
  // ** States
  const [newsCategoryLists, setNewsCategoryLists] = useState();

  useEffect(() => {
    const fetchNewsCategoryLists = async () => {
      try {
        const getNewsCategoryLists = await getNewsCategoryListsAPI();

        const getLatestNewsCategoryLists = getNewsCategoryLists.slice(0, 4);

        setNewsCategoryLists(getLatestNewsCategoryLists);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دریافت لیست دسته بندی های اخبار به وجود آمد !");
      }
    };

    fetchNewsCategoryLists();
  }, []);

  // const renderRecentPosts = () => {
  //   return data.recentPosts.map((post, index) => {
  //     return (
  //       <div
  //         key={index}
  //         className={classnames("d-flex", {
  //           "mb-2": index !== data.recentPosts.length - 1,
  //         })}
  //       >
  //         <Link className="me-2" to={`/pages/blog/detail/${post.id}`}>
  //           <img
  //             className="rounded"
  //             src={post.img}
  //             alt={post.title}
  //             width="100"
  //             height="70"
  //           />
  //         </Link>
  //         <div>
  //           <h6 className="blog-recent-post-title">
  //             <Link
  //               className="text-body-heading"
  //               to={`/pages/blog/detail/${post.id}`}
  //             >
  //               {post.title}
  //             </Link>
  //           </h6>
  //           <div className="text-muted mb-0">{post.createdTime}</div>
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  const renderCategories = () => {
    return newsCategoryLists?.map((item, index) => {
      return (
        <div
          key={index}
          className="d-flex justify-content-start align-items-center"
        >
          <a className="me-75" href="/" onClick={(e) => e.preventDefault()}>
            <Avatar
              className="rounded-full"
              color="light-primary"
              icon={<Star size={15} />}
            />
          </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
            <div className="blog-category-title text-body">
              {item.categoryName}
            </div>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            {newsCategoryLists !== null ? (
              <Fragment>
                <div className="blog-categories mt-3">
                  <h6 className="section-label">دسته بندی های اخبار</h6>
                  <div className="mt-1 d-flex flex-column gap-1">
                    {renderCategories()}
                  </div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
