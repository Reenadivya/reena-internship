import React, { useState, useEffect } from "react";
import axios from "axios";
import TopSeller from "../UI/TopSeller";
import Aos from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState();
  const [loading, setLoading] = useState(false);

  const getTopSellersData = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
        )
        .then(({ data }) => {
          setTopSellersData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getTopSellersData();
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-in" data-aos-once="true">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? null : (
            <div className="col-md-12" data-aos="fade-in" data-aos-once="true">
              <ol className="author_list">
                {topSellersData?.map((topSellerData, id) => (
                  <TopSeller
                    topSellersData={topSellerData}
                    loading={loading}
                    key={id}
                  />
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
