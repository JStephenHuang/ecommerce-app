interface ArticleTitleProperties {
  title: string | undefined;
}

const ArticleTitle = (props: ArticleTitleProperties) => {
  return (
    <div className="h-[10%]">
      <p className="font-bold text-[20px]">{props.title}</p>
      <hr className="w-full bg-[#521945] h-[2px]" />
    </div>
  );
};

export default ArticleTitle;
