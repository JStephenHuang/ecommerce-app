interface ArticleDescriptionProperties {
  description: string;
}

const ArticleDescription = (props: ArticleDescriptionProperties) => {
  return (
    <div className="">
      <span className="font-bold">Description: </span>
      <span className="text-gray-500">{props.description}</span>
    </div>
  );
};

export default ArticleDescription;
