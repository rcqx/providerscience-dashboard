import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Pipeline from '../pipeline';
import PipelineLoader from './pipelineLoader';
import CardLoader from '../cardLoader';

const SalesPipelines = () => {
  const [stages, setStages] = useState([]);
  const transitionOpacity = classNames(
    'flex flex-wrap rounded-lg lg:gap-3 md:justify-center lg:flex-nowrap',
  );

  useEffect(() => {
    if (stages.length === 0) {
      axios
        .get(
          'https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8',
        )
        .then((res) => {
          setStages(res.data.stages);
        });
    }
  }, [stages]);

  return (
    <section className="min-w-[300px] mb-2 mt-4">
      <h1 className="text-start text-[#4CBEEB] text-xl lg:text-2xl font-bold mb-1 tracking-tight">
        Sales Pipelines
      </h1>
      <div className="flex flex-col">
        {stages.length === 0 ? (
          <>
            <div className="lg:hidden border border-slate-200 flex justify-center items-center shadow-md rounded-lg">
              <CardLoader />
            </div>
            <div className="flex gap-3">
              <div className="flex-wrap rounded-lg gap-1 md:justify-center lg:flex-nowrap lg:border border-slate-200 lg:shadow-md w-full h-20 hidden lg:flex">
                <PipelineLoader />
                <PipelineLoader />
                <PipelineLoader />
                <PipelineLoader />
              </div>
              {/* <div className="flex-wrap rounded-lg gap-1 md:justify-center lg:flex-nowrap lg:border border-slate-200 lg:shadow-md w-1/3 h-28 hidden lg:flex">
                <PipelineLoader />
                <PipelineLoader />
              </div> */}
            </div>
          </>
        ) : (
          <div className={transitionOpacity}>
            <div className="flex lg:border lg:border-slate-200 lg:rounded-lg lg:shadow-md lg:w-full flex-wrap w-full justify-between gap-1">
              {stages.slice(1, stages.length - 1).map((item) => (
                <Pipeline
                  key={item.id + item.name}
                  title={item.name}
                  position={item.total_deals}
                  revenue={item.total_value.toLocaleString()}
                />
              ))}
            </div>
            {/* <div className="flex lg:border lg:border-slate-200 lg:rounded-lg lg:shadow-md lg:w-1/3 flex-wrap w-full justify-between gap-1 mt-1 lg:mt-0">
              <Pipeline
                key={stages[5].id + stages[5].name}
                title={stages[5].name}
                position={stages[5].total_deals}
                revenue={stages[5].total_value.toLocaleString()}
              />
              <Pipeline
                key="pending1"
                title="Closed Deals"
                position={5}
                revenue="93,000"
              />
            </div> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default SalesPipelines;
