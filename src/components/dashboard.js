import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { MdAddCircleOutline } from 'react-icons/md';
import SalesPipelines from './salesPipelines/salesPipelines';
import LeadGeneration from './leadGeneration/leadGeneration';
import DiscoveredCalls from './discoveredCalls/discoveredCalls';
import { setStoredLeads, setStoredCalls, setStoredDemos } from '../redux/features/globalStoreSlice';
import BookedDemos from './bookedDemos/bookedDemos';
import Footer from './footer';
import Modal from './modal/modal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.globalStore.leads);
  const calls = useSelector((state) => state.globalStore.calls);
  const demos = useSelector((state) => state.globalStore.demos);
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState(null);
  const [fetchingData, setFetchingData] = useState(null);
  const [counter, setCounter] = useState(0);
  const dateRange = useSelector((state) => state.globalStore.dateRange);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1),
  ).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    if (!localStorage.getItem('dateRange')) {
      localStorage.setItem('dateRange', JSON.stringify({ startDate: yesterday, endDate: today }));
      axios
        .get(
          `https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8?startDate=${Object.keys(dateRange).length === 0
            ? yesterday
            : dateRange.startDate
          }&endDate=${Object.keys(dateRange).length === 0 ? today : dateRange.endDate
          }`,
        )
        .then((res) => {
          dispatch(setStoredLeads(res.data.generated_lead));
          dispatch(setStoredCalls(res.data.generated_discovery));
          dispatch(setStoredDemos(res.data.generated_demo));
          setRequest(true);
        });
    } else {
      const dateRange = JSON.parse(localStorage.getItem('dateRange'));
      axios
        .get(
          `https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        )
        .then((res) => {
          dispatch(setStoredLeads(res.data.generated_lead));
          dispatch(setStoredCalls(res.data.generated_discovery));
          dispatch(setStoredDemos(res.data.generated_demo));
          setRequest(true);
          setFetchingData(false);
        });
    }
  }, [dateRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter !== 0 && Object.keys(dateRange).length > 0) {
      console.log('Refetching data with this date =>', dateRange);
      axios
        .get(
          `https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        )
        .then((res) => {
          dispatch(setStoredLeads(res.data.generated_lead));
          dispatch(setStoredCalls(res.data.generated_discovery));
          dispatch(setStoredDemos(res.data.generated_demo));
          setRequest(true);
        });
    } else if (counter !== 0) {
      const dateRangeLocal = JSON.parse(localStorage.getItem('dateRange'));
      console.log('Refetching data with this date =>', dateRangeLocal);
      axios
        .get(
          `https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8?startDate=${dateRangeLocal.startDate}&endDate=${dateRangeLocal.endDate}`,
        )
        .then((res) => {
          dispatch(setStoredLeads(res.data.generated_lead));
          dispatch(setStoredCalls(res.data.generated_discovery));
          dispatch(setStoredDemos(res.data.generated_demo));
          setRequest(true);
        });
    }
  }, [counter, dateRange]);

  return (
    <div className="bg-white">
      <div
        className={`px-4 md:px-10 py-2 xl:h-screen relative ${show && 'blur-sm'
          }`}
      >
        <button
          className="px-2 md:px-5 py-2 text-sm rounded-md flex justify-center items-center gap-2 text-white bg-sky-500 hover:bg-slate-800 absolute top-0 right-0 mr-5 md:mr-10 mt-4 lg:mt-5 font-bold"
          onClick={() => setShow(!show)}
        >
          <MdAddCircleOutline size={20} />
          Goal
        </button>
        <Link to="/people">
          <button
            className="px-5 py-2 flex justify-center items-center gap-3 rounded-md text-white bg-sky-500 hover:bg-slate-800 absolute top-0 right-24 md:right-[6.5em] mr-5 md:mr-10 mt-4 lg:mt-5 font-bold"
            onClick={() => setShow(!show)}
          >
            <BsPeopleFill size={20} />
          </button>
        </Link>
        <SalesPipelines />
        <div className="h-[70%] flex flex-col xl:flex-row gap-3 min-w-[300px]">
          <LeadGeneration allDeals={leads} request={request} fetchingData={fetchingData} />
          <DiscoveredCalls allCalls={calls} request={request} fetchingData={fetchingData} />
          <BookedDemos allDemos={demos} request={request} fetchingData={fetchingData} />
        </div>
        <Footer setFetchingData={setFetchingData} />
      </div>
      <Modal
        show={show}
        setShow={setShow}
        onClose={() => setShow(!show)}
        title="Add Goal"
      />
    </div>
  );
};

export default Dashboard;
