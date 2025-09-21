import React from "react";
import { getProfile } from "../apiCalls/authCalls";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../redux/userSlice";
import { useEffect } from "react";


function Profile() {
  const { userName } = useParams();
  console.log("From useParams:", userName);





  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.user);
  console.log("profileData:", profileData);

  const handleProfile = async (userName) => {
    try {
      const result = await getProfile(userName);

      dispatch(setProfileData(result));
     
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if(userName){
    handleProfile(userName);
    }

  }, [userName, dispatch]);

  return <div>
    <h1>{profileData ? profileData.name : "Loading..."}</h1>
  </div>;
}

export default Profile;
