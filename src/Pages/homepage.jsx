import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import HomeBanner from "../widgets/homepage/bannerhomepage";
import HomePageForm from "../widgets/homepage/homepageForm";
import "../css/home.css";
import Vaccancy from "../widgets/homepage/vaccancy";
import { webApi } from "../api";
import { FaUsersGear } from "react-icons/fa6"; // Ensure you're using the correct icon import
import Chatbot from "./chatpot";
import { IoChatbubbles } from "react-icons/io5";
import { FaChevronCircleDown, FaChevronDown } from "react-icons/fa";

function HomePage() {
    const [userChecked, setUserChecked] = useState(false); // Keeps track if the user is loaded and checked
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Keeps track if the user is loaded and checked
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUserChecked(true); // If no user is logged in, stop the loading
                return;
            }

            const uid = firebaseUser.uid;
            setUser(firebaseUser);
            try {
                const response = await fetch(`${webApi}/api/user/${uid}`);

                if (!response.ok) {
                    console.error(`Error fetching user: ${response.status}`);
                    setUserChecked(true); // Still proceed if there's an error
                    return;
                }

                const data = await response.json();
                if (data.success && data.data.teacherconfirm && data.data.purpose == 'teacher') {
                    console.log('teacherstatus', data.data)
                    navigate("/tutorhome", { replace: true }); // Immediately navigate to the teacher's dashboard
                } else {
                    setUserChecked(true); // If it's not a teacher, show the homepage
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUserChecked(true); // Handle error and stop loading
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, [navigate]);

    // Show loading spinner while data is being fetched and user role is determined
    if (!userChecked) {
        return (
            <div className="loading-modal">
                <div className="switchinganimationcontainer">
                    <div className="loading-animation">
                        <FaUsersGear style={{ marginLeft: "-20px", fontSize: "100px" }} />
                    </div>
                    <p>Loading, please wait...</p>
                </div>
            </div>
        );
    }

    // Once data is loaded and user is checked, display the home page content
    return (
        <>
            <HomeBanner user={user} />
            <div id="vacancy-section">
            <Vaccancy />
        </div>
            <HomePageForm />
      <button className="floating-button" style={{ bottom:'50px', backgroundColor:' #2d96ff'}} onClick={() => setIsModalOpen(!isModalOpen)}>{isModalOpen ? <FaChevronDown/> : <IoChatbubbles size={30} /> }  </button>


            <div className="chatbot">
                 <Chatbot isOpen={isModalOpen} />
            </div>
         
        </>
    );
}

export default HomePage;
