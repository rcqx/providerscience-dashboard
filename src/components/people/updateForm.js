import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { RxUpdate } from 'react-icons/rx';
import { AiFillCamera } from 'react-icons/ai';
import { setSelectedEmployee, setAlowareId, setDisable } from '../../redux/features/globalStoreSlice';

const UpdateForm = ({ show, setShow }) => {
  const [employees, setEmployees] = useState([]);
  const selectedEmployee = useSelector((state) => state.globalStore.update[0].employeeId);
  const selectedEmployeeName = useSelector((state) => state.globalStore.update[0].employeeName);
  const selectedEmployeeEmail = useSelector((state) => state.globalStore.update[0].email);
  const selectedAlowareId = useSelector((state) => state.globalStore.update[0].aloware);
  const selectedDisable = useSelector((state) => state.globalStore.update[0].disable);
  const profilePicture = useSelector((state) => state.globalStore.update[0].profilePicture);
  const profilePictureS3 = useSelector((state) => state.globalStore.update[0].profilePictureS3);
  const goals = useSelector((state) => state.globalStore.update[0].goals);
  const [uniqueGoals, setUniqueGoals] = useState([]);
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();
  const updateUser = () => {
    if (selectedEmployee === '' || selectedAlowareId === '') {
      alert('Please fill out all required fields');
      return;
    }
    const URL = `https://test.mycrmreporting.com/api/pipedrive/employee/${selectedEmployee}`;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    if (file !== null) {
      formData.append('picture', file, file && file.name);
    }
    formData.append('aloware_user_id', selectedAlowareId);
    formData.append('hidden', selectedDisable);
    axios.patch(URL, formData, config).then(() => {
      console.log('User Updated 👍');
      setShow(!show);
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => alert(err.response.data.message));
  };

  useEffect(() => {
    if (employees.length === 0) {
      axios
        .get(
          'https://test.mycrmreporting.com/api/salespeople/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8',
        )
        .then((res) => setEmployees(res.data))
        .catch((err) => alert(err.response.data.message));
    }
  }, []);

  useEffect(() => {
    if (goals.length > 0) {
      const unique = goals.filter((item, index, self) => index === self.findIndex((i) => i.metric === item.metric));
      setUniqueGoals(unique);
    }
  }, [goals]);

  const handleClick = () => hiddenFileInput.current.click();
  const handleChange = (e) => setFile(e.target.files[0]);

  return (
    <form className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full h-full justify-around">
        <div className="w-full flex flex-col justify-center items-center overflow-hidden rounded-lg flex-1">
          {profilePicture ? (
            <img src={profilePictureS3 ? `https://${profilePictureS3}` : profilePicture} alt="user" className="xs:w-1/2 sm:w-1/3 m-1 border border-slate-100 shadow-md rounded-lg" />
          ) : (
            <FaUserAlt size={112} className="xs:w-1/2 sm:w-1/3 py-4 mb-1 border border-slate-100 shadow-md rounded-lg" />
          )}
          <div className="w-full sm:w-1/3 flex justify-end">
            <div className="hover:bg-black hover:text-white rounded-full">
              <AiFillCamera size={20} className="m-1" onClick={handleClick} />
            </div>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>
        </div>
        <label
          htmlFor="Name"
          className="w-full flex flex-col items-start text-slate-600 my-2"
        >
          <h1 className="text-sm">Name</h1>
          <h1 className="text-3xl lg:text-4xl font-semilbold text-start">{selectedEmployeeName}</h1>
        </label>
        <label
          htmlFor="Email"
          className="w-full flex flex-col items-start text-slate-600 my-2"
        >
          <h1 className="text-sm">Email</h1>
          <h1 className="text-lg lg:text-2xl font-semilbold text-start truncate">{selectedEmployeeEmail}</h1>
        </label>
        <label
          htmlFor="Goals"
          className="w-full flex flex-col items-start text-slate-600 my-2"
        >
          <h1 className="text-sm">Current Goals</h1>
          {goals.length > 0 ? (
            <div className="flex justify-center w-full">
              <div className="p-2 w-full mt-2 flex justify-around">
                {uniqueGoals && uniqueGoals.map((goal, index) => {
                  return (
                    <div key={index}>
                      <h1 className="text-2xl font-bold text-sky-500">{goal.goal}</h1>
                      <h1 key={index + 1} className="text-center text-xs">
                        {
                          (goal.metric === 'GeneratedLead' && 'Leads') ||
                          (goal.metric === 'GeneratedDemo' && 'Demos') ||
                          (goal.metric === 'GeneratedDiscovery' && 'Discovery')
                        }
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h1 className="text-slate-600 text-start text-2xl py-1">No registered goals</h1>
          )}
        </label>
      </div>
      <label
        htmlFor="Metric"
        className="w-full flex flex-col items-start my-2  text-slate-600"
      >
        <h1 className="text-sm">Aloware ID<span className="text-red-600 font-bold">*</span></h1>
        <input
          className="w-full p-2 bg-white border border-slate-300 my-2 rounded-md"
          onChange={(e) => dispatch(setAlowareId(e.target.value))}
          placeholder="Update Aloware ID"
        />
      </label>

      <div className="mt-3 w-full absolute top-7 flex justify-end px-5">
        <input
          type="checkbox"
          className="toggle toggle-success toggle-lg ml-2 dark:white"
          checked={selectedDisable}
          onChange={() => dispatch(setDisable(!selectedDisable))}
        />
        <span className="ml-2 text-xs pt-2">Hide?</span>
      </div>

      <div className="w-full flex justify-center items-center gap-2 py-2">
        <button
          className="bg-red-500 text-white py-2 rounded-md flex-1"
          onClick={(e) => {
            dispatch(setSelectedEmployee(''));
            setShow(!show);
            e.preventDefault();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-sky-500 text-white py-2 rounded-md flex-1 flex justify-center items-center gap-2"
          onClick={() => {
            updateUser();
            dispatch(setSelectedEmployee(''));
            dispatch(setAlowareId(''));
          }}
        >
          <RxUpdate size={20} />
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
