import React from 'react';

export default function Footer({children}) {
  return (
    <div className="container">
      {children}
      <div className="footer"/>

      <style jsx>
        {`
          .container {
            height: 100vh;
          }

          .footer {
            min-height: 125px;
            background-color: #10b210;
          }
        `}
      </style>
    </div>
  );
}
