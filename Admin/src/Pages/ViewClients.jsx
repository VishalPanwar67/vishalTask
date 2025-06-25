import React, { useEffect } from "react";
import { Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getClients, deleteClient } from "../features/Clients/clientSlice";

export const ViewClients = () => {
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getClients())
      .unwrap()
      .catch((error) => message.error(`Failed to fetch clients: ${error}`));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteClient(id))
      .unwrap()
      .then(() => {
        message.success("Client deleted successfully!");
        dispatch(getClients());
      })
      .catch((error) => message.error(`Failed to delete client: ${error}`));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Client Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #00ffcc",
            boxShadow: "0 0 8px rgba(0, 255, 204, 0.5)",
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <a
          onClick={() => handleDelete(record._id)}
          style={{
            color: "#ff00ff",
            cursor: "pointer",
            fontWeight: 600,
            transition: "color 0.3s ease, text-shadow 0.3s ease",
            textShadow: "0 0 5px rgba(255, 0, 255, 0.5)",
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "16px",
        background: "#1a1a1a",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 255, 204, 0.3)",
      }}
    >
      <h2
        style={{
          color: "#00ffcc",
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "20px",
          textShadow: "0 0 5px rgba(0, 255, 204, 0.5)",
        }}
      >
        Client List
      </h2>
      <Table
        dataSource={clients}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        style={{ background: "#2c2c2c", borderRadius: "8px" }}
        rowStyle={{ background: "#2c2c2c", color: "#e0e0e0" }}
      />
    </div>
  );
};


export default ViewClients;
