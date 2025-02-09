import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import HomeBanner from "../widgets/homepage/bannerhomepage";
import HomePageForm from "../widgets/homepage/homepageForm";
import "../css/home.css";
import Vaccancy from "../widgets/homepage/vaccancy";
import { webApi } from "../api";

function HomePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const uid = firebaseUser.uid;

                try {
                    const response = await fetch(`${webApi}/api/user/${uid}`);

                    if (!response.ok) {
                        console.error(`Error fetching user: ${response.status}`);
                        const errorText = await response.text(); // This should help you identify if HTML is returned
                        console.error('Error response text:', errorText);
                        setLoading(false); // Set loading to false even if there is an error
                        return;
                    }

                    // If the response is successful, attempt to parse the JSON
                    const data = await response.json();
                    if (data.success) {
                        setUser(data.data);
                        if (data.data.purpose === "teacher") {
                            navigate("/iamatuitor"); // Redirect teachers to their page
                        } else {
                            setLoading(false); // If it's a student, stop loading
                        }
                    } else {
                        console.error("API returned an unsuccessful response:", data);
                        setLoading(false); // Set loading to false on unsuccessful response
                    }
                } catch (error) {
                    console.error("Error fetching user:", error); // Log fetch error
                    setLoading(false); // Set loading to false on fetch error
                }
            } else {
                setLoading(false); // Set loading to false if there's no firebaseUser
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, [navigate]);

    // Show loading spinner while data is being fetched
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div> {/* You can replace this with a real spinner */}
            </div>
        );
    }

    // Once data is loaded, display the home page content
    return (
        <>
            <HomeBanner />
            <Vaccancy />
            <HomePageForm />
        </>
    );
}

export default HomePage;
