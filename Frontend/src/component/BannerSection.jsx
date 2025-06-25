import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContact,
  resetStatus,
} from "../features/Contact & Subscription/c&sSlice.js";
import { notification } from "antd";

function BannerSection() {
  const dispatch = useDispatch();
  const { contactStatus, loading, error } = useSelector(
    (state) => state.contact
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      placement: "top",
      duration: 2,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContact(formData));
  };

  React.useEffect(() => {
    if (contactStatus) {
      openNotification("success", contactStatus);
      dispatch(resetStatus());
      setFormData({ name: "", email: "", mobile: "", city: "" }); // Clear form
    }
    if (error) {
      openNotification("error", error);
      dispatch(resetStatus());
    }
  }, [contactStatus, error, dispatch]);

  return (
    <>
      <section className="banner-section">
        <div className="banner-carousel owl-carousel">
          <div className="slide-item one">
            <div className="image-layer"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="slider-content">
                    <div className="slider-sub-title">
                      <h1>Consultation, Design & Marketing</h1>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="banner-consultant-box">
                    <div className="banner-consultant-box-title">
                      <h4>Get a Free Consultant</h4>
                    </div>
                    <div className="consultant-contents">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="city"
                            placeholder="Area, City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group mb-0">
                          <button
                            className="consultant-button"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="spinner">Submitting...</span>
                            ) : (
                              "Get quick Consultant"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
