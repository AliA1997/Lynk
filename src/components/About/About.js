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
                <h3>Ali Alhaddad (Lead Junior Developer, CEO)</h3>
                <p>Ali started out as student at DevMountain.  He's a 21 born in LA, California.  He's ambitious worker which is why he became the leader of this project.  With his go getter attitude he pushed his way working hard day and night to complete his tasks.</p>
                </div>
            </div>
            <br/>
            <div className="about-paul">
            <div className="ali-text">
                <h3>Paul Quiroz (Junior Developer, CEO)</h3>
                <p>After spending 10 years with the Maricopa County Sheriff’s Office, Paul felt it was time for a change.  It was at this point that he embarked on a new adventure as a Web Dev student at DevMountain.  Together with his partners, they began to develop Lynkup with the hopes of making the planning, organizing and communication of groups and their events easier for everyone. </p>
                </div>
                <img src={paul} id="paul" alt="this is paul"/>
            </div>
            <br/>
            <div className="about-bryce">
                <img src={bryce} id="bryce" alt=""/>
            <div className="ali-text">
                <h3>Bryson Akau (Junior Junior Developer, CEO)</h3>
                {/* <p>ALOHA!!! Bryson jumping from job to job doing different tasks from house keeping to being a network technician thought it was time to follow his dream to go into Web Development.  He joined DevMountain and ended up working with two fantastic guys doing this project.</p> */}
                <p>Bryson ( Son Bryson), born Hawaiian, is a male Saiyan and student at DevMountain working with his friends on Lynkup. Bryson is a Saiyan originally sent to Earth as an infant with the mission to destroy it, an accident alters his memory, allowing him to grow up to become Earth's greatest defender as a Web Developer, as well as the informal leader of the Dev Team. Throughout his life, he constantly strives and trains to be the greatest Web warrior possible, which has kept the Earth and the universe safe from destruction many times</p>
                </div>
            </div>
        </div>
    );
};

export default About;
