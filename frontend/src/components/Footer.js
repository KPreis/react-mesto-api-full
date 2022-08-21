import React from 'react';

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">© {year} Mesto Russia created by KPreis</p>
    </footer>
  );
}

export default Footer;
