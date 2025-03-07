import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/onlineclass.css';
import { GrStar } from "react-icons/gr";
import Filters from '../filters/filter';

const gigsData = [
  {
    id: 1,
    name:'Sneha Poude',
    profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXva_C9hjWd_2bmLrB6GXl2Pjrcw26jymhtQ&s',
    title: 'I Teach Web-Development',
    qualification: 'React, NodeJs, Django',
    image: 'https://nxtshiksha.com/wp-content/uploads/2024/11/4.webp',
    fee: '$50',
    paymentMethod: 'PayPal, Credit Card',
    rating: 4.8,
    subjects:'Maths, Science',
    ratedby: '45',
  
    pricePerMonth: '5000',
  },
  {
    id: 2,
    name:'Adarsh Bhujel',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/462030428_1067174968306212_4294254538919611156_n.jpg?stp=c0.0.756.756a_dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=qKB7whPp3REQ7kNvgGSMYuv&_nc_oc=AdixXSaSXS3gStHI7gBdT5_jUl18pZg7zR3LlcxAT97rUguV3DdTKf37xqrQ4mMj_Q4&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AIozGTS4SM13ycysg55XCJc&oh=00_AYB8xinodiwXR6li0iqZwHDVX6IrY9C6VB71pI4_PO_Opw&oe=6786CE55',
    title: 'I Teach Class 11 Economics',
    qualification: 'Intermediate',
    image: 'https://www.pw.live/exams/wp-content/uploads/2023/10/Class-11-Economics.jpg',
    fee: '$30',
    paymentMethod: 'Bank Transfer',
    rating: 4.5,
    ratedby: '102',
    sex:'female',
    subjects:'Maths, chemestry',
    pricePerMonth: '4500',
  },
  {
    id: 3,
    name:'Ankit Bhatta',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/394571011_1858958154562766_5956823731904385617_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=94DT5GCtGssQ7kNvgGAvFPJ&_nc_oc=AdjqjQ03_2c0oUGbOfi43QBXxRtOj0FBTyQ0Gs_UuIoV5nu1sFEYvHgkq5iBUh1lG_A&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AJidNEPQ1fzGxVM54r8AgPU&oh=00_AYDEcNI1Pwz-vgATknyj131izWICuL24AqNevdmNfNsnaQ&oe=6786BC86',
    title: 'I Teach Class 11 Accounting',
    qualification: 'Beginner to Intermediate',
    image: 'https://heritagebooks.com.np/wp-content/uploads/2023/07/accounting-grade-XI-opt-scaled.jpg',
    fee: '$40',
    paymentMethod: 'Google Pay, Credit Card',
    rating: 4.7,
    ratedby: '105',
    subjects:'Account, Economics',
    sex:'female',
    pricePerMonth: '3500',
  },
  {
    id: 4,
    name:'Shristi Adhikari',
    profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIbVNFyuXPWQalqAhfVcINA1hZy5zsseUGw&s',
    title: 'Digital Marketing',
    qualification: 'Advanced',
    image: 'https://img.freepik.com/free-vector/digital-marketing-banner_157027-1372.jpg',
    fee: '$70',
    paymentMethod: 'PayPal, Stripe',
    rating: 4.9,
    ratedby: '25',
    subjects:'Maths, Economics',
    sex:'male',
    pricePerMonth: '7000',
  },
  {
    id: 5,
    name:'Sneha Poude',
    profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXva_C9hjWd_2bmLrB6GXl2Pjrcw26jymhtQ&s',
    title: 'I Teach Web-Development',
    qualification: 'React, NodeJs, Django',
    image: 'https://nxtshiksha.com/wp-content/uploads/2024/11/4.webp',
    fee: '$50',
    paymentMethod: 'PayPal, Credit Card',
    rating: 4.8,
    ratedby: '55',
    sex:'male',
    subjects:'Maths, Science',
    pricePerMonth: '5000',
  },
  {
    id: 6,
    name:'Adarsh Bhujel',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/462030428_1067174968306212_4294254538919611156_n.jpg?stp=c0.0.756.756a_dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=qKB7whPp3REQ7kNvgGSMYuv&_nc_oc=AdixXSaSXS3gStHI7gBdT5_jUl18pZg7zR3LlcxAT97rUguV3DdTKf37xqrQ4mMj_Q4&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AIozGTS4SM13ycysg55XCJc&oh=00_AYB8xinodiwXR6li0iqZwHDVX6IrY9C6VB71pI4_PO_Opw&oe=6786CE55',
    title: 'I Teach Class 11 Economics',
    qualification: 'Intermediate',
    image: 'https://www.pw.live/exams/wp-content/uploads/2023/10/Class-11-Economics.jpg',
    fee: '$30',
    paymentMethod: 'Bank Transfer',
    rating: 4.5,
    ratedby: '45',
    sex:'male',
    subjects:'Maths, Science',
    pricePerMonth: '4000',
  },
  {
    id: 7,
    name:'Ankit Bhatta',
    profile:'https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-1/394571011_1858958154562766_5956823731904385617_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=94DT5GCtGssQ7kNvgGAvFPJ&_nc_oc=AdjqjQ03_2c0oUGbOfi43QBXxRtOj0FBTyQ0Gs_UuIoV5nu1sFEYvHgkq5iBUh1lG_A&_nc_zt=24&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AJidNEPQ1fzGxVM54r8AgPU&oh=00_AYDEcNI1Pwz-vgATknyj131izWICuL24AqNevdmNfNsnaQ&oe=6786BC86',
    title: 'I Teach Class 11 Accounting',
    qualification: 'Beginner to Intermediate',
    image: 'https://heritagebooks.com.np/wp-content/uploads/2023/07/accounting-grade-XI-opt-scaled.jpg',
    fee: '$40',
    paymentMethod: 'Google Pay, Credit Card',
    rating: 4.7,
    subjects:'Maths, Science',
    ratedby: '95',
    sex:'female',
    pricePerMonth: '4000',
  },
];

function OnlineClassResults() {
    const [locationFilter, setLocationFilter] = useState('no need');
    const [genderFilter, setGenderFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 25000]);


    useEffect(()=>{
      setLocationFilter('no need');
    },[locationFilter])

      
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };
    
  const filteredGigs = gigsData.filter((gig) => {
    const matchesGender = genderFilter ? gig.sex === genderFilter : true;
    const matchesSearch = searchTerm
      ? gig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.subjects.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPrice = gig.pricePerMonth >= priceRange[0] && gig.pricePerMonth <= priceRange[1];
    return matchesGender && matchesSearch && matchesPrice;
  });
   


  return (
    <div className="online-classes-page">
      <h2>Enroll in Online Classes</h2>
   <div className="gigfiltercontainer">
    <div className="gigfilter">
    <Filters setLocationFilter={setLocationFilter} handlePriceChange={handlePriceChange} setGenderFilter={setGenderFilter} setSearchTerm={setSearchTerm} priceRange={priceRange} />
    </div>
   
   </div>

      <div className="gigs-container">
        {filteredGigs.map((gig) => (
          <div key={gig.id} className="gig-card">
            <Link to={`/onlineclasses/${gig.id}`} className="detail-link">
              <img src={gig.image} alt={gig.title} className="gig-image" />
              <div className="gig-details">
             <div className="gigprofilecontainer">
             <img className='gigProfile' src={gig.profile} alt="" />
             <h3>{gig.name}</h3>
             </div>
                <h3 className="gig-title">{gig.title}</h3>
                <h3 className="gig-qualification">{gig.qualification}</h3>
                <p className="gig-rating">
                <GrStar fontSize={20} />  {gig.rating} <div style={{color:'grey'}} className="ratedby">
                ({gig.ratedby})
                </div>
                </p>
                <p className="gig-price">{gig.pricePerMonth}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineClassResults;
