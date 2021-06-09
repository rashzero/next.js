import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserData } from '../interfaces/user';
import { NextPageContext } from 'next';
import { SideBar } from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UsersButtonBlock from '../components/UsersButtonBlock';
interface UserDataProps {
  usersData: UserData[]
}

const Users = ({ usersData }: UserDataProps) => {  
  const [users, setUsers] = useState<UserData[]>(usersData);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  useEffect((): void => {
    const load = async () => {
      const responce = await fetch("http://localhost:3001/api/users");
      if (!responce) {
        alert("Warning");
      }
      const usersData = await responce.json();
      setUsers(usersData);
    };

    if (!users.length) {
      load();
    }
  }, []);

  const handleChangeName = (name: string) => {
    setName(name);
  };

  const handleDeleteUser = async (id: number) => {
    const responce = await fetch("http://localhost:3001/api/users", {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    });
    const usersData = await responce.json();
    setUsers(usersData);
  }

  const handleClickSave = async () => {
    const responce = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name})
    });
    const usersData = await responce.json();
    setUsers(usersData);
  }

  const handleAddUser = async () => {
    setAddUser(true);
  };

  const handleClickCancel = () => {
    setAddUser(false);
  };

  return (
    <SideBar>
      <div className="title">
        <h1>Users</h1>
      </div>
      <div className="list">
        <ul>
          {users?.map((user, index: number) => (
            <li
              key={user?.id}
              style={{
                backgroundColor: ((index + 1) % 2 ? "#b2b2b2" : "#b1a3b5"),
                padding: 5,
                fontSize: 20,
              }}
            >
              <Grid container>
                <Grid item xs={11}>
                  <Link href={"user/[id]"} as={`/user/${user?.id}`}>
                    <a>{user?.name}</a>
                  </Link>
                </Grid>
                <Grid item xs={1}>
                  <HighlightOffIcon className="button--delete" type="button" onClick={() => handleDeleteUser(+user.id)}/>
                </Grid>
              </Grid>
            </li>
          ))}
        </ul>
      </div>
      <div className="action_content">
        {!addUser ? (
          <div>
            <Button 
              variant="contained" 
              color="primary" 
              type="button" 
              onClick={handleAddUser}
              size="small"
            >
              add user
            </Button>
          </div>
        ) : (
          <UsersButtonBlock 
            handleChangeName={handleChangeName}
            addUser={addUser}
            handleClickSave={handleClickSave}
            handleClickCancel={handleClickCancel}
            name={name}
          />
        )}
      </div>
      <style jsx>
        {`
          .title {
            text-align: center;
            color: orange;
          }
          
          .list {
            margin: auto;
            max-width: 400px;
            padding: 10px;
            border: solid 2px;
            border-color: blue;
            border-radius: 10px;
          }

          .action_content {
            text-align: center;
            margin: 15px 0;
          }

          ul {
            padding: 20px 0;
            margin: 0px;
          }

          li {
            list-style: none;
          }

          a {
            text-decoration: none;
          }

        `}
      </style>
    </SideBar>
  );
};

Users.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { usersData: [] };
  }
  const responce = await fetch("http://localhost:3001/api/users");
  const usersData: UserData[] = await responce.json();
  return { usersData };
};

export default Users;
