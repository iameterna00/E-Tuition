import HomePageForm from "../widgets/homepage/homepageForm";
import OnlineClassBanner from "../widgets/onlineclassPages/onlineclassFilters";
import OnlineClassResults from "../widgets/onlineclassPages/onlineclassresults";

function OnlineClass (){
    return(
     <>
        <OnlineClassBanner/>
        <OnlineClassResults/>
        <HomePageForm />
        </>
    )
}
export default OnlineClass;