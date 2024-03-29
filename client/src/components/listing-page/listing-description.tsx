const ListingDescription = (props: { description: string }) => {
  return (
    <div className="flex flex-col">
      <div className="my-5" />
      <div className="font-light whitespace-pre-line">{props.description}</div>
    </div>
  );
};

export default ListingDescription;
