import React from "react";

const Header = ({ children }) => {
  return (
    <div>
      <nav className="header">
        <h1>Header</h1>
      </nav>
      <main>{children}</main>
      <style jsx>
        {`
          .header {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            heigth: 50px;
            background: green;
          }

          h1 {
            margin-left: 25px;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
