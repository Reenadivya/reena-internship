import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const [authorData, setAuthorData] = useState();
  const [loading, setLoading] = useState(true);
  const [btn, setBtn] = useState("Follow");
  const [followers, setFollowers] = useState(undefined);
  const [img, setImg] = useState();

  const { id } = useParams();

  function followersHandle() {
    if (btn === "Follow") {
      setBtn("Unfollow");
      setFollowers(followers + 1);
    } else {
      setBtn("Follow");
      setFollowers(followers - 1);
    }
  }

  const getAuthorData = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        )
        .then(({ data }) => {
          setAuthorData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAuthorData();
  }, []);

  useEffect(() => {
    setFollowers(authorData?.followers);
  }, [authorData?.followers]);

  const mountedRef = useRef(true);

  useEffect(() => {
    if (!loading) {
      const image = new Image();
      image.src = authorData?.authorImage;
      image.onload = () => {
        setTimeout(() => {
          if (mountedRef.current) {
            setImg(image);
          }
        }, 300);
      };
      return () => {
        mountedRef.current = false;
      };
    }
  }, [loading]);

  return (
    <>
      {!loading && img ? (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${AuthorBanner}) top` }}></section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorData?.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData?.authorName}
                              <span className="profile_username">
                                @{authorData?.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorData?.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={followersHandle}>
                            {btn}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems data={authorData} loading={loading} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${AuthorBanner}) top` }}></section>
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            height="150px"
                            width="150px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" />
                            <span className="profile_username">
                              <Skeleton width="100px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="150px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width="150px" height="40px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill().map((_, idx) => (
                              <div
                                key={idx}
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <Skeleton width="100%" height="400px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Author;
