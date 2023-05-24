import LeadCard from '../leadCard';

const CardContainer = () => (
  <div className="flex flex-col justify-end w-full h-full border-x rounded-b-lg shadow-md">
    <LeadCard name="Pedro" number={1} percentage={90} />
    <LeadCard name="Maya" number={2} percentage={75} />
    <LeadCard name="John" number={3} percentage={65} />
  </div>
);

export default CardContainer;
