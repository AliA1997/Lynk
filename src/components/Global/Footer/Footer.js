import React from 'react';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import TiSocialGithub from 'react-icons/lib/ti/social-github-circular';
import TiSocialGooglePlusCircular from 'react-icons/lib/ti/social-google-plus-circular';
import FaCopyright from 'react-icons/lib/fa/copyright';
import '../Footer/Footer.css';

const Footer = () => {
    return (
       <div className='main-footer-div'>
            <div className="copy">
            <h1><FaCopyright style={{fontSize: '1em'}} />2020 COPYRIGHT BY LYNKUP.</h1>
            <h2>WE HAVE NO RIGHTS RESERVED FOR THIS SITE</h2>
            </div>
           <div className="social-media">
                <TiSocialFacebookCircular style={{fontSize: '1em'}}/>
                <TiSocialGithub style={{fontSize: '1em'}} />
                <TiSocialGooglePlusCircular style={{fontSize: '1em'}} />
           </div>
       </div> 
    );
};

export default Footer;