import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const UserRating = (props: { rating: number }) => {
  const stars: JSX.Element[] = [];

  for (let i = 0; i < props.rating; i++) {
    stars.push(<AiFillStar />);
  }
  for (let i = 0; i < 5 - props.rating; i++) {
    stars.push(<AiOutlineStar />);
  }
  console.log(stars);

  return (
    <div className="flex items-center text-[16px]">
      {stars}
      <p className="ml-2 hover:underline font-normal">(0)</p>
    </div>
  );
};

export default UserRating;
