import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  removeProject,
} from "../features/Projects/projectSlice.js";

const { Meta } = Card;

export const ViewProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  const [deletingProject, setDeletingProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = async (id) => {
    setDeletingProject(id);
    try {
      await dispatch(removeProject(id));
      message.success("Project deleted successfully!");
      window.location.reload();
    } catch (err) {
      message.error("Failed to delete project. Please try again.");
    } finally {
      setDeletingProject(null);
    }
  };

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
          Loading Projects...
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
          Failed to load projects. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", background: "#1a1a1a" }}>
      <h2
        style={{
          color: "#00ffcc",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
          textShadow: "0 0 5px rgba(0, 255, 204, 0.5)",
        }}
      >
        Projects
      </h2>
      <Row gutter={[16, 16]} justify="space-around">
        {projects.map((project) => (
          <Col key={project._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={project.name}
                  src={project.imageUrl}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              }
              actions={[
                <Button
                  type="danger"
                  loading={deletingProject === project._id}
                  onClick={() => handleDelete(project._id)}
                  style={{
                    background: "linear-gradient(135deg, #ff00ff, #b300b3)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    transition: "background 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 0 8px rgba(255, 0, 255, 0.5)",
                  }}
                >
                  {deletingProject === project._id ? "Deleting..." : "Delete"}
                </Button>,
              ]}
              style={{
                background: "#2c2c2c",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0, 255, 204, 0.3)",
                transition: "transform 0.3s ease",
              }}
              bodyStyle={{ padding: "16px" }}
            >
              <Meta
                title={
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#00ffcc",
                      textShadow: "0 0 5px rgba(0, 255, 204, 0.5)",
                    }}
                  >
                    {project.name}
                  </span>
                }
                description={
                  <span style={{ color: "#b0b0b0", fontSize: "14px" }}>
                    {project.description.length > 100
                      ? project.description.substring(0, 100) + "..."
                      : project.description}
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewProjects;
