import TeacherSocials from "../widgets/teachercommunity/teachercommunity"
import '../css/teacherscommunity.css'
import { useState } from "react";
import TeacherVacancy from "../widgets/teachercommunity/teachervacancy";

function TeacherCommunityPage(){
    const [TeacherVacancyTab, setTeacherVacancy] = useState('vacancy')
    return(
        <div className="teachercommunitybody">
              <div className="teachercommunitypage-tabs">
      {["vacancy", "socials"].map((status) => (
        <button
          key={status}
          className={`teachercommunitypage-tab ${TeacherVacancyTab === status ? "teachercommunitypage-tab-active" : ""}`}
          onClick={() => setTeacherVacancy(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
           <div className="teachercommunitycontainer">
            {TeacherVacancyTab === 'vacancy'?<TeacherVacancy/>:<TeacherSocials/>}
           </div>
        </div>
    )
}
export default TeacherCommunityPage;