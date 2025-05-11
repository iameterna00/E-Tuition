import { FaEdit, FaSpinner } from 'react-icons/fa';
import { GoClock } from 'react-icons/go';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TiArrowBackOutline } from 'react-icons/ti';
import { MdOutlineLocationOn, MdOutlineSchool, MdDoneOutline } from 'react-icons/md';
import { LuDollarSign, LuTarget } from 'react-icons/lu';
import { IoIosAddCircle } from 'react-icons/io';
import { BsSuitcaseLg } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { SlCalender, SlSymbolMale } from 'react-icons/sl';
import { FaRegCopy } from 'react-icons/fa';
import DownloadImageButton from "../services/downloadimage";

const AdminVacancyCard = ({
  v,
  tab,
  updateStatus,
  handleEditClick,
  handleDeleteClick,
  searchteacher,
  setIsTeacherModalOpen,
  handleTeacherEditClick,
  isUpdatingStatus,
}) => {
  return (
    <div
      key={v._id}
      className="tuition-vacancy-card"
      style={{
        borderLeft: `${
          v.teachers?.some((teacher) => teacher.commissionDue) ? '5px solid red' : ''
        }`,
      }}
    >
      <h3
        className="tuition-vacancy-title"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {v.name}
        <button
          className="copyname"
          onClick={() => navigator.clipboard.writeText(v.name)}
          title="Copy name"
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            borderColor: 'none',
            padding: 0,
          }}
        >
          <FaRegCopy />
        </button>
      </h3>

      <p className="tuition-vacancy-info">
        <MdOutlineLocationOn color="teal" fontSize={20} /> {v.location}
      </p>
      <p className="tuition-vacancy-info">
        <MdOutlineSchool color="teal" fontSize={20} /> Grade: {v.grade}
      </p>
      <p className="tuition-vacancy-info">
        <IoBookOutline color="teal" fontSize={20} /> Subject: {v.subject}
      </p>
      <p className="tuition-vacancy-info">
        <SlSymbolMale color="teal" fontSize={20} /> Gender: {v.tutorType}
      </p>
      <p className="tuition-vacancy-info">
        <LuDollarSign color="teal" fontSize={16} /> Salary: {v.salary}
      </p>
      <p>
        <BsSuitcaseLg color="teal" fontSize={16} /> Time: {v.time}
      </p>
      {v.minRequirement && (
        <p className="tuition-vacancy-info">
          <LuTarget color="teal" fontSize={18} /> Requirement: {v.minRequirement}
        </p>
      )}
      <p
        className="tuition-vacancy-info"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <SlCalender color="teal" />
        Upload Date: {new Date(v.created_at).toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // 12-hour format with AM/PM
        })}
      </p>

      {tab === 'available' && (
        <div className="uploadvacancycontainer">
          <DownloadImageButton color="teal" vacancy={v} />
          <div className="addtowebsite">
            <button onClick={() => searchteacher(v)} className="generateVacancy">
              Find Teacher
            </button>
          </div>
        </div>
      )}

      {tab === 'pending' && (
        <div className="assignedteachers">
          <h3 className="tuition-vacancy-info">Teachers Assigned:</h3>
          {v.teachers &&
            v.teachers.map((teacher, index) => (
              <div key={index}>
                <p>
                  Teacher: {teacher.teacherName} {teacher.commission && `| Commission: ${teacher.commission}`}
                  {teacher.commissionDue && `| Due: ${teacher.commissionDue}`}
                </p>
              </div>
            ))}
          <div
            className="teachersandcommission"
            style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}
          >
            <div
              className="addteacher"
              style={{ display: 'flex', gap: '5px' }}
              onClick={() => setIsTeacherModalOpen(true)}
            >
              Add More <IoIosAddCircle fontSize={25} />
            </div>
            <div
              className="addteacher"
              style={{ display: 'flex', gap: '5px' }}
              onClick={() => handleTeacherEditClick(v)}
            >
              Edit Teacher <FaEdit fontSize={25} />
            </div>
          </div>
        </div>
      )}

      {tab === 'complete' && (
        <div className="assignedteachers">
          <h3>Commission for {v.selectedTeacher || 'No teacher assigned'}</h3>
          <p>Commission: {v.teacherCommission || '0'}</p>
        </div>
      )}

      <div className="tuition-action-buttons">
        {tab === 'available' && (
          <>
            <button className="generateVacancy" onClick={() => updateStatus(v._id, 'pending')}>
              {isUpdatingStatus ? (
                <FaSpinner className="newspinner" />
              ) : (
                <>
                  <GoClock style={{ marginRight: '4px' }} />
                  Pending
                </>
              )}
            </button>
            <button className="generateVacancy" onClick={() => handleEditClick(v)}>
              <FaEdit /> Edit
            </button>
          </>
        )}

        {tab === 'pending' && (
          <>
            <button className="generateVacancy" onClick={() => updateStatus(v._id, 'available')}>
              <TiArrowBackOutline /> Available
            </button>
            <button className="generateVacancy" onClick={() => updateStatus(v._id, 'complete')}>
              <MdDoneOutline scale={12} /> Complete
            </button>
          </>
        )}
        <button className="tuition-delete-button" onClick={() => handleDeleteClick(v._id)}>
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
};

export default AdminVacancyCard;
