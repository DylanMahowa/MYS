import axios from "axios";
import { GET_POSTS, POST_ERROR, ADD_POST, DELETE_POST } from "./types";
import {setAlert} from "./alert";

//Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/log");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete posts
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/log/${id}`);
    dispatch({
      type: DELETE_POST,
      payload:id,
    });
    dispatch(setAlert('Activity Removed', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add posts
export const addPost = ({ walk, run, cycle, swim, horseRiding }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const body = JSON.stringify({
    walk: parseFloat(walk),
    run: parseFloat(run),
    cycle: parseFloat(cycle),
    swim: parseFloat(swim),
    horseRiding: parseFloat(horseRiding),
  });
  try {
    const res = await axios.post("/api/log", body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
   
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
