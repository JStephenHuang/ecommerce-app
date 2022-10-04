interface FeaturesProperties {
  index: number;
  message: string;
}

const Features = (props: FeaturesProperties) => {
  return (
    <div className="mx-2 mb-1 shadow-md snap-center block text-center m-auto ">
      <div
        id={`${props.index}`}
        className="w-[50rem] h-[25rem] bg-white text-black rounded-lg"
      >
        {props.message}
      </div>
    </div>
  );
};

export default Features;
