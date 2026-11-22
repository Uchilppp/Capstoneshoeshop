import { Link } from 'react-router-dom';
import footerDivider from '../assets/footer-divider.svg';
import footerBottomBg from '../assets/footer-bottom-bg.svg';

export default function Footer() {
  return (
    <footer className="site-footer" data-node-id="5701:85">
      <div className="footer-top" data-node-id="5701:90">
        <div className="container-1280 footer-columns">
          <div className="footer-col" data-node-id="5702:120">
            <h3 className="footer-col-title">GET HELP</h3>
            <ul className="footer-col-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search?category=NIKE">Nike</Link>
              </li>
              <li>
                <Link to="/search?category=ADIDAS">Adidas</Link>
              </li>
              <li>
                <Link to="/search">Contact</Link>
              </li>
            </ul>
            <img src={footerDivider} alt="" className="footer-col-divider" />
          </div>

          <div className="footer-col" data-node-id="5701:97">
            <h3 className="footer-col-title">SUPPORT</h3>
            <ul className="footer-col-list">
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/search">Contact</Link>
              </li>
              <li>
                <Link to="/">Help</Link>
              </li>
              <li>
                <Link to="/">Phone</Link>
              </li>
            </ul>
            <img src={footerDivider} alt="" className="footer-col-divider" />
          </div>

          <div className="footer-col" data-node-id="5702:128">
            <h3 className="footer-col-title">REGISTER</h3>
            <ul className="footer-col-list">
              <li>
                <Link to="/register">register</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom" data-node-id="5701:86">
        <img src={footerBottomBg} alt="" className="footer-bottom-bg" />
        <div className="container-1280 footer-bottom-inner">
          <p className="footer-copyright" data-node-id="5701:88">
            © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
          </p>
        </div>
      </div>
    </footer>
  );
}
