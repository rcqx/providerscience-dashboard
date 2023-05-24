import AddGoalForm from './form';

const Modal = ({ show, setShow, onClose, title }) => {
  return (
    <div
      id="modal"
      className={`absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center ${show ? 'opactiy-100' : 'opacity-0 pointer-events-none h-0'
        }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
      onKeyDown={onClose}
      tabIndex={0}
      role="button"
    >
      <div
        id="modal-content"
        className={`absolute w-[95%] md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white p-10 rounded-lg transform transition-all ease-out duration-300 ${show ? 'translate-y-0' : 'translate-y-[50px]'
          }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
        role="button"
      >
        <div id="modal-header" className="m-0">
          <h3 className="text-start text-lg font-bold">
            {title.toUpperCase()}
          </h3>
        </div>
        <div id="modal-body">
          <AddGoalForm show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
