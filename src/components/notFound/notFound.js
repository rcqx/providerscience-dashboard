import { TbError404 } from 'react-icons/tb';

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col bg-white dark:bg-white">
      <TbError404 size={80} />
      <h1 className="text-2xl">Page Not found</h1>
    </div>
  );
};

export default NotFound;
