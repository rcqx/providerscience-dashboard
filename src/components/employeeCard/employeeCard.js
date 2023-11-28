import { RxUpdate } from 'react-icons/rx';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  setUpdateFormEmployee,
  setUpdateFormEmployeeName,
  setUpdateFormEmployeePicture,
  setUpdateFormEmployeePictureS3,
  setUpdateFormEmployeeEmail,
  setGoals,
} from '../../redux/features/globalStoreSlice';

const EmployeeCard = ({
  name,
  accountId,
  profilePicture,
  profilePictureS3,
  email,
  show,
  setShow,
  goals,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="gap-5 relative xl:w-[32.5%] md:p-4 md:w-[48%] w-full flex justify-between items-center border border-slate-200 border-b-l 
    border-b-r shadow-sm rounded-lg hover:scale-[103%] hover:border hover:border-slate-200 ease-out duration-300 
    cursor-pointer hover:bg-white hover:shadow-lg"
    >
      <div className="flex gap-5 items-center w-[65%]">
        {profilePicture !== null ? (
          <>
            <img
              src={profilePictureS3 ? `https://${profilePictureS3}` : profilePicture}
              alt="profile-pic"
              className="border border-slate-200 rounded-lg shadow-md h-[5em]"
            />
            <h1 className="text-slate-700 font-bold text-2xl text-start">
              {name ? name : 'Loading...'}
            </h1>
          </>
        ) : (
          <>
            <FaUserAlt size={80} className="border border-slate-200 rounded-lg shadow-sm" />
            <h1 className="text-slate-700 font-bold text-2xl text-start flex-1">
              {name ? name : 'Loading...'}
            </h1>
          </>
        )}
      </div>

      <div className="flex flex-col justify-center md:pr-0 w-1/5 h-20 xl:h-16 xl:w-1/6">
        <button
          className="h-full text-white bg-sky-500 rounded-tr-lg rounded-br-lg md:rounded-tl-lg md:rounded-bl-lg hover:bg-slate-800 font-bold flex justify-center items-center"
          onClick={() => {
            setShow(!show);
            dispatch(setUpdateFormEmployee(accountId));
            dispatch(setUpdateFormEmployeeName(name));
            dispatch(setUpdateFormEmployeePicture(profilePicture));
            dispatch(setUpdateFormEmployeePictureS3(profilePictureS3));
            dispatch(setGoals(goals));
            dispatch(setUpdateFormEmployeeEmail(email));
          }}
        >
          <RxUpdate size={25} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
