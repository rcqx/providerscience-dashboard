import { CgProfile } from 'react-icons/cg';
import { Circle } from 'rc-progress';

const DemoCard = ({
  name,
  number,
  profilePicture,
  demos,
  percentage,
  madeCalls,
  goal,
  isCircular,
}) => (
  <div className="flex border-b border-slate-200 border-b-l border-b-r shadow-sm rounded-lg flex-1 py-2 xl:py-0 hover:scale-[103%] hover:border hover:border-slate-200 ease-out duration-300 cursor-pointer hover:bg-white">
    <div className="md:w-[15%] w-[25%]  flex justify-center items-center text-5xl font-bold text-slate-500 lg:text-5xl">
      {number}
    </div>
    <div className="md:w-[20%] w-[25%] flex flex-col justify-center items-center">
      {profilePicture !== null ? (
        <>
          <img
            data-testid="profile-picture"
            src={profilePicture}
            alt="profile-pic"
            className="rounded-full border border-slate-300 h-[3em]"
          />
          <h1 className="text-slate-700 font-bold text-sm">
            {name.split(' ')[0]}
          </h1>
        </>
      ) : (
        <>
          <CgProfile size={50} data-testid="default-profile-picture" />
          <h1 className="text-slate-600 font-bold text-sm">
            {name.split(' ')[0]}
          </h1>
        </>
      )}
    </div>
    <div className="flex-1 flex justify-center items-center">
      {isCircular ? (
        <>
          <div className="relative">
            <Circle
              percent={percentage > 100 ? 100 : percentage}
              strokeWidth={8}
              strokeColor="#4CBEEB"
              className="h-[70px] md:block hidden"
              trailWidth={8}
            />
            <div>
              <h1 className="absolute top-9 left-6 font-bold text-slate-700 hidden md:block">
                {percentage > 100 ? 100 : percentage}%
              </h1>
              <h1 className=" md:flex flex-col items-center absolute bottom-8 marker:text-slate-600 hidden text-start w-full">
                {goal}
              </h1>
            </div>
          </div>
          <h1 className="text-3xl font-bold md:hidden">{percentage}%</h1>
        </>
      ) : (
        <div data-testid="progress-bar-regular" className="flex-1 flex justify-center items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300 hidden md:block md:w-[90%]">
            <div
              className="bg-[#4CBEEB] h-2.5 rounded-full"
              style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
            />
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">{percentage}%</span>
              <span className="text-sm text-slate-500">
                {goal}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold md:hidden">{percentage}%</h1>
        </div>
      )}
    </div>
    <div className="flex-1 flex flex-col justify-center pr-1 md:pr-0">
      <h1 className="md:text-base lg:text-xl xl:text-base text-slate-600 font-bold line leading-tight hidden md:block lg:text-end lg:pr-[5%] xl:pr-[10%]">
        {`${demos} Booked Demos`}
      </h1>
      <h1 className="text-2xl font-bold md:hidden">{demos}</h1>
      <h2 className="text-slate-700 text-xs md:text-sm lg:text-end lg:pr-[5%] xl:pr-[10%]">
        {`${madeCalls} Calls Made`}
      </h2>
    </div>
  </div>
);

export default DemoCard;
