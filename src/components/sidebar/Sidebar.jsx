import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./SidebarButton";
import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import apiClient from "../../spotify";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [image, setImage] = useState("https://avatar.iran.liara.run/public/21");

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("me")
      .then((response) => {
        if (response.data.images.length > 0) {
          setImage(response.data.images[0].url);
        }
      })
      .catch(() => {
        setImage("https://avatar.iran.liara.run/public/21");
      });
  }, []);

  return (
    <div className="sidebar-container">
      <img src={image} alt="User Profile" className="profile-image" />
      <div>
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
      </div>
      <SidebarButton
        title="Sign Out"
        to="/login"
        icon={<FaSignOutAlt />}
        onClick={() => {
          window.localStorage.removeItem("token");
          navigate("/login");
          console.log("Clicking the signout button");
        }}
      />
    </div>
  );
}

export default Sidebar;
