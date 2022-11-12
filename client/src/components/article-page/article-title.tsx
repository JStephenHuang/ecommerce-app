import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";

interface ArticleTitleProperties {
  id: string;
  title: string;
}

const ArticleTitle = (props: ArticleTitleProperties) => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.seller;
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
  return (
    <div className="h-[3.5rem]">
      <div className="flex items-center justify-between">
        <p className="font-extrabold text-[24px] truncate">{props.title}</p>
      </div>
      <hr className="w-full bg-[#521945] h-[2px]" />
    </div>
  );
};

export default ArticleTitle;
