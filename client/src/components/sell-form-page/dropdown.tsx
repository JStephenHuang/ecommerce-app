interface DropDownProperties {
  data: { value: string; products: number | null }[];
  setData: (argument: string | number) => void;
}

const DropDown = (props: DropDownProperties) => {
  const frontEndData: JSX.Element[] = props.data.map((data, key) => {
    return (
      <button
        className="w-full p-2 text-[16px] hover:bg-[#d795b0] hover:text-[#912F56]"
        onClick={() => props.setData(data.value)}
      >
        {data.value}
      </button>
    );
  });

  return (
    <ul className="absolute border w-[30%] border-[#912F56] rounded-md bg-white">
      {frontEndData}
    </ul>
  );
};

export default DropDown;
