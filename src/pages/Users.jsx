import axios from "axios";

import React from "react";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { Pagination } from "@material-tailwind/react";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

const origin = "http://localhost:5000/v1";
// const origin = "https://jobify-duec.onrender.com/v1";
const Users = () => {
  const params = useLocation().search;
  const token =
    localStorage.getItem("accessToken") &&
    `Bearer ${localStorage.getItem("accessToken")}`;
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${origin}/admin/Users${params}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log({ response });
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, [params]);
  if (isLoading) {
    return (
      <h1 className="mt-40">
        <Loading />
      </h1>
    );
  }
  return (
    <>
      {!users.length > 0 ? (
        <h1>No Users</h1>
      ) : (
        <Table
          thead={[, "Name", "Email"]}
          data={users}
          col1={`${users.first_name} ${users.last_name}`}
          col2={users.email}
          page="Users"
          getData={getUsers}
          pagination={pagination}
        />
      )}
    </>
  );
};

export default Users;
