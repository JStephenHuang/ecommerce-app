interface ArticleBubblesProperties {
  title: string;
  productType: string;
  seller: string;
  size: number;
  school: any;
  price: number;
}

const ArticleBubbles = (props: ArticleBubblesProperties) => {
  return (
    <div className="flex flex-col rounded-md bg-[#912F56] border border-[#912F56] text-white mx-2 mb-3">
      <div className="w-[16rem] h-[12rem] bg-white rounded-t-md"></div>
      <div className="w-[16rem] h-[6rem] p-3 flex flex-col justify-center">
        <div>
          <p className="">{props.title}</p>
        </div>

        <div>
          <p className="text-[#F7C4A5] text-[20px]">${props.price}</p>
        </div>

        <div>
          <p className="text-[#EF798A]">Seller: {props.seller}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleBubbles;
