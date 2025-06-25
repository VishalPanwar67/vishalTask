import React, { useEffect } from "react";
import { Table, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptions } from "../features/Contact & Subscription/c&sSlice.js";

export const Subscibe = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "#1a1a1a",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0, 255, 204, 0.3)",
        }}
      >
        <Spin size="large" />
        <p style={{ color: "#e0e0e0", marginTop: "10px" }}>
          Loading subscriptions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "#1a1a1a",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0, 255, 204, 0.3)",
        }}
      >
        <p
          style={{
            color: "#ff00ff",
            textShadow: "0 0 5px rgba(255, 0, 255, 0.5)",
          }}
        >
          Failed to load subscriptions. Please try again.
        </p>
      </div>
    );
  }

  const dataSource = subscriptions.map((subscription) => ({
    key: subscription._id,
    email: subscription.email,
  }));

  return (
    <div
      style={{
        padding: "20px",
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
        Subscriptions
      </h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ background: "#2c2c2c", borderRadius: "8px" }}
        rowStyle={{ background: "#2c2c2c", color: "#e0e0e0" }}
      />
    </div>
  );
};

export default Subscibe;
