import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserData } from '../interfaces/user';
import { NextPageContext } from 'next';
import { SideBar } from '../components/SideBar';

interface UserDataProps {
  usersData: UserData[]
}

const Users = ({ usersData }: UserDataProps) => {
  const [users, setUsers] = useState(usersData);
  const [addUser, setAddUser] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const load = async () => {
      const responce = await fetch("http://localhost:3001/api/users");
      const usersData = await responce.json();
      setUsers(usersData);
    };

    if (!users.length) {
      load();
    }
  }, []);

  const handleChangeName = (e: any) => {
    setName(e.target.value);
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
          {users?.map((user) => (
            <li key={user?.id}>
              <Link href={"user/[id]"} as={`/user/${user?.id}`}>
                <a>{user?.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="action_content">
        <div>
          <button type="button" onClick={handleAddUser}>add user</button>
        </div>
        {addUser && (
          <div>
            <p>
              Name
            </p>
            <p>
              <input 
                type="text"
                maxLength={60}
                value={name}
                onChange={e => handleChangeName(e)}
                placeholder="Enter name"
              />
            </p>
            <button type="button" onClick={handleClickSave}>
              Save
            </button>
            <button type="button" onClick={handleClickCancel} className="button--type2">
              Cancel
            </button>
          </div>
        )

        }
      </div>
      <style jsx>
        {`
          .title {
            text-align: center;
            color: orange;
          }
          
          .list {
            margin: auto;
            width: 400px;
            padding: 10px;
            border: solid 2px;
            border-color: blue;
            border-radius: 10px;
          }

          button: {
            background: red;
            border-radius: 10px;
            color: black;
            padding: 10px
          }

          .action_content {
            text-align: center;
            margin-top: 15px;
          }

          .button--type2 {
            margin-left: 15px;
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
