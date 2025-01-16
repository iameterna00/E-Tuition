import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import ReactSlider from 'react-slider';

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
    sex: 'male',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 11',
    pricePerMonth: '5000',
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
    pricePerMonth: '5000',
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
    sex: 'male',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 8',
    pricePerMonth: '4000',
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
    sex: 'male',
    subjects: 'Math, physics, chemistry',
    ratedby: '45',
    class: 'Class 8',
    pricePerMonth: '2000',
  },
  {
    id: 5,
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
    pricePerMonth: '6000',
  },
  {
    id: 6,
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
    pricePerMonth: '9000',
  },
  {
    id: 7,
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
    pricePerMonth: '10000',
  },
];

function Vaccancy() {
  const [locationFilter, setLocationFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };


  const filteredGigs = gigsData.filter((gig) => {
    const matchesLocation = locationFilter ? gig.location.includes(locationFilter) : true;
    const matchesGender = genderFilter ? gig.sex === genderFilter : true;
    const matchesSearch = searchTerm
      ? gig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.subjects.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPrice = gig.pricePerMonth >= priceRange[0] && gig.pricePerMonth <= priceRange[1];
    return matchesLocation && matchesGender && matchesSearch && matchesPrice;
  });


  return (
    <div className="home-vaccancy-page">
        <div className="title">
        <h2>Available Tuitors</h2>
    </div>
  <div className="vaccancymainCntainer">

  <div className="vaccancyfilters">
  <div className="filterboxs">
    <div className="filterbox">
      <h3>Location</h3>
      <select 
       onChange={(e) => setLocationFilter(e.target.value)}
      name="location" id="location">
        <option value="">Select Location</option>
        <option value="Kathmandu">Kathmandu</option>
        <option value="Lalitpur">Lalitpur</option>
        <option value="Bhaktapur">Bhaktapur</option>
      </select>
    </div>
    <div className="filterbox">
      <h3>Gender</h3>
      <select
         onChange={(e) => setGenderFilter(e.target.value)}
       name="Gender" id="Gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
   <div className="filterox">
   <div className="price-slider-container">
          <div className="pricerangeofslider">
          <h3 style={{margin:'0px'}} >
             Price Range
            </h3>
            <p style={{margin:'0px', fontSize:'14px'}}>
             Rs {priceRange[0]} - Rs {priceRange[1]}
            </p></div>
            <ReactSlider
              className="price-slider"
              thumbClassName="price-slider-thumb"
              trackClassName="price-slider-track"
              min={0}
              max={25000}
              step={500}
              defaultValue={[0, 10000]}
              value={priceRange}
              onChange={handlePriceChange}
              renderThumb={(props, state) => <div {...props}></div>}
            />
           
          </div>
   </div>
 
    
  </div>
    <div className="search-container-vaccancy">
          <input
           onChange={(e) => setSearchTerm(e.target.value)}
           type="text" placeholder="Search Anything..." className="search-vaccancy" />
          <div className="search-vaccancyiconcontainer"><div className="search_vaccancyicon"></div></div>
        </div>
</div>

  <div className="vaccancy-container">
        {filteredGigs.map((gig) => (
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
                <h3 className="vaccancy-qualification">gender: {gig.sex}</h3>
                <h3 className="vaccancy-price">Salary: Rs.{Number(gig.pricePerMonth).toLocaleString()}</h3>


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
