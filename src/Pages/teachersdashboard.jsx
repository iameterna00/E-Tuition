import { Link } from 'react-router-dom';
import '../css/teachersdashboard.css';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RechartsTooltip } from 'recharts';

const hoursTaught = 120;
const studentsTaught = 15;

const LEVEL_2_HOURS = 200;
const LEVEL_2_STUDENTS = 50;

const hoursPercentage = Math.min((hoursTaught / LEVEL_2_HOURS) * 100, 100);
const studentsPercentage = Math.min((studentsTaught / LEVEL_2_STUDENTS) * 100, 100);

const profileViewsData = [
  { month: 'Jan', views: 10 },
  { month: 'Feb', views: 15 },
  { month: 'Mar', views: 25 },
  { month: 'Apr', views: 30 },
  { month: 'May', views: 40 },
  { month: 'Jun', views: 50 },
  { month: 'Jul', views: 60 },
  { month: 'Aug', views: 55 },
  { month: 'Sep', views: 65 },
  { month: 'Oct', views: 75 },
  { month: 'Nov', views: 80 },
  { month: 'Dec', views: 90 },
];
const averageProgress = (hoursPercentage + studentsPercentage) / 2;



function GradientDefs() {
  return (
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradientHours" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0088FE" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
        <linearGradient id="gradientStudents" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0088FE" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const hoursData = [{ name: "Hours Taught", value: hoursPercentage }];
const studentsData = [{ name: "Students Taught", value: studentsPercentage }];

function TeacherDashboard({user}) {
  const teacherLevel = hoursTaught >= LEVEL_2_HOURS || studentsTaught >= LEVEL_2_STUDENTS ? "Level 2" : "Level 1";

  return (
    <div className="teacherdashboardbody">
      <GradientDefs />
<div className="teachersinformationscontainer">
    
<div className="teachersinformations">
        <div className="teacherinformationinsiders">
          <div className="teacherprofilecontainer">
            <img className='teacherprofile' src={user.profile} alt="" />
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <Link to={'/profile'} style={{display:'flex', justifyContent:'center', width:'100%', maxWidth:"300px", backgroundColor:"transparent", border:"1px solid grey", borderRadius:"20px"}} ><button style={{display:'flex', justifyContent:'center', width:'100%', maxWidth:"300px", backgroundColor:"transparent"}}>View Profile</button></Link>
          </div>
        </div>
      </div>
      <div className="teachersinformations">
        <div className="teacherinformationinsiders">
            <h3>Qualification Overview</h3>
          <div className="teacherprofilecontainer" style={{alignItems:'start'}}>
          <p style={{margin:'0px 10px'}}>Level</p>
          <p style={{margin:'0px 10px'}}>Rating</p>
          <div className="progress-container">
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${averageProgress}%` }}></div>
    {/* Diamond stops */}
  </div>
  <div className="diamond stop1">Lv 1 <br /> Beginner Tutor</div>
    <div className="diamond stop2">Lv 2 <br /> Master Tutor</div>
    <div className="diamond stop3">Lv 3 <br /> Dictator</div>
</div>

         
          </div>
        </div>
      </div>
</div>

      <div className="techerdashboarddetails">
        <div className="teacherdashboardinsiders">
          <h3>Teaching Statistics</h3>

          <div className="progress-container">
            {/* Hours Taught Progress */}
            <div className="progress-chart">
            <h4 style={{margin:'5px'}}>Hours Taught</h4>
              <div className="progress-circle">
                <ResponsiveContainer width="100%" height={180}>
                  <RadialBarChart
                    innerRadius="90%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={90 + (360 * hoursPercentage / 100)}
                    barSize={12}
                    data={hoursData}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      dataKey="value"
                      fill="url(#gradientHours)"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="progress-text">{Math.round(hoursPercentage)}%</div>
              </div>
              <p>{hoursTaught} / {LEVEL_2_HOURS} hours</p>
            </div>

            {/* Students Taught Progress */}
            <div className="progress-chart">
              <h4 style={{margin:'5px'}}>Students Taught</h4>
              <div className="progress-circle">
                <ResponsiveContainer width="100%" height={180}>
                  <RadialBarChart
                    innerRadius="90%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={90 + (360 * studentsPercentage / 100)}
                    barSize={12}
                    data={studentsData}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      dataKey="value"
                      fill="url(#gradientStudents)"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="progress-text">{Math.round(studentsPercentage)}%</div>
              </div>
              <p>{studentsTaught} / {LEVEL_2_STUDENTS} students</p>
            </div>
          </div>

          {/* Line Graph for Profile Views */}
          <div className="line-graph">
            <h4>Profile Views in the Past Year</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profileViewsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line strokeWidth={3} type="monotone" dataKey="views" stroke="#0088FE" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
