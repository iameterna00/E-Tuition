import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      name: 'Sita Sharma',
      text: 'Kube helped me connect with the best teachers. Mero sikai yatra sajilo ra ramailo bhayo.',
    },
    {
      name: 'Rajesh Thapa',
      text: 'A modern platform in Nepal I am proud of.',
    },
    {
      name: 'Anita K.C.',
      text: 'High quality content and supportive mentors. teacher haru dherai experienced ra helpful hunu huncha.',
    },
    {
      name: 'Bikash Neupane',
      text: 'I learned a lot of stuff because of kube, thank you',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`about-section ${isVisible ? 'fade-in' : 'fade-out'}`}
    >
      <h1>About Kube</h1>
      <p>
        Kube is an innovative platform designed to connect students with top-tier educators.
      </p>

      <div className="stats-container">
        <div className="stat">
          <h2>500+</h2>
          <p>Expert Teachers</p>
        </div>
        <div className="stat">
          <h2>6000+</h2>
          <p>Happy Users</p>
        </div>
        <div className="stat">
          <h2>95%</h2>
          <p>Student Satisfaction</p>
        </div>
      </div>

      <h2 className="testimonial-title">Feedback</h2>
      <div className="testimonials">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial fade-in">
            <p className="testimonial-text">"{t.text}"</p>
            <p className="testimonial-name">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
