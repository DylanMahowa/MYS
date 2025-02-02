import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import DashboardMap from "./DashboardMap";
import { getPosts, deletePost, getPostTotals } from "../../actions/post";
import Card from "@material-ui/core/Card";
import Moment from "react-moment";
import { Button } from "@material-ui/core";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deletePost,
  getPosts,
  post: { logs, totals },
  getPostTotals,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getPostTotals();
  }, [getPostTotals]);


  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Welcome</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}{" "}
      </p>
      {profile !== null ? (
        <>
          <div
            style={{
              width: "inherit",
              height: "50vh",
              marginTop: "1%",
              marginBottom: "5%",
            }}
          >
         {totals.map((post) => (
              <DashboardMap key={post._id} post={post} />
            ))}
          </div>
          <br />
          <Card style={{ backgroundColor: "#d1cdcd", marginTop: "10%" }}>
            <table style={{ width: "100%" }}>
              <thead>
            <tr>
              <th>Walk</th>
              <th>Run</th>
              <th>Cycle</th>
              <th>Swim</th>
              <th>Horse Riding</th>
              <th>Date</th>
              <th>Remove?</th>
              </tr>
              </thead>
              <tbody>
              {logs.map((log) => (
                <tr>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {log.walk}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {log.run}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {log.cycle}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {log.swim}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {log.horseRiding}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <Moment format="DD/MM/YY">{log.date}</Moment>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <Button onClick={(e) => deletePost(log._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </Card>
          <br />
          <DashboardActions profile={profile} />
        </>
      ) : (
        <Fragment>
          <p>You have not viewed the tutorial please click the link below</p>
          <Link to="./tutorial" className="btn btn-primary my-1">
            View Tutorial
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  getPostTotals: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,

 
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getPosts,
  deletePost,
  getPostTotals
})(Dashboard);
