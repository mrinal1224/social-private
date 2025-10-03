import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiPlusSquare, FiLogOut } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../apiCalls/authCalls";
import { clearUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

function NavDesign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logoutUser();
      dispatch(clearUserData());
      navigate('/signin');
    } catch (error) {
      console.error("Logout error:", error);
      alert(error);
    } finally {
      setIsLoggingOut(false);
      setShowMenu(false);
    }
  };

  return (
    <>
      <div
        className="
          w-[90%] lg:w-[40%] h-[70px] 
          bg-white rounded-full
          fixed bottom-5 left-1/2 -translate-x-1/2
          flex justify-around items-center
          shadow-[0_6px_20px_rgba(0,0,0,0.15)]
          px-4
          z-[100]
        "
      >
        {/* Icons */}
        <GoHomeFill 
          onClick={() => navigate('/home')}
          className="text-neutral-700 cursor-pointer w-[24px] h-[24px] hover:text-black" 
        />
        <FiSearch className="text-neutral-700 cursor-pointer w-[24px] h-[24px] hover:text-black" />
        <FiPlusSquare 
          onClick={() => navigate(`/upload`)} 
          className="text-neutral-700 cursor-pointer w-[24px] h-[24px] hover:text-black" 
        />
        <RxVideo className="text-neutral-700 cursor-pointer w-[26px] h-[26px] hover:text-black" />

        {/* Avatar with menu */}
        <div className="relative">
          <div 
            onClick={() => setShowMenu(!showMenu)} 
            className="w-[40px] h-[40px] rounded-full overflow-hidden border border-neutral-300 cursor-pointer"
          >
            <img src={userData?.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute bottom-[60px] right-0 w-[180px] bg-white rounded-lg shadow-lg border border-neutral-200 py-2">
              <button
                onClick={() => {
                  navigate(`/profile/${userData?.userName}`);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 flex items-center gap-2"
              >
                <span>Profile</span>
              </button>
              <button
                onClick={() => {
                  navigate('/editprofile');
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 flex items-center gap-2"
              >
                <span>Edit Profile</span>
              </button>
              <hr className="my-1 border-neutral-200" />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <ClipLoader size={14} color="#dc2626" />
                ) : (
                  <>
                    <FiLogOut />
                    <span>Log Out</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-[99]" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
}

export default NavDesign;