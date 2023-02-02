import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAPIClient } from "../../hooks/api-client";
import { IUser } from "../../types/user";
import { useFirebaseAuthUser } from "../../contexts/firebase-app-context";

import Navbar from "../../components/product-page/navbar/navbar";
import ProfileInfo from "../../components/users-page/profile-info";
import LoadingStatus from "../../components/status/loading";
import ErrorStatus from "../../components/status/error";

const ProfilePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const [profile, setProfile] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (user === null) navigate("/login");
    if (user !== undefined) {
      getUserByUsernameHandler();
    }
  }, [user]);

  const getUserByUsernameHandler = async () => {
    setLoading(true);
    const res = await client.get(`/user/${params.username}`).catch((err) => {
      if (err.response.status === 400) {
        setError(true);
      }
    });

    if (res) setProfile(res.data);
    setLoading(false);
  };

  if (loading || user === undefined) return <LoadingStatus />;
  if (error || profile === undefined) return <ErrorStatus />;

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      {/* <button
        className="m-10 absolute group flex items-center hover:-translate-x-2 transition-all"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackCircle className="mr-2" size={30} />
        Back
      </button> */}
      <ProfileInfo user={profile} />
    </div>
  );
};
export default ProfilePage;
