import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../features/Projects/projectSlice.js";

function Projects() {
    const dispatch = useDispatch();

    // Get projects, loading, and error state from Redux
    const { projects, loading, error } = useSelector((state) => state.projects);

    useEffect(() => {
        // Dispatch fetchProjects action when the component mounts
        dispatch(fetchProjects());
    }, [dispatch]);

    return (
        <>
            <div className="project-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <div className="section-main-title">
                                    <h2>Our Projects</h2>
                                </div>
                                <div className="section-main-title">
                                    <h5>We know buyers are looking for and suggested to picking that will bring clients top dollar for the sale of their homes</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="project_list">
                            {loading && <p>Loading projects...</p>}
                            {error && <p className="text-danger">{error}</p>}
                            {!loading && !error && projects.length === 0 && <p>No projects found.</p>}
                            {!loading &&
                                !error &&
                                projects.map((project) => (
                                    <div className="col my-3" key={project._id}>
                                        <div className="project-single-box">
                                            <div className="project-thumb">
                                                <img src={project.imageUrl} alt={project.name} />
                                            </div>
                                            <div className="project-content">
                                                <div className="project-titile">
                                                    <h4><a href="#">{project.name}</a></h4>
                                                </div>
                                                <div className="project-discription">
                                                    <p>{project.description}</p>
                                                </div>
                                                <div className="project-btn">
                                                    <a href="#">Learn More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Projects;
