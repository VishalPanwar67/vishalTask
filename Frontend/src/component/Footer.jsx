import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe, resetStatus } from "../features/Contact & Subscription/c&sSlice.js";
import { notification } from "antd";

function Footer() {
    const dispatch = useDispatch();
    const { subscriptionStatus, loading, error } = useSelector((state) => state.contact);

    const [email, setEmail] = useState("");

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            placement: "top",
            duration: 2,
        });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        dispatch(subscribe(email));
        setEmail("");
    };

    React.useEffect(() => {
        if (subscriptionStatus) {
            openNotification("success", subscriptionStatus);
            dispatch(resetStatus());
        }
        if (error) {
            openNotification("error", error);
            dispatch(resetStatus());
        }
    }, [subscriptionStatus, error, dispatch]);

    return (
        <>
            <div className="add-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 add-section">
                            <div className="section-title text-center">
                                <div className="section-main-title">
                                    <h3>Learn more about our listing process, as well as our additional staging and
                                        design work.</h3>
                                </div>
                            </div>
                            <div className="common-btn">
                                <a href="#">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-container">
                <ul className="footer-menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Testimonials</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div className="subscribe-container">
                    <span className="subscribe-label">Subscribe Us</span>
                    <form className="subscribe-form" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading} // Disable input during loading
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? (
                                <div className="loading-spinner">
                                    <span className="spinner"></span>
                                    Subscribing...
                                </div>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <div className="end-footer-container">
                <div className="copyright">
                    © All Rights Reserved 2023
                </div>
                <a href="#" className="footer-logo">
                    <img src="/assets/images/logo%201.svg" alt="Logo" />
                </a>
                <div className="social-icons">
                    <a href="#"><img src="/assets/icons/Linkedin.svg" alt="LinkedIn" /></a>
                    <a href="#"><img src="/assets/icons/Group.svg" alt="Group" /></a>
                    <a href="#"><img src="/assets/icons/Group-1.svg" alt="Group-1" /></a>
                    <a href="#"><img src="/assets/icons/Frame.svg" alt="Frame" /></a>
                </div>
            </div>
        </>
    );
}

export default Footer;
