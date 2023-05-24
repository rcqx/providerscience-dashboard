import CallCard from './callCard';
import CardLoader from '../cardLoader';

const DiscoveredCalls = ({ allCalls, request }) => {
  const calls = allCalls
    .slice(0, 6)
    .sort((a, b) => b.total_deals - a.total_deals);

  return (
    <div className="flex-1 xl:mb-0 xl:h-[85%]">
      <h1 className="text-start text-[#4CBEEB] text-xl lg:text-2xl font-bold mb-2 mt-2 tracking-tight">
        Discover Calls
      </h1>
      <div className="border border-slate-200 flex py-1 rounded-t-lg">
        <h1 className="font-bold text-slate-700 md:w-[15%] w-[25%]">Rank</h1>
        <h1 className="font-bold text-slate-700 md:w-[20%] w-[25%]">Name</h1>
        <h1 className="font-bold text-slate-700 flex-1 lg:pl-2">Goal</h1>
        <h1 className="font-bold flex-1 text-slate-700 lg:text-end lg:pr-6">
          DiscoveryCalls
        </h1>
      </div>
      <div className="flex flex-col justify-end w-full h-full border-x rounded-b-lg shadow-md">
        {request !== true && (
          <div className="h-full flex justify-center items-center">
            <CardLoader />
          </div>
        )}

        {calls.length >= 3 && calls[0].total_deals !== 0 &&
          calls.map((call, index) => (
            <CallCard
              key={call.id}
              name={call.name}
              profilePicture={call.photo_url}
              number={index + 1}
              percentage={Math.floor(
                (call.total_deals * 100) /
                (call.goals.generated_discovery.length > 0
                  ? call.goals.generated_discovery[
                    call.goals.generated_discovery.length - 1
                  ].goal
                  : 10),
              )}
              calls={call.total_deals}
              goal={
                call.goals.generated_discovery.length
                  ? call.goals.generated_discovery[
                    call.goals.generated_discovery.length - 1
                  ].goal
                  : 10
              }
              isCircular={call.goals.generated_discovery.length > 0
                ? call.goals.generated_discovery[
                  call.goals.generated_discovery.length - 1
                ].is_circular : false}
            />
          ))}

        {calls.length !== 0 && calls[0].total_deals === 0 && request === true && (
          <div className="flex justify-center items-center h-52 xl:h-full">
            <h1 className="text-slate-600 text-2xl italic">
              No Calls Generated 📞
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveredCalls;
