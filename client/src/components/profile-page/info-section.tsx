interface InfoSectionProperties {
  name: string;
  value: string | number;
}

const InfoSection = (props: InfoSectionProperties) => {
  return (
    <div className="flex">
      <p className="w-[40%] font-bold">{props.name}:</p>
      <p className={"text-gray-500"}>{props.value}</p>
    </div>
  );
};
export default InfoSection;
