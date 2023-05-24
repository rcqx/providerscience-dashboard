const Pipeline = ({ title, position, revenue }) => (
  <div className="flex lg:justify-center w-full md:w-[49.5%] lg:flex-1 lg:flex-col rounded-lg border border-slate-200 lg:py-3 lg:shadow-none shadow-md items-center px-4 py-2 lg:border-0">
    <h2 className="text-slate-500 w-1/2 lg:w-full text-sm lg:text-center text-start xl:text-lg">
      {title}
    </h2>
    <h1 className="font-bold text-xl lg:text-lg xl:text-2xl text-slate-700 w-1/2 lg:w-full text-end lg:text-center">
      {position} | ${revenue}
    </h1>
  </div>
);

export default Pipeline;
