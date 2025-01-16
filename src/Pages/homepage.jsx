import HomeBanner from "../widgets/homepage/bannerhomepage";
import HomePageForm from "../widgets/homepage/homepageForm";
import '../css/home.css';
import Vaccancy from "../widgets/homepage/vaccancy";

function HomePage (){
    return(
     <>
        <HomeBanner/>
        <Vaccancy/>
        <HomePageForm/>
        </>
    )
}
export default HomePage;