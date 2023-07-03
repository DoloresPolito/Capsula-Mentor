import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMenteesUsers = createAsyncThunk(
  "GET_MENTEES_USERS",
  async () => {
    try {
      const menteesUsers = await axios.get(
        `https://the-perfect-mentor-backend.vercel.app/user/users/mentees`
      );

      return menteesUsers.data;
    } catch {
      console.log("Error");
    }
  }
);

const menteesUsersReducer = createReducer([], {
  [getMenteesUsers.fulfilled]: (state, action) => action.payload,
});

export default menteesUsersReducer;