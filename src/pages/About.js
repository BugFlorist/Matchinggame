import React from 'react';

function About (){
    return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        <h1>About Us</h1>
        <p>
            Welcome to our application! We are dedicated to providing the best user experience and innovative solutions for our users.
        </p>
        <h2>Our Mission</h2>
        <p>
            To empower individuals and organizations through intuitive and effective digital tools.
        </p>
        <h2>Our Team</h2>
        <p>
            Our team consists of passionate developers, designers, and problem-solvers who strive for excellence in every project.
        </p>
        <h2>Contact</h2>
        <p>
            Have questions or feedback? Reach out to us at <a href="mailto:info@example.com">info@example.com</a>.
        </p>
    </div>
    );
}

export default About;