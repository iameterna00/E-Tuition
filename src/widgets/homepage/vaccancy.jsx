import React from 'react';
import { Link } from 'react-router-dom';
import { GrStar } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const gigsData = [
  {
    id: 1,
    name:'Sneha Poude',
    profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXva_C9hjWd_2bmLrB6GXl2Pjrcw26jymhtQ&s',
    location: 'Baneshowr,Kathmandu',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://nxtshiksha.com/wp-content/uploads/2024/11/4.webp',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 11',
    pricePerMonth: 'Rs 5,000/month',
  },
  {
    id: 2,
    name:'Adarsh Bhujel',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/462030428_1067174968306212_4294254538919611156_n.jpg?stp=c0.0.756.756a_dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=qKB7whPp3REQ7kNvgGSMYuv&_nc_oc=AdixXSaSXS3gStHI7gBdT5_jUl18pZg7zR3LlcxAT97rUguV3DdTKf37xqrQ4mMj_Q4&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AIozGTS4SM13ycysg55XCJc&oh=00_AYB8xinodiwXR6li0iqZwHDVX6IrY9C6VB71pI4_PO_Opw&oe=6786CE55',
    location: 'Lalitpur, Hattiban',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://www.pw.live/exams/wp-content/uploads/2023/10/Class-11-Economics.jpg',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 10',
    pricePerMonth: 'Rs 5,000/month',
  },
  {
    id: 3,
    name:'Ankit Bhatta',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/394571011_1858958154562766_5956823731904385617_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=94DT5GCtGssQ7kNvgGAvFPJ&_nc_oc=AdjqjQ03_2c0oUGbOfi43QBXxRtOj0FBTyQ0Gs_UuIoV5nu1sFEYvHgkq5iBUh1lG_A&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AJidNEPQ1fzGxVM54r8AgPU&oh=00_AYDEcNI1Pwz-vgATknyj131izWICuL24AqNevdmNfNsnaQ&oe=6786BC86',
    location: 'Bhaktaput, Gatthaghar',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://heritagebooks.com.np/wp-content/uploads/2023/07/accounting-grade-XI-opt-scaled.jpg',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 8',
    pricePerMonth: 'Rs 5,000/month',
  },
  {
    id: 4,
    name:'Shristi Adhikari',
    profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIbVNFyuXPWQalqAhfVcINA1hZy5zsseUGw&s',
    location: 'Bhaktapur, Kausaltar',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://img.freepik.com/free-vector/digital-marketing-banner_157027-1372.jpg',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 8',
    pricePerMonth: 'Rs 5,000/month',
  },
  {
    id: 1,
    name:'Sneha Poude',
    profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXva_C9hjWd_2bmLrB6GXl2Pjrcw26jymhtQ&s',
    location: 'Newroad , Kathmandu',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://nxtshiksha.com/wp-content/uploads/2024/11/4.webp',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 9',
    pricePerMonth: 'Rs 5,000/month',
  },
  {
    id: 2,
    name:'Adarsh Bhujel',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/462030428_1067174968306212_4294254538919611156_n.jpg?stp=c0.0.756.756a_dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=qKB7whPp3REQ7kNvgGSMYuv&_nc_oc=AdixXSaSXS3gStHI7gBdT5_jUl18pZg7zR3LlcxAT97rUguV3DdTKf37xqrQ4mMj_Q4&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AIozGTS4SM13ycysg55XCJc&oh=00_AYB8xinodiwXR6li0iqZwHDVX6IrY9C6VB71pI4_PO_Opw&oe=6786CE55',
    location: 'Lalitpur, Hattiban',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://www.pw.live/exams/wp-content/uploads/2023/10/Class-11-Economics.jpg',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 12',
    pricePerMonth: 'Rs 5,000/month',
  },
  {
    id: 3,
    name:'Ankit Bhatta',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/394571011_1858958154562766_5956823731904385617_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=94DT5GCtGssQ7kNvgGAvFPJ&_nc_oc=AdjqjQ03_2c0oUGbOfi43QBXxRtOj0FBTyQ0Gs_UuIoV5nu1sFEYvHgkq5iBUh1lG_A&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AJidNEPQ1fzGxVM54r8AgPU&oh=00_AYDEcNI1Pwz-vgATknyj131izWICuL24AqNevdmNfNsnaQ&oe=6786BC86',
    location: 'Bhaktapur, Kausaltar',
    qualification: 'MBA (Lincon University) 2019',
    experience: '10+ years (NCC, Apex)',
    image: 'https://heritagebooks.com.np/wp-content/uploads/2023/07/accounting-grade-XI-opt-scaled.jpg',
    fee: '$50',
    sex: 'female',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Bachelors, Management ',
    pricePerMonth: 'Rs 5,000/month',
  },
];

function Vaccancy() {
  return (
    <div className="home-vaccancy-page">
        <div className="title">
        <h2>Available Vaccancy</h2>
    </div>
  <div className="vaccancymainCntainer">

  <div className="vaccancyfilters">
  <div className="filterboxs">
    <div className="filterbox">
      <h3>Location</h3>
      <select name="location" id="location">
        <option value="Kathmandu">Kathmandu</option>
        <option value="Lalitpur">Lalitpur</option>
        <option value="Bhaktapur">Bhaktapur</option>
      </select>
    </div>
    <div className="filterbox">
      <h3>Gender</h3>
      <select name="Gender" id="Gender">
        <option value="Select Gender">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    
  </div>
    <div className="search-container-vaccancy">
          <input type="text" placeholder="Search Anything..." className="search-vaccancy" />
          <div className="search-vaccancyiconcontainer"><div className="search_vaccancyicon"></div></div>
        </div>

</div>

  <div className="vaccancy-container">
        {gigsData.map((gig) => (
          <div key={gig.id} className="vaccancy-card">
            <Link to={`/onlineclasses/${gig.id}`} className="vaccancydetail-link">
              <img src={gig.image} alt={gig.title} className="vaccancy-image" />
              <div className="vaccancy-details">
             <div className="vaccancyprofilecontainer">
             <img className='vaccancyProfile' src={gig.profile} alt="" />
             <h3>{gig.name}</h3>
             </div>
                <h3 className="vaccancy-location"><FaLocationDot /> {gig.location}</h3>
                <h3 className="vaccancy-qualification">Qualification: {gig.qualification}</h3>
                <h3 className="vaccancy-qualification">Exp: {gig.experience}</h3>
                <h3 className="vaccancy-price">Salary: {gig.pricePerMonth}</h3>
                <button className='vaccancyapplybutton'>Apply</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
  </div>
    </div>
  );
}

export default Vaccancy;
