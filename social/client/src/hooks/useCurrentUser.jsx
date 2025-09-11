
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../apiCalls/authCalls";
import { setUserData } from "../redux/userSlice";

function useCurrentUser() {
  const dispatch = useDispatch();

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getCurrentUser();
        console.log("Current User:", result);
        dispatch(setUserData(result));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
}

export default useCurrentUser;

