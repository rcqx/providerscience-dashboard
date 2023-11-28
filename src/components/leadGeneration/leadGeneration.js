import LeadCard from './leadCard';
import CardLoader from '../cardLoader';

const LeadGeneration = ({ allDeals, request, fetchingData }) => {
  const deals = allDeals
    .slice(0, 6)
    .sort((a, b) => b.total_deals - a.total_deals)
    .sort((a, b) => {
      if (a.total_deals === b.total_deals) {
        return b.leads_to_demos - a.leads_to_demos;
      }
      return 0;
    });

  return (
    <div className="flex-1 xl:mb-0 xl:h-[85%]">
      <h1 className="text-start text-[#4CBEEB] text-xl lg:text-2xl font-bold mb-2 mt-2 tracking-tight">
        Lead Generation
      </h1>
      <div className="border border-slate-200 flex py-1 rounded-t-lg">
        <h1 className="font-bold text-slate-700 md:w-[15%] w-[25%]">Rank</h1>
        <h1 className="font-bold text-slate-700 md:w-[20%] w-[25%]">Name</h1>
        <h1 className="font-bold text-slate-700 flex-1 lg:pl-2">Goal</h1>
        <h1 className="font-bold flex-1 text-slate-700 lg:text-end lg:pr-6">
          Leads
        </h1>
      </div>
      <div className="flex flex-col justify-end w-full h-full border-x rounded-b-lg shadow-md">
        {request !== true && allDeals.length === 0 && !fetchingData && (
          <div className="h-full flex justify-center items-center">
            <CardLoader />
          </div>
        )}

        {fetchingData && (
          <div className="h-full flex justify-center items-center">
            <CardLoader />
          </div>
        )}

        {deals.length >= 3 && deals[0].total_deals !== 0 && !fetchingData &&
          deals.map((deal, index) => (
            <LeadCard
              key={deal.id}
              index={index}
              name={deal.name}
              profilePicture={deal.photo_url}
              number={index + 1}
              deals={deal.total_deals}
              leadsToDemos={deal.leads_to_demos}
              percentage={Math.floor(
                (deal.total_deals * 100) /
                (deal.goals.generated_lead.length > 0
                  ? deal.goals.generated_lead[
                    deal.goals.generated_lead.length - 1
                  ].goal
                  : 2100),
              )}
              goal={
                deal.goals.generated_lead.length
                  ? deal.goals.generated_lead[
                    deal.goals.generated_lead.length - 1
                  ].goal
                  : 2100
              }
              isCircular={deal.goals.generated_lead.length > 0
                ? deal.goals.generated_lead[
                  deal.goals.generated_lead.length - 1
                ].is_circular : false}
              allDeals={allDeals}
            />
          ))}

        {deals.length !== 0 && deals[0].total_deals === 0 && request === true && !fetchingData && (
          <div className="flex justify-center items-center h-52 xl:h-full">
            <h1 className="text-slate-600 text-2xl italic">
              No deals generated 🤝
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadGeneration;
