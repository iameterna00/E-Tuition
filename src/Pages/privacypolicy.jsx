const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-collected", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "data-sharing", title: "Data Sharing and Storage" },
  { id: "security", title: "Security of Your Information" },
  { id: "your-rights", title: "Your Rights" },
  { id: "cookies", title: "Cookies and Tracking Technologies" },
  { id: "third-parties", title: "Third-Party Services" },
  { id: "children", title: "Children's Privacy" },
  { id: "policy-changes", title: "Changes to This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

const PrivacyPolicy = () => {
  const handleScroll = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -100;  // negative means scroll up 50px before element
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};


  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <nav
        style={{
        textAlign:'start',  
          width: "280px",
          borderRight: "1px solid #ddd",
          padding: "2rem 1.5rem",
          position: "sticky",
          top: "50px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          alignItems: "flex-start",
        }}
      >
        <h2
          style={{
            width: "100%",
            fontSize: "1.8rem",
            marginBottom: "1.5rem",
            alignItems: "flex-start",
            display: "flex",
            justifyContent: "flex-start",
            fontWeight: "700",
          }}
        >
          Privacy Policy
        </h2>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {sections.map((section) => (
            <li
              key={section.id}
              style={{
                marginBottom: "1rem",
                cursor: "pointer",
                color: "rgb(0,167,228)",
                userSelect: "none",
                fontWeight: "600",
                fontSize: "1rem",
              }}
              onClick={() => handleScroll(section.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleScroll(section.id);
              }}
            >
              {section.title}
            </li>
          ))}
        </ul>
      </nav>

      <main
        style={{
          flexGrow: 1,
          textAlign: "start",
          padding: "3rem 2rem",
          maxWidth: "900px",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            marginBottom: "0.5rem",
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            color: "#666",
            marginBottom: "2rem",
          }}
        >
          <strong>Last updated:</strong> May 16, 2025
        </p>

<section id="introduction" style={{ marginBottom: "3rem" }}>
  <h2>Introduction</h2>
  <p>
    Welcome to KUBE ("we", "our", or "us"). We operate the website{" "}
    <a href="https://kubenp.com" target="_blank" rel="noopener noreferrer">
      kubenp.com
    </a>
    . This Privacy Policy describes how we collect, use, and protect
    your information when you use our services, including our chatbot,
    websites, and other platforms.
  </p>
  <p>
    <strong>eHome Tuition Academy</strong> is the brand and business that provides
    educational and tutoring services through this platform. This Privacy Policy
    applies to both KUBE and eHome Tuition services.
  </p>
</section>


        <section
          id="information-collected"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              date of birth, passport details (when applicable).
            </li>
            <li>
              <strong>Messages and Communications:</strong> The content of
              messages exchanged with our chatbot or support team.
            </li>
            <li>
              <strong>Identifiers:</strong> Facebook User ID (for Messenger),
              session IDs, and other technical identifiers.
            </li>
            <li>
              <strong>Device and Usage Data:</strong> IP address, browser type,
              device type, location data (if enabled), and interaction logs.
            </li>
          </ul>
        </section>

        <section
          id="how-we-use"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and personalize our services and chatbot responses.</li>
            <li>To communicate with you about your inquiries and our services.</li>
            <li>To improve our services and develop new features.</li>
            <li>To comply with legal obligations and prevent fraud.</li>
          </ul>
        </section>

        <section
          id="data-sharing"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Data Sharing and Storage</h2>
          <p>
            We do not sell your personal information. We may share your data with
            trusted service providers who help us operate the business, such as
            hosting, analytics, and communication services. All partners are
            obligated to keep your information confidential.
          </p>
          <p>
            Your data is stored securely on our servers with industry-standard
            protections and retained only as long as necessary.
          </p>
        </section>

        <section
          id="security"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Security of Your Information</h2>
          <p>
            We implement technical and organizational measures to protect your
            information from unauthorized access, alteration, disclosure, or
            destruction.
          </p>
        </section>

        <section
          id="your-rights"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data.
            You can also object to certain data processing. To exercise these
            rights, contact us at{" "}
            <a href="mailto:support@kubenp.com">support@kubenp.com</a>.
          </p>
        </section>

        <section
          id="cookies"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience,
            analyze usage, and provide personalized content. You can control
            cookie preferences through your browser settings.
          </p>
        </section>

        <section
          id="third-parties"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Third-Party Services</h2>
          <p>
            Our services may include links or integrations with third-party
            services. We are not responsible for their privacy practices. Please
            review their policies separately.
          </p>
        </section>

        <section
          id="children"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed at children under 13. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section
          id="policy-changes"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Updated versions
            will be posted here with a new effective date.
          </p>
        </section>

        <section
          id="contact-us"
          style={{
            marginBottom: "3rem",
          }}
        >
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
          <strong> <a href="mailto:ehometuitionnp@gmail.com">ehometuitionnp@gmail.com</a>.</strong>
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
