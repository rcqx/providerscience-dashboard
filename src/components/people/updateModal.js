import UpdateForm from './updateForm';

const UpdateModal = ({ show, setShow, onClose, title }) => (
  <div
    id="modal"
    className={`fixed left-0 top-0 w-full h-full flex items-center justify-center ${show ? 'opacity-100' : 'opacity-0 pointer-events-none h-0'
      }`}
    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    onClick={onClose}
    onKeyDown={onClose}
    tabIndex={0}
    role="button"
  >
    <div
      id="modal-content"
      className={`absolute w-[95%] md:w-1/2 xl:w-1/3 bg-white p-10 rounded-lg transform transition-all ease-out duration-300 ${show ? 'translate-y-0' : 'translate-y-[50px]'
        }`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      tabIndex={0}
      role="button"
      style={{
        top: '50%',
        left: '50%',
        transform: show ? 'translate(-50%, -50%)' : 'translate(-50%, 100%)',
      }}
    >
      <div id="modal-header" className="m-0">
        <h3 className="text-start text-lg font-bold">
          {title.toUpperCase()}
        </h3>
      </div>
      <div id="modal-body">
        <UpdateForm show={show} setShow={setShow} />
      </div>
    </div>
  </div>
);

export default UpdateModal;
