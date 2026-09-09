function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <h3>🎓 CampusHub</h3>

          <p>
            Your smart college life,
            all in one place.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <h4>Platform</h4>
            <a href="#">Features</a>
            <a href="#">Placements</a>
            <a href="#">Events</a>
          </div>


          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
          </div>

        </div>

      </div>


      <div className="footer-bottom">
        <p>
          © 2026 CampusHub. All rights reserved.
        </p>

        <p>
         Designed & Developed by{" "}
          <a
             href="https://sachin-web-portfolio.netlify.app/"
              target="_blank"
             rel="noopener noreferrer"
           >
              Sachin Kumar
          </a>
       </p>
      </div>

    </footer>
  );
}

export default Footer;