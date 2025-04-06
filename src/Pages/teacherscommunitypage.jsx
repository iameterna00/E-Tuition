import TeacherSocials from "../widgets/teachercommunity/teachercommunity"
import '../css/teacherscommunity.css'
import { useState } from "react";
import TeacherVacancy from "../widgets/teachercommunity/teachervacancy";

function TeacherCommunityPage(){
    const [TeacherVacancyTab, setTeacherVacancy] = useState('vacancy')
    return(
        <div className="teachercommunitybody">
       
           <div className="teachercommunitycontainer">
            {TeacherVacancyTab === 'vacancy'?<TeacherVacancy/>:<TeacherSocials/>}
           </div>
        </div>
    )
}
export default TeacherCommunityPage;