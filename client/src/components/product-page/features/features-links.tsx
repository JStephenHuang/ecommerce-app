interface FeaturesLinksProperties {
  index: number;
  associatedPosition: number;
}

const FeaturesLinks = (props: FeaturesLinksProperties) => {
  if (props.index === props.associatedPosition) {
    return <div className="h-3 w-3 rounded-lg bg-black"></div>;
  } else return <div className="h-3 w-3 rounded-lg bg-white"></div>;
};

export default FeaturesLinks;
