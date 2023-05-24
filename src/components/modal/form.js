import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setStoredLeads, setStoredCalls, setStoredDemos, setSelectedEmployee, setMetric, setMonth, setGoal, setCircular } from '../../redux/features/globalStoreSlice';

const AddGoalForm = ({ show, setShow }) => {
  const [employees, setEmployees] = useState([]);
  const selectedEmployee = useSelector((state) => state.globalStore.addGoal[0].employee);
  const metric = useSelector((state) => state.globalStore.addGoal[0].metric);
  const month = useSelector((state) => state.globalStore.addGoal[0].month);
  const goal = useSelector((state) => state.globalStore.addGoal[0].goal);
  const circular = useSelector((state) => state.globalStore.addGoal[0].circular);
  const dateRange = useSelector((state) => state.globalStore.dateRange);
  const dispatch = useDispatch();
  const createGoal = () => {
    if (selectedEmployee === '' || metric === '' || month === '' || goal === '') {
      alert('Please fill out all required fields');
      return;
    }
    const URL = `https://test.mycrmreporting.com/api/employee/${selectedEmployee}/goals`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const formData = {
      month,
      year: 2023,
      goal,
      metric,
      is_circular: circular,
    };
    axios.patch(URL, formData, config).then(() => {
      console.log('Goal created 👍');
      setShow(!show);
    })
      .then(() => {
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
        if (!localStorage.getItem('dateRange')) {
          axios
            .get(
              `https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8?startDate=${Object.keys(dateRange).length === 0
                ? yesterday
                : dateRange.startDate
              }&endDate=${Object.keys(dateRange).length === 0 ? today : dateRange.endDate
              }`,
            )
            .then((res) => {
              if (metric === 'GeneratedLead') {
                dispatch(setStoredLeads(res.data.generated_lead));
              } else if (metric === 'GeneratedDiscovery') {
                dispatch(setStoredCalls(res.data.generated_discovery));
              } else if (metric === 'GeneratedDemo') {
                dispatch(setStoredDemos(res.data.generated_demo));
              }
            });
        } else {
          const dateRange = JSON.parse(localStorage.getItem('dateRange'));
          axios
            .get(
              `https://test.mycrmreporting.com/api/pipedrive/deals/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
            )
            .then((res) => {
              if (metric === 'GeneratedLead') {
                dispatch(setStoredLeads(res.data.generated_lead));
              } else if (metric === 'GeneratedDiscovery') {
                dispatch(setStoredCalls(res.data.generated_discovery));
              } else if (metric === 'GeneratedDemo') {
                dispatch(setStoredDemos(res.data.generated_demo));
              }
            });
        }
      });
  };

  useEffect(() => {
    if (employees.length === 0) {
      axios
        .get(
          'https://test.mycrmreporting.com/api/salespeople/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8',
        )
        .then((res) => setEmployees(res.data));
    }
  }, []);

  return (
    <form className="flex flex-col w-full items-center justify-center">
      <label
        htmlFor="Employee"
        className="w-full flex flex-col items-start my-2 text-slate-600"
      >
        <h1>Employee<span className="text-red-600 font-bold">*</span></h1>
        <select
          name="Employee"
          value={selectedEmployee}
          className="w-full p-2 bg-white border border-slate-300 mt-2 rounded-md"
          id="Employee"
          onChange={(e) => dispatch(setSelectedEmployee(e.target.value))}
        >
          <option value="placeholder">Select an employee</option>
          {employees.map((employee) => (
            <option
              key={employee.account_id + employee.owner_name}
              value={employee.id}
              label={employee.owner_name}
            >
              {employee.owner_name}
            </option>
          ))}
        </select>
        <h1 className="text-sm text-red-600 text-center w-full p-0 m-0 hidden">Please enter an employee</h1>
      </label>
      <label
        htmlFor="Metric"
        className="w-full flex flex-col items-start my-2  text-slate-600"
      >
        <h1>Metric<span className="text-red-600 font-bold">*</span></h1>
        <select
          name="Metrics"
          value={metric}
          id="Metrics"
          className="w-full p-2 bg-white border border-slate-300 my-2 rounded-md"
          onChange={(e) => dispatch(setMetric(e.target.value))}
          placeholder="Select metric"
        >
          <option value="placeholder">Select a metric</option>
          <option key={1} value="GeneratedLead">
            Leads
          </option>
          <option key={2} value="GeneratedDiscovery">
            Discovery Call
          </option>
          <option key={3} value="GeneratedDemo">
            Demos
          </option>
        </select>
      </label>
      <div className="w-full flex">
        <label
          htmlFor="Month"
          className="flex-1 flex flex-col items-start my-2 text-slate-600"
        >
          <h1>Month<span className="text-red-600 font-bold">*</span></h1>
          <select
            name="Month"
            value={month}
            id="Month"
            className="w-full p-2 bg-white border border-slate-300 my-2 rounded-md"
            onChange={(e) => dispatch(setMonth(e.target.value))}
          >
            <option value="placeholder">Select a month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="w-full flex gap-2">
        <label
          htmlFor="Goal"
          className="w-full flex flex-col items-start my-2 text-slate-600"
        >
          <h1>Goal<span className="text-red-600 font-bold">*</span></h1>
          <input
            type="number"
            value={goal}
            className="w-full p-2 bg-white border border-slate-300 my-2 rounded-md"
            placeholder="Set goal"
            max={5000000}
            min={10000}
            onChange={(e) => dispatch(setGoal(e.target.value))}
          />
        </label>
        <label
          htmlFor="progressBar"
          className="w-full flex items-start my-2 text-slate-600 justify-start flex-col"
        >
          Progress Bar:
          <div className="flex mt-3 justify-start w-full ml-2">
            <span className="text-xs pt-2">Regular?</span>
            <input
              type="checkbox"
              className="toggle toggle-success toggle-lg ml-2"
              checked={circular}
              onChange={() => dispatch(setCircular(!circular))}
            />
            <span className="ml-2 text-xs pt-2">Circular?</span>
          </div>
        </label>
      </div>

      <div className="w-full flex justify-center items-center gap-2">
        <button
          type="button"
          className="bg-sky-500 text-white py-2 rounded-md flex-1"
          onClick={() => {
            createGoal();
            dispatch(setSelectedEmployee(''));
            dispatch(setMetric(''));
            dispatch(setMonth(''));
            dispatch(setGoal(''));
            dispatch(setCircular(false));
          }}
        >
          Create Goal
        </button>
        <button
          className="bg-red-500 text-white py-2 rounded-md flex-1"
          onClick={(e) => {
            dispatch(setSelectedEmployee(''));
            dispatch(setMetric(''));
            dispatch(setMonth(''));
            dispatch(setGoal(''));
            dispatch(setCircular(false));
            setShow(!show);
            e.preventDefault();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddGoalForm;
