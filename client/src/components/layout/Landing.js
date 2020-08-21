import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Map from "../map/Map";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div style={{ position: "relative" }}>
            <Map />
          </div>
          <h1 className="x-large">Mind your step: step tracker</h1>
          <div style={{ display: "inline-block" }}>
            {" "}
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/MindYourStepUK">
              <i className="fab fa-facebook-square fa-5x"></i>
            </a>
          </div>
          <p className="lead">
            Track your runs, swim and bike rides, and compete for badges
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
