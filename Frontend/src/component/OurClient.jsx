import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, reset } from "../features/Clients/clientSlice.js";
import { Spin, Alert } from "antd";

function OurClient() {
    const dispatch = useDispatch();

    // Get the clients state from Redux store
    const { clients, isLoading, isError, message } = useSelector((state) => state.clients);

    useEffect(() => {
        dispatch(getClients());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    // console.log(clients)
    return (
        <div className="testi-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <div className="section-main-title testi">
                                <h2>Happy Clients</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="testi-list">
                    {isLoading ? (
                        <div className="loading-spinner">
                            <Spin size="large" />
                        </div>
                    ) : isError ? (
                        <div className="error-message">
                            <Alert message="Error" description={message} type="error" showIcon />
                        </div>
                    ) : (
                        clients.map((client) => (
                            <div
                                key={client._id}
                                className=" d-flex justify-content-center"
                            >
                                <div className="testi-itmes-box">
                                    <div className="testi-items">
                                        <div className="testi-thumb">
                                            <img
                                                src={client.imageUrl}
                                                alt={client.name}
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="testi-content">
                                        <p>{client.description}</p>
                                    </div>
                                    <div className="testi-title">
                                        <h4>{client.name}</h4>
                                        <span>{client.designation}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default OurClient;
