import React from 'react';
import '../About/About.css';
import ali from '../../Images/ali.JPG';
import paul from '../../Images/paul.JPG';
import bryce from '../../Images/bryce.JPG';

const About = () => {
    return (
        <div className="about-page">
            <div className="about">
                <div className="pic">
                <h1>About Us</h1>
                <p>LynkUp sole purpose is to allow family, friends, and strangers to come together.  Plan group events for sports game, outtings, or even just a chat room to meet new people.  If you want a more personal experience we allow users to create a more private group for family gatherings or reunions.  Sign up with LynkUp now and meet with new people and build new friendships</p>
                </div>
            </div>
            <div className="about">
                <h1>About the developers</h1>
            </div>
            <div className="about-ali">
                <img src={ali} id="ali" alt="this is ali"/>
                <div className="ali-text">
                <h2>Ali Alhaddad</h2>
                <p>Ali started out as student at DevMountain.  He's a 21 born in LA, California.  He's ambitious worker which is why he became the leader of this project.</p>
                </div>
            </div>
            <br/>
            <div className="about-paul">
            <div className="ali-text">
                <h2>Paul Quiroz</h2>
                <p>Ex-sherif, Paul decided it was time for a career change.  He's unknown in age but this old dog is easily able to keep up the pace with the young guys. He also started as a student at DevMountain.  It was his idea and the idea of his loving wife that allowed us to create this website.</p>
                </div>
                <img src={paul} id="paul" alt="this is paul"/>
            </div>
            <br/>
            <div className="about-bryce">
                <img src={bryce} id="bryce" alt=""/>
            <div className="ali-text">
                <h2>Bryson Akau</h2>
                <p>ALOHA!!! Hawaiian from hawaii, Just like the other two Bryson started out at DevMountain.  He's a 28 year old junior developer but has a lot to offer the LynkUp family.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
