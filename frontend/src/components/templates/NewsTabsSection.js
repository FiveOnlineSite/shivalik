import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsColList from "../organisms/NewsColList";

const NewsTabsSection = () => {
 
const [newsHero, setNewsHero] = useState(null);
const [newsList, setNewsList] = useState([]);

const [worthyHero, setWorthyHero] = useState(null);
const [worthyList, setWorthyList] = useState([]);

useEffect(() => {
  const fetchNewsWorthy = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiUrl}/api/news-worthy-mention`);
      const all = res.data.NewsWorthyMentions;

      // Split by category
      const newsItems = all.filter((i) => i.news_category === "News");
      const worthyItems = all.filter((i) => i.news_category === "Worthy Mentions");

      // Sort by sequence
      newsItems.sort((a, b) => a.sequence - b.sequence);
      worthyItems.sort((a, b) => a.sequence - b.sequence);

      // Take hero (seq 1) + the rest
      setNewsHero(newsItems[0] || null);
      setNewsList(newsItems.slice(1));

      setWorthyHero(worthyItems[0] || null);
      setWorthyList(worthyItems.slice(1));
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };
  fetchNewsWorthy();
}, []);


  return (
    <section>
      <div className="container">
        <div className="tabs-one-box">
          {/* Tabs */}
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-news-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-news"
                type="button"
                role="tab"
                aria-controls="pills-news"
                aria-selected="true"
              >
                News
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-worthy-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-worthy"
                type="button"
                role="tab"
                aria-controls="pills-worthy"
                aria-selected="false"
              >
                Worthy Mentions
              </button>
            </li>
          </ul>

          {/* Tab content */}
          <div className="tab-content" id="pills-tabContent">
            {/* News */}
            <div
              className="tab-pane fade show active"
              id="pills-news"
              role="tabpanel"
              aria-labelledby="pills-news-tab"
            >
              {newsHero && (
                <div className="award-card-container">
                  {newsHero.image[0].filepath && (
                  <img
                    src={newsHero.image[0].filepath}
                    alt={newsHero.alt}
                    width="100%"
                    className="award-image"
                  />
                  )}
                  <div className="award-info-box">
                    <h2 className="award-heading">{newsHero.title}</h2>
                    <div className="award-meta">
                      <span className="award-label">{newsHero.publisher_name}</span>
                      <span className="award-date">{new Date(
                            newsHero.date
                          ).toLocaleDateString("en-UK", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="news-paper-tb">
                <NewsColList data={newsList} />
              </div>
            </div>

            {/* Worthy Mentions */}
            <div
              className="tab-pane fade"
              id="pills-worthy"
              role="tabpanel"
              aria-labelledby="pills-worthy-tab"
            >
              {worthyHero && (
                <div className="award-card-container">
                  <img
                    src={worthyHero.image[0].filepath}
                    alt={worthyHero.alt}
                    width="100%"
                    className="award-image"
                  />
                  <div className="award-info-box">
                    <h2 className="award-heading">
                      {worthyHero.title}
                    </h2>
                    <div className="award-meta">
                      <span className="award-label">
                        {worthyHero.publisher_name}
                      </span>
                      <span className="award-date">{new Date(
                            worthyHero.date
                          ).toLocaleDateString("en-UK", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="news-paper-tb">
                <NewsColList data={worthyList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsTabsSection;
