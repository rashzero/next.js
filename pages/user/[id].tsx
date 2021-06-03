import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { UserData } from '../../interfaces/user';
import { SideBar } from '../../components/SideBar';

interface UserPageProps {
  user: UserData
}

const User = ({ user: serverUser }: UserPageProps) => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const handleClickBack = () => {
    router.push("/users");
  };

  useEffect(() => {
    const load = async () => {
      const responce = await fetch(
        `http://localhost:3001/api/users/${router.query.id}`
      );
      const userInfo = await responce.json();
      setUser(userInfo);
    };

    if (!serverUser) {
      load();
    }
  }, []);

  if (!user) {
    return <p>Loading ...</p>;
  }
  return (
    <SideBar>
      <div className="content">
        <h1>{user?.name}</h1>
        <button type="button" onClick={handleClickBack}>
          Back
        </button>
      </div>

      <style jsx>
        {`
          .content {
            position: fixed;
            left: 200px;
            top: 67px;
            margin-left: 25px;
          }
        `}
      </style>
    </SideBar>
  );
};

interface UserNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

User.getInitialProps = async ({ query, req }: NextPageContext) => {
  if (!req) {
    return { user: null };
  }
  const responce = await fetch(`http://localhost:3001/api/users/${query.id}`);
  const user: UserData = await responce.json();
  return { user };
};

export default User;
