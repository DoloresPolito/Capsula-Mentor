import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

export const setUser = createAction("SET_USER");

export const signUpUser = createAsyncThunk("SIGNUPUSER", async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/auth/register",
      body
    );
    let data = response.data;

    if (!data.succes) {
      swal("Oops... Something went wrong!", "User allready exist", "error");
    } else {
      swal(
        "Congratulations!",
        "Your account has been successfully created ",
        "success"
      );
    }

    return data;
  } catch (error) {
    return;
  }
});

export const effectLogin = createAsyncThunk("PERSISTENCIA", async (body) => {
  try {
    const response = await fetch("http://localhost:5001/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status === 400) {
      swal(
        "Oops! Something went wrong!",
        "You have entered an invalid username or password",
        "error"
      );

      return;
    }

    if (response.status === 401) {
      swal(
        "Oops... Something went wrong!",
        "Please create an account first or verify you email",
        "error"
      );
      return;
    }

    const data = await response.json();

    localStorage.setItem("email", data.user.email);
    localStorage.setItem("userName", data.user.userName);
    localStorage.setItem("_id", data.user._id);
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    swal("Oops... Something went wrong!", "Please try again", "error");
  }
});

export const updateUser = createAsyncThunk("UPDATE_USER", async (body, res) => {
  const response = await fetch("http://localhost:5001/auth/completeRegister", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    swal("Oops! ", "Something went wrong.", "error");
    return;
  }

  swal("Congratulations!", "Your account has been UPDATED!", "success");
  // res.redirect("http://localhost:3000/profile");

  return await response.json();
});

export const getUserMail = createAsyncThunk("GET_USER", async (email) => {
  try {
    const user = await axios.get(`http://localhost:5001/user/me/${email}`);
    let data = user.data;
    return data;
  } catch {
    console.log("Error");
  }
});

const userReducer = createReducer(
  {},
  {
    [setUser]: (state, action) => action.payload,
    [getUserMail.fulfilled]: (state, action) => action.payload,
    [signUpUser.fulfilled]: (state, action) => action.payload,
    [effectLogin.fulfilled]: (state, action) => action.payload,
    [updateUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
