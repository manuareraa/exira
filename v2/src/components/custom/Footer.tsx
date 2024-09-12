import React from "react";

function Footer(props) {
  return (
    <footer className="p-4 text-white bg-black footer footer-center">
      <aside>
        <p className="text-lg">
          Copyright © {new Date().getFullYear()} - All right reserved by Exira
          Investments Pvt.
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
