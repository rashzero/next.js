import React from "react";
import Link from "next/link";
import Header from "./Header";

export const SideBar = ({ children }) => {
  return (
    <Header>
      <div className="sidebar">
        <ul>
          <li>
            <Link href={"/users"}>
              <a>Users</a>
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
          <li>
            <Link href={"/other"}>
              <a>Other</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>{children}</div>

      <style jsx>
        {`
          .sidebar {
            position: fixed;
            top: 68px;
            width: 200px;
            background: yellow;
            left: 0;
          }

          ul {
            padding-top: 20px;
          }

          li {
            margin-bottom: 10px;
          }
        `}
      </style>
    </Header>
  );
};
