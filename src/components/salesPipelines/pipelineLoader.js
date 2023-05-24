import ContentLoader from 'react-content-loader';

const PipelineLoader = () => (
  <ContentLoader
    width={900}
    height={90}
    viewBox="0 0 900 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    {/* <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" /> */}
    <rect x="42" y="77" rx="10" ry="10" width="900" height="217" />
  </ContentLoader>
);

export default PipelineLoader;
