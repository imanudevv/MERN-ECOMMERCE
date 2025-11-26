import '../componentStyles/Footer.css'
import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram } from '@mui/icons-material'

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-container">
        {/*section1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><Phone fontSize='small' />Phone : +9207886169</p>
          <p><Mail fontSize='small' />Email : anuanudev100@gmail.com</p>
        </div>

        {/*section2 */}
        <div className="footer-section social">
          <h3>Follow Me</h3>
          <div className="social-links">
            <a href="" target='_blank'>
              <GitHub className='social-icon' />
            </a>
            <a href="" target='_blank'>
              <LinkedIn className='social-icon' />
            </a>
            <a href="" target='_blank'>
              <YouTube className='social-icon' />
            </a>
            <a href="" target='_blank'>
              <Instagram className='social-icon' />
            </a>
          </div>
        </div>

        {/*section3 */}
           <div className="footer-section about">
            <h3>About</h3>
            <p>Providing Web Development Toutorial And Courses to Help You Grow Your Skill</p>
           </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Developer-Anudev . All right reserved</p>
      </div>
    </footer>
  )
}

export default Footer