import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';
import { TailSpin } from 'react-loader-spinner';
import { webApi } from '../../api';
import kubevacancy from '../../assets/kubevacancy.png';
import { IoInformationCircle } from 'react-icons/io5';
import ReferalProces from "../../assets/referalprocess.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../../services/Redux/userSlice';
import { getAuth } from 'firebase/auth';
import TuitorLogin from '../login/betuitorlogin';
import { ToastContainer, toast, Zoom } from 'react-toastify';


const VacancyDetail = () => {
  const { vacancyId, referralCode: urlReferralCode } = useParams(); 
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openreferalmodal, setopenreferalmodal] = useState(false);
  const [openlogin, setopenlogin] = useState(false);
  const dispatch = useDispatch();
  const myuser = useSelector(selectUser);
  const [generatedReferralCode, setGeneratedReferralCode] = useState('');
  const handleLoginclick = () => setopenlogin(!openlogin);
  const activeReferralCode = urlReferralCode || generatedReferralCode || (myuser?.referralCode || '');


  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(fetchUser(firebaseUser.uid));
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [dispatch]);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch(`${webApi}/api/vacancy/${vacancyId}`);
        const data = await res.json();
        setVacancy(data);
        console.log('this is fetched vacancy', data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vacancy:', err);
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [vacancyId]);



  const handleCopy = () => {
    const referralLink = `${window.location.origin}/vacancy/${vacancyId}/ref/${myuser.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied!", {
      position: "top-center",
      autoClose: 1000,
      transition: Zoom, // or Slide, Bounce, Flip
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: '#007bff',  // Bootstrap primary blue
        color: '#fff',
      },
    });
  };

  const handlereferclick = () => {
    if (myuser) {
      setopenreferalmodal(true); // Open referral modal if logged in
    } else {
      console.log('loginopen')
      setopenlogin(true); // Open login modal if not logged in
    }
  }

  const closeModal = () => setopenreferalmodal(false);

  const generateWhatsappMessage = (vacancy, referralCode) => {
    let message = `Hi, I am interested in the vacancy for ${vacancy.subject} For Grade ${vacancy.grade} at ${vacancy.location}`;
    
    // Add referral code to message if it exists
    if (referralCode) {
      message += `,Code: ${referralCode}`;
    }
    
    return `https://wa.me/9768771793?text=${encodeURIComponent(message)}`;
  };

  const handleGenerateReferralCode = async () => {
    if (myuser?.referralCode) {
      toast.info('Referral code already exists!');
      return; 
    }
  
    try {
      const response = await fetch(`${webApi}/api/generate-referral-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: myuser.uid }), // Ensure userId is sent
      });
  
      const data = await response.json();
  
      if (data.referralCode) {
        setGeneratedReferralCode(data.referralCode); 
        dispatch(fetchUser(myuser.uid)); 
        toast.success('Referral code generated successfully!');
      } else {
        toast.error('Error generating referral code.');
      }
    } catch (error) {
      console.error('Error generating referral code:', error);
      toast.error('Failed to generate referral code.');
    }
  };
  

  if (loading) {
    return (
      <div className="vacancy-loader-container" style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TailSpin height={40} width={40} color="#00bcd4" ariaLabel="loading" />
        <p>Loading vacancy details...</p>
      </div>
    );
  }

  if (!vacancy) return <p>Vacancy not found.</p>;

  const getCommission = () => {
    const salaryStr = vacancy.salary?.toLowerCase() || '';
    let numericSalary = 0;
    if (salaryStr.includes('per hour')) {
      numericSalary = 600 * 5; // change this logic as needed
    } else if (salaryStr.includes('k')) {
      numericSalary = parseFloat(salaryStr.replace('k', '')) * 1000;
    } else {
      numericSalary = parseFloat(salaryStr);
    }
    return Math.round(numericSalary * 0.05);
  };

  return (
    <div className="vacancy-detail-body">
      <div className="vacancydetailscontents">
        <div className="vacancy_detail_leftside">
          <div className="vacancybodybanner">
            <img src={kubevacancy} style={{ width: "100%", maxWidth: "500px" }} alt="" />
          </div>
          <div className="importantvacacnynote">
            <div className="importantvacancynoteinside">
              <h3>Important Notes</h3>
              <ul>
                <li>
                  A <strong>one-time service charge of 25%</strong> of the vacancy's listed salary is applicable upon successful teacher placement.
                </li>
                <li>
                  Teachers may be asked to conduct <strong>demo classes for up to 2 days</strong> as part of the selection process.
                </li>
                <li>
                  If the teacher is <strong>not selected after the demo class</strong>, or the student/parent decides not to continue, a <strong>100% refund</strong> will be issued.
                </li>
                <li>
                  If the teacher is <strong>unable to continue due to personal issues</strong>, a refund is not available <strong>after 1 week</strong> of assignment.
                </li>
                <li>
                  Teachers must inform Kube <strong>within the first week</strong> of assignment if they are unable to proceed in order to be eligible for a refund.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="vacancy_detal_rightside">
          <div className="vacancydetailinformation">
            <div className="vacancydetailinside">
              <h2>{vacancy.location ? (<>Teacher Needed at {vacancy.location}</>) : ("Online Classes")}</h2>
              <div className="vacancy_detail_salary">
                <p><strong>Grade :</strong> {vacancy.grade}</p>
                <p><strong>Subject :</strong> {vacancy.subject}</p>
                <p><strong>Commission :</strong>{getCommission()}Rs</p>
                <p><strong>No of Student :</strong>{vacancy.noofstudents}</p>
                {vacancy.location && <p><strong>Location :</strong>{vacancy.location}</p>}
              </div>
              <div className="vacancyapplybutton" style={{ display: "flex", width: '100%', maxWidth: "400px", gap: "20px", justifyContent: 'center', padding: "10px 0" }}>
                <div className="getstarted" style={{ width: '100%' }}>
                <a href={generateWhatsappMessage(vacancy, activeReferralCode)} target="_blank" rel="noopener noreferrer">
            <button>Apply</button>
          </a>
                </div>
                <div className="refer" style={{ width: '100%', backgroundColor: "transparent", border: "1px solid grey", borderRadius: "20px" }}>
                  <button onClick= {handlereferclick}>Refer a tutor</button>
                </div>
              </div>
            </div>
          </div>
          <div className="refersuggestions">
            <div className="suggestioninsides">
              <IoInformationCircle fontSize={25} style={{ margin: '4px' }} />
              <p>Earn 5% reward by referring candidates for open vacancies!</p>
            </div>
          </div>
          <img src={ReferalProces} style={{ width: "100%", maxWidth: "400px", marginTop: '-20px', paddingBottom: "20px" }} alt="" />
        </div>
      </div>

      {openreferalmodal && vacancy && (
        <div className="modal">
          <div className="modal-contents">
            <h3 style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: 'center' }}>
              <FaMoneyBillWave color='rgb(0, 200, 0)' size={25} /> Earn Rs. {
                (() => {
                  const salaryString = vacancy.salary.toLowerCase().replace(/\s/g, '');
                  let numericSalary = 0;
                  if (salaryString.includes('k')) {
                    numericSalary = parseFloat(salaryString.replace('k', '')) * 1000;
                  } else {
                    numericSalary = parseFloat(salaryString);
                  }
                  const commission = Math.round(numericSalary * 0.05);
                  return commission;
                })()
              }
            </h3>

            <p>Refer a teacher for {vacancy.subject}</p>

            {myuser.referralCode || generatedReferralCode ? (
              <div>
                  <p style={{marginTop:'-5px'}}>Copy and share your referal link</p>
                <input type="text"
                disabled
                style={{borderRadius:'20px'}}
                value={`${window.location.origin}/vacancy/${vacancyId}/ref/${myuser.referralCode}`} />
              
                <div className="contactwhatsappbutton">
                <button onClick={handleCopy}>Copy Code</button>
                <ToastContainer />
              


              
              <button className="tuition-delete-button" onClick={closeModal}>
                Close
              </button>
            </div>
              </div>
            ) : (
              <div className='contactwhatsappbutton' >
                <button onClick={handleGenerateReferralCode}>Generate Referral Code</button>
                <button className="tuition-delete-button" onClick={closeModal}>
                Close
              </button>
              </div>
            )}

            
          </div>
        </div>
      )}
       {openlogin && (
      
      <TuitorLogin close={handleLoginclick} />
   
  )}
    </div>
  );
};

export default VacancyDetail;
