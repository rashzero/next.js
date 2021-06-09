import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { UserData } from '../../interfaces/user';
import { SideBar } from '../../components/SideBar';
import Button from '@material-ui/core/Button';
import CircularIndeterminate from '../../components/Loader';
import BackspaceIcon from '@material-ui/icons/Backspace';
interface UserPageProps {
  user: UserData
}

const User = ({ user: serverUser }: UserPageProps) => {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);

  const handleClickBack = (): void => {
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
    return <CircularIndeterminate />;
  }
  return (
    <SideBar>
      <div className="content">
        <Button variant="contained" color="primary" type="button" onClick={handleClickBack}>
          <BackspaceIcon />
        </Button>

        <h1>{user?.name}</h1>

      </div>

      <style jsx>
        {`
          .content {
            margin-left: 25px;
            padding-top: 25px;
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
