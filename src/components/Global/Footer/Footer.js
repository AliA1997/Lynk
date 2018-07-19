import React from 'react';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import TiSocialGithub from 'react-icons/lib/ti/social-github-circular';
import TiSocialGooglePlusCircular from 'react-icons/lib/ti/social-google-plus-circular';
import FaCopyright from '/react-icons/lib/fa/copyright';
import '../Footer/Footer.css';

const Footer = () => {
    return (
       <div className='main-footer-div'>
            <div className="copy">
                <h1><FaCopyright style={{fontSize: '2em'}} />2020 COPYRIGHT BY LYNKUP.  WE HAVE NO RIGHTS RESERVED FOR THIS SITE</h1>
            </div>
           <div className="social-media">
                <TiSocialFacebookCircular style={{fontSize: '2em'}}/>
                <TiSocialGithub style={{fontSize: '2em'}} />
                <TiSocialGooglePlusCircular style={{fontSize: '2em'}} />
           </div>
       </div> 
    );
};

export default Footer;