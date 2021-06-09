import React from "react";
import Link from "next/link";
import Header from "./Header";
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';

export const SideBar = ({ children }) => {
  return (
    <Footer>
      <div>
        <Header />
        <Grid container>
          <Grid item xs={3}>
            <div className="sidebar">
              <ul >
                <li>
                  <Link href={"/users"}>
                    <a>Users</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/news"}>
                    <a>News</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/other"}>
                    <a>Other</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/other"}>
                    <a>Other</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={9}> 
            {children}
          </Grid>
        </Grid>

        <style jsx>
          {`
            .sidebar {
              width: 100%;
              min-height: 74vh;
              height: 100%;
              background: yellow;
              margin: 0;
              text-align: center;
            }

            ul {
              padding: 20px 0;
              margin: 0px;
            }

            li {
              margin-bottom: 10px;
              list-style: none;
              border-bottom: 1px solid #ffffff;
              padding-bottom: 10px;
            }

            a {
              text-decoration: none;
              font-size: 26px;
            }
          `}
        </style>
      </div>
    </Footer>
  );
};
