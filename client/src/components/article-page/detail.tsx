const Detail = (props: { label: string; value: string | number }) => {
  return (
    <div className="flex h-[30px] justify-between items-center font-light">
      <p className="">{props.label}:</p>
      <p className="opacity-50">{props.value}</p>
    </div>
  );
};

export default Detail;
