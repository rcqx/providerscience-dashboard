import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPeople } from '../../redux/features/globalStoreSlice';
import EmployeeCard from '../employeeCard/employeeCard';
import UpdateModal from './updateModal';
import CardLoader from '../cardLoader';
import logo from '../../assets/ps-logo-dark.svg';

const People = () => {
  const dispatch = useDispatch();
  const [unsortedPeople, setUnsortedPeople] = useState([]);
  const [sortedPeople, setSortedPeople] = useState([]);
  const [show, setShow] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (unsortedPeople !== undefined && unsortedPeople.length === 0) {
      try {
        axios.get('https://test.mycrmreporting.com/api/salespeople/32d2ebff-1cec-46ab-8c4d-0cfbf6f6cea8')
          .then((res) => {
            setUnsortedPeople(res.data);
          });
      } catch (err) {
        console.log('ERROR', err);
      }
    }
  }, [unsortedPeople]);

  useEffect(() => {
    if (unsortedPeople.length > 0) {
      const sorted = unsortedPeople.sort((a, b) => a.owner_name.localeCompare(b.owner_name));
      const availableUsers = sorted.filter((user) => user.disabled !== true);
      setSortedPeople(availableUsers);
      dispatch(setPeople(sortedPeople));
    }
  }, [unsortedPeople]);

  const filter = (value) => {
    if (value !== '') {
      const filtered = sortedPeople.filter((person) => person.owner_name.toLowerCase().includes(value.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-white xl:px-40 xl:py-10 px-4 py-4 min-h-screen relative">
        <div className="text-[#4CBEEB] flex items-center">
          <h1 className="text-start text-xl lg:text-3xl font-bold mb-2 tracking-tight">
            People
          </h1>
          <span className=" text-xl ml-2 font-thin">{`(${filteredUsers.length === 0 ? sortedPeople.length : filteredUsers.length})`}</span>
        </div>

        <input
          className="dark:bg-white bg-white border border-slate-200 w-full p-3 mb-4"
          placeholder="Search by name..."
          onChange={(e) => filter(e.target.value)}
        />
        <div className="flex flex-wrap gap-3 justify-start items-center">
          {!filteredUsers.length && sortedPeople.map((person, index) => {
            return (
              <EmployeeCard
                key={index}
                name={person.owner_name}
                accountId={person.id}
                email={person.email}
                profilePicture={person.icon_url}
                profilePictureS3={person.picture && person.picture.url}
                show={show}
                setShow={setShow}
                goals={person.goals}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 justify-start items-center">
          {filteredUsers.length > 0 && filteredUsers.map((person, index) => {
            return (
              <EmployeeCard
                key={index}
                name={person.owner_name}
                accountId={person.id}
                email={person.email}
                profilePicture={person.icon_url}
                profilePictureS3={person.picture ? person.picture.url : null}
                show={show}
                setShow={setShow}
                goals={person.goals}
              />
            );
          })}
        </div>
        {sortedPeople.length === 0 && (
          <div className="flex justify-center items-center placeholder:first-letter:w-full min-h-[38em] flex-col">
            <CardLoader />
          </div>
        )}
        <Link to="/">
          <img
            src={logo}
            alt="provider-science-logo"
            className="md:w-1/4 lg:w-1/5 hidden md:flex md:absolute md:top-4 right-6 xl:top-8 xl:right-40"
          />
        </Link>
      </div>
      <UpdateModal
        show={show}
        setShow={setShow}
        onClose={() => setShow(!show)}
        title="Employee"
      />
    </div>
  );
};

export default People;
