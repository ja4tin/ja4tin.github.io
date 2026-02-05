import { SLIDE_IDS, SLIDE_POSITIONS } from '../../constants/slideIds';

const OverviewSlide = () => {
  return (
    <div
      id={SLIDE_IDS.OVERVIEW}
      className="step"
      data-x={SLIDE_POSITIONS.OVERVIEW.x}
      data-y={SLIDE_POSITIONS.OVERVIEW.y}
      data-z={SLIDE_POSITIONS.OVERVIEW.z}
      data-scale={SLIDE_POSITIONS.OVERVIEW.scale}
    ></div>
  );
};

export default OverviewSlide;
