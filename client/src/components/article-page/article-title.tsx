import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAPIs } from "../../contexts/APIContext";
import { useUser } from "../../contexts/UserContext";

interface ArticleTitleProperties {
  id: string;
  title: string | undefined;
}

const ArticleTitle = (props: ArticleTitleProperties) => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.buyer;
  const [ownership, setOwnership] = useState<boolean>(false);
  useEffect(() => {
    APIContext.getUserListings(username).then((value) => {
      const userListings = value.data;
      const userListingsId = userListings.map((listings: any) => listings._id);
      console.log(userListingsId);
      console.log("----");

      if (userListingsId.includes(props.id)) {
        setOwnership(true);
      } else {
        setOwnership(false);
      }
    });
  }, []);
  const deleteListing = () => {
    APIContext.deleteListing(username, props.id)
      .then(() => {
        console.log("Listing Successfully Deleted");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="h-[10%]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[20px] truncate">{props.title}</p>
        {ownership ? (
          <FaTrash
            className="hover:text-red-600"
            onClick={deleteListing}
            size={16}
          />
        ) : null}
      </div>

      <hr className="w-full bg-[#521945] h-[2px]" />
    </div>
  );
};

export default ArticleTitle;
