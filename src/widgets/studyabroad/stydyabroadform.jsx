import React, { useState } from 'react';


const AbroadStudentForm = ({country, university, close, itsfrontpage}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: country,
    university: university,
    studyLevel: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('this is frontpage ', itsfrontpage)
    // Handle your submission logic here
  };


  return (
    
    <form className="abroadforms" onSubmit={handleSubmit}>
  <h2 >Kube can help you!</h2>
  <p>Enter your details and get a free counselling session with our experts so they can connect you to the right course, country, university – and even scholarships!</p>

  <div className='form-row'>
    <label>
      First Name:
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
    </label>
    <label>
      Last Name:
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
    </label>
  </div>

  <div className={`${itsfrontpage ? 'frontpage' : 'form-row'}`}>
  <div className="phonenumberform">
    <label htmlFor="phone">Email *</label>
    <div className="phonenumbercontainer">
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="phonenumberform">
    <label htmlFor="phone">Mobile number *</label>
    <div className="phonenumbercontainer">
      <div className="countrycode">
        <input readOnly type="text" value="+977" />
      </div>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>
  </div>
</div>


  <div className="form-row">
    <label>
      Country:
      <input type="text" name="country" value={formData.country} onChange={handleChange} required />
    </label>
    <label>
      University:
      <input type="text" name="university" value={formData.university} onChange={handleChange} required />
    </label>
  </div>

  <div className="form-row">
    <label>
      Study Level:
      <select name="studyLevel" value={formData.studyLevel} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="Undergraduate">Undergraduate</option>
        <option value="Postgraduate">Postgraduate</option>
        <option value="PhD">PhD</option>
      </select>
    </label>
    <label>
      Age:
      <input type="number" name="age" value={formData.age} onChange={handleChange} required />
    </label>
  </div>

  <div className={` ${itsfrontpage? 'frontpagebottombutton':'bottombutton'}`}>
    <button className='submit' type="submit">Submit</button>
  {!itsfrontpage &&(
      <button type="button" className='submit' onClick={close}>Close</button>
  )}
  </div>
</form>


  );
};

export default AbroadStudentForm;
