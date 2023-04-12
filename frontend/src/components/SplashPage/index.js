import { useHistory } from 'react-router-dom';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { DownloadSimple } from "phosphor-react";
import { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import './SplashPage.css';
import { useDispatch, useSelector } from 'react-redux';


function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleOnLoginSubmit = () => {
        history.push(`/login`);
    };

    const handleOnSignUpSubmit = () => {
        history.push(`/register`);
    };

    Aos.init();

    // const sessionUser = useSelector(state => state.session.user);

    return (
        <div id="homepage">
            <div id="background-header">

                <nav id="home-nav">
                    <div id="home-nav-left">
                        <span className="material-icons discord-icon"
                            style={{ color: "white", fontSize: 35 }}>discord</span>
                        <span>&nbsp;&nbsp;MockCord</span>
                    </div>
                    <ul id="home-nav-center">
                        {/* <li>Download</li>
                        <li>Nitro</li>
                        <li>Discover</li>
                        <li>Safety</li>
                        <li>Support</li>
                        <li>Blog</li>
                        <li>Careers</li> */}
                        <div id="nav-profile-links">
                            <a href="https://github.com/kennytram/" target="_blank" rel="noreferrer"><li >Github</li></a>
                            <a href="https://www.linkedin.com/in/kennytram/" target="_blank" rel="noreferrer"><li>LinkedIn</li></a>
                        </div>
                    </ul>
                    <div id="home-nav-right">
                        <button id="home-login-button" onClick={handleOnLoginSubmit}>
                            Login
                        </button>
                    </div>
                </nav>

                <div id="home-description-box">
                    <div id="home-headline">
                        IMAGINE A PLACE...
                    </div>
                    <div id="home-description">
                        ...where you can belong to a school club, a gaming group, or a
                        worldwide art community. <br />Where just you and a handful of friends can
                        spend time together. A place that makes it easy <br />to talk every day
                        and hang out more often.
                    </div>
                    <div id="home-description-buttons">
                        {/* <button className="button white"onClick={()=>{history.push('/login')}}><DownloadSimple font={"true"} size={24} fontWeight={700} /><span>&nbsp;Download MockCord</span></button> */}
                        <button className="button black"onClick={()=>{history.push('/login')}}><span>Open MockCord in your browser</span></button>
                    </div>
                </div>
            </div>

            <div id="empty-spacer-first" />

            <div className="homepage-section" id="homepage-section-first">
                <div data-aos="fade-up" className="section" >
                    <div className="section-image" id="first-section-image" />
                    <div className="section-description-box">
                        <div className="section-headline">
                            Create an invite-only place where you belong
                        </div>
                        <div className="section-description">
                            Discord servers are organized into topic-based
                            channels where you can collaborate, share, and
                            just talk about your day without clogging up a
                            group chat.
                        </div>
                    </div>
                </div>
            </div>

            <div className="homepage-section" id="homepage-section-second">
                <div data-aos="fade-up" className="section" >
                    <div className="section-description-box">
                        <div className="section-headline">
                            Where hanging out is easy
                        </div>
                        <div className="section-description">
                            Grab a seat in a voice channel when you’re free.
                            Friends in your server can see you’re around and
                            instantly pop in to talk without having to call.
                        </div>
                    </div>
                    <div className="section-image" id="second-section-image" />

                </div>
            </div>

            <div className="homepage-section" id="homepage-section-first">
                <div data-aos="fade-up" className="section" >
                    <div className="section-image" id="third-section-image" />
                    <div className="section-description-box">
                        <div className="section-headline">
                            From few to a fandom
                        </div>
                        <div className="section-description">
                            Get any community running with moderation tools and
                            custom member access. Give members special powers,
                            set up private channels, and more.
                        </div>
                    </div>
                </div>
            </div>

            <div className="homepage-section" id="homepage-section-forth">
                <div data-aos="fade-up" className="section" >
                    <div className="section-description-box">
                        <div className="section-headline">
                            RELIABLE TECH FOR STAYING CLOSE
                        </div>
                        <div className="section-description">
                            Low-latency voice and video feels like you’re in
                            the same room. Wave hello over video, watch friends
                            stream their <br /> games, or gather up and have a drawing
                            session with screen share.
                        </div>
                    </div>
                    <div className="section-image" id="fourth-section-image" />
                </div>
            </div>

            <div className="homepage-section" id="homepage-section-fifth">
                <div data-aos="fade-up" className="section" >
                    <div id="stars" />
                    <div className="section-description-box">
                        <div className="section-headline">
                            Ready to start your journey?
                        </div>
                        <button className="button brand" onClick={()=>{history.push('/login')}}><span>Open MockCord</span></button>
                    </div>
                </div>
            </div>

            <div id="homepage-footer">
                <div id="footer-section">
                    <div id="main-footer-column">
                        <div id="main-footer-headline">
                            IMAGINE A PLACE
                        </div>
                        <div id="language-selection">
                            <div id="flag-usa" />
                            English, USA
                            {/* <div id="caret-down" /> */}
                        </div>
                        <ul id="social-media-icons">
                            {/* <li id="twitter"><TwitterIcon sx={{ color: "white" }} /></li>
                            <li id="instagram"><InstagramIcon sx={{ color: "white" }} /></li>
                            <li id="facebook"><FacebookIcon sx={{ color: "white" }} /></li>
                            <li id="youtube"><YouTubeIcon sx={{ color: "white", fontSize: "28px" }} /></li> */}
                        </ul>
                    </div>

                    <ul className="footer-column">
                        {/* <li>Product</li>
                        <li>Download</li>
                        <li>Nitro</li>
                        <li>Status</li> */}
                    </ul>

                    <ul className="footer-column">
                        {/* <li>Company</li>
                        <li>About</li>
                        <li>Jobs</li>
                        <li>Branding</li>
                        <li>Newsroom</li> */}
                    </ul>

                    <ul className="footer-column">
                        {/* <li>Resources</li>
                        <li>College</li>
                        <li>Support</li>
                        <li>Safety</li>
                        <li>Blog</li>
                        <li>Feedback</li>
                        <li>Build</li>
                        <li>StreamKit</li>
                        <li>Creators</li>
                        <li>Community</li> */}
                    </ul>

                    <ul className="footer-column">
                        {/* <li>Policies</li>
                        <li>Terms</li>
                        <li>Privacy</li>
                        <li>Cookie Settings</li>
                        <li>Guidelines</li>
                        <li>Acknowledgements</li>
                        <li>Licenses</li>
                        <li>Moderation</li> */}
                    </ul>

                </div>

                <div id="footer-end">
                    <div id="footer-line" />
                    <div id="footer-logo">
                        <span className="material-icons discord-icon"
                            style={{ color: "white", fontSize: 35 }}>discord</span>
                        <span>&nbsp;&nbsp;MockCord</span>
                    </div>
                    <div id="footer-button">
                        <button className="button brand" onClick={handleOnSignUpSubmit}>Sign Up</button>
                    </div>
                </div>

            </div>

        </div>
    );

}

export default SplashPage;