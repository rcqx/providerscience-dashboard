import DemoCard from './demoCard';
import CardLoader from '../cardLoader';

const BookedDemos = ({ allDemos, request, fetchingData }) => {
  const demos = allDemos
    .slice(0, 6)
    .sort((a, b) => b.total_deals - a.total_deals)
    .sort((a, b) => {
      if (a.total_deals === b.total_deals) {
        return b.made_calls - a.made_calls;
      }
      return 0;
    });

  return (
    <div className="flex-1 xl:mb-0 xl:h-[85%]">
      <h1 className="text-start text-[#4CBEEB] text-xl lg:text-2xl font-bold mb-2 mt-2 tracking-tight">
        Booked Demos
      </h1>
      <div className="border border-slate-200 flex py-1 rounded-t-lg">
        <h1 className="font-bold text-slate-700 md:w-[15%] w-[25%]">Rank</h1>
        <h1 className="font-bold text-slate-700 md:w-[20%] w-[25%]">Name</h1>
        <h1 className="font-bold text-slate-700 flex-1 lg:pl-2">Goal</h1>
        <h1 className="font-bold flex-1 text-slate-700 lg:text-end lg:pr-6">
          Demos
        </h1>
      </div>
      <div className="flex flex-col justify-end w-full h-full border-x rounded-b-lg shadow-md">
        {request !== true && allDemos.length === 0 && !fetchingData && (
          <div className="h-full flex justify-center items-center">
            <CardLoader />
          </div>
        )}

        {fetchingData && (
          <div className="h-full flex justify-center items-center">
            <CardLoader />
          </div>
        )}

        {demos.length >= 3 && demos[0].total_deals !== 0 && !fetchingData &&
          demos.map((demo, index) => (
            <DemoCard
              key={demo.id}
              name={demo.name}
              profilePicture={demo.photo_url}
              number={index + 1}
              demos={demo.total_deals}
              madeCalls={demo.made_calls}
              percentage={Math.floor(
                (demo.total_deals * 100) /
                (demo.goals.generated_demo.length > 0
                  ? demo.goals.generated_demo[
                    demo.goals.generated_demo.length - 1
                  ].goal
                  : 5),
              )}
              goal={
                demo.goals.generated_demo.length
                  ? demo.goals.generated_demo[
                    demo.goals.generated_demo.length - 1
                  ].goal
                  : 5
              }
              isCircular={demo.goals.generated_demo.length > 0
                ? demo.goals.generated_demo[
                  demo.goals.generated_demo.length - 1
                ].is_circular : false}
            />
          ))}

        {demos.length !== 0 && demos[0].total_deals === 0 && request === true && !fetchingData && (
          <div className="flex justify-center items-center h-52 xl:h-full">
            <h1 className="text-slate-600 text-2xl italic">
              No Booked Demos 😿
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedDemos;
