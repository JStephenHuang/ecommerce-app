import { Link } from "react-router-dom";
import { useUser } from "../../../contexts/user-context";
import {
  useFirebaseAuth,
  useFirebaseAuthUser,
} from "../../../contexts/firebase-app-context";

const ProfilePic = () => {
  const userContext = useUser();
  const user = useFirebaseAuthUser();
  const auth = useFirebaseAuth();

  if (user) {
    return (
      <div>
        <Link
          className="h-[30px] w-[30px] rounded-full bg-black"
          to={`/${userContext.seller}`}
        ></Link>
        <button
          className="px-[16px] py-[4px]  border-2 border-black bg-black rounded-sm text-white hover:opacity-50"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </div>
    );
  } else if (!user) {
    return (
      <div className="flex items-center">
        <Link
          className="px-3 py-1  border-2 border-black rounded-sm bg-black text-white hover:opacity-70"
          to="/login"
        >
          Login
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default ProfilePic;
