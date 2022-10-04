import Features from "./features";

const Slider = () => {
  const features = ["1", "2", "3", "4", "5"];

  const frontEndFeatures: JSX.Element[] = [];
  const featuresLinks: JSX.Element[] = [];
  for (let i = 0; i < features.length; i++) {
    frontEndFeatures.push(<Features key={i} index={i} message={features[i]} />);
  }

  return (
    <div className="w-[80%]">
      <div className="flex w-full my-5 overflow-x-auto snap-mandatory snap-x scroll-smooth">
        {frontEndFeatures}
      </div>
    </div>
  );
};

export default Slider;
