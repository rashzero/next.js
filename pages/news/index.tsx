import React, { useState, useEffect } from "react";
import { SideBar } from '../../components/SideBar';
import Container from '@material-ui/core/Container';
import NewsCard from '../../components/NewsCard';
import Grid from '@material-ui/core/Grid';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect((): void => {
    const load = async () => {
      const responce = await fetch("http://localhost:3001/api/news");
      if (!responce) {
        alert("Warning");
      }
      const newsData = await responce.json();
      setNews(newsData);
    };

    if (!news.length) {
      load();
    }
  }, []);

  return (
    <SideBar>
      <div className="container">
        <div className="title">
          News
        </div>
        <div className="container-items">
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {news.map(newsData => (
                <Grid item xs={6}>
                  <NewsCard newsData={newsData} key={newsData.id}/>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>

      <style jsx>
        {`
          .title {
            text-align: center;
            font-size: 24px;
            margin: 10px 0;
          }

          .container-items {
            margin: 20px 0;
          }
        `}
      </style>
    </SideBar>
  )
}

News.getInitialProps = async ({ req }) => {
  if (!req) {
    return { newsData: [] };
  }
  const responce = await fetch("http://localhost:3001/api/news");
  const newsData = await responce.json();
  return { newsData };
};

export default News;