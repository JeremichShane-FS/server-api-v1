import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../API";
import { DASHBOARD } from "../../constants/path";
import "./Avatar.scss";

const Avatar = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const picture = await API.getProfilePicture();
      setProfilePicture(picture);
      setLoading(false);
    };

    fetchProfilePicture();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={DASHBOARD}>
      <img src={profilePicture} alt="Profile picture" className="avatar" />
    </Link>
  );
};

export default Avatar;
