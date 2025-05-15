import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.paragraph}>
        <strong>Last updated:</strong> May 16, 2025
      </p>

      <p style={styles.paragraph}>
        KUBE ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
        outlines how we collect, use, and safeguard your information when you interact with our chatbot
        through our website, Facebook Messenger, or other platforms.
      </p>

      <h2 style={styles.subheading}>1. Information We Collect</h2>
      <ul style={styles.list}>
        <li><strong>Messages:</strong> The content of the messages you send to the chatbot.</li>
        <li><strong>Identifiers:</strong> Facebook user ID (if using Messenger), or session ID (for web).</li>
        <li><strong>Device Information:</strong> IP address, browser type, and timestamp (for analytics and security).</li>
      </ul>

      <h2 style={styles.subheading}>2. How We Use Your Information</h2>
      <ul style={styles.list}>
        <li>To provide relevant and accurate responses to your questions.</li>
        <li>To improve the chatbot’s performance and features.</li>
        <li>To ensure the platform is secure and functioning properly.</li>
      </ul>

      <h2 style={styles.subheading}>3. Data Sharing and Storage</h2>
      <p style={styles.paragraph}>
        We do not sell or share your personal data with third parties. Your messages and identifiers may be
        stored securely for the purpose of improving the assistant and providing context to ongoing
        conversations.
      </p>

      <h2 style={styles.subheading}>4. Your Rights</h2>
      <p style={styles.paragraph}>
        You can request that we delete your conversation history or personal data by contacting us at
        <a href="mailto:support@kubeai.io"> support@kubeai.io</a>.
      </p>

      <h2 style={styles.subheading}>5. Changes to This Policy</h2>
      <p style={styles.paragraph}>
        We may update this Privacy Policy from time to time. Changes will be reflected on this page with an
        updated date at the top.
      </p>

      <h2 style={styles.subheading}>6. Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions or concerns about this Privacy Policy, please contact us at
        <a href="mailto:support@kubeai.io"> support@kubeai.io</a>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  subheading: {
    fontSize: '1.5rem',
    marginTop: '2rem'
  },
  paragraph: {
    marginBottom: '1rem'
  },
  list: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem'
  }
};

export default PrivacyPolicy;
