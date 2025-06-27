import React, { useEffect, useRef, useState } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

const Header = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (!data) return null;

  const { project, github, name, description } = data;

  const handleLinkClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = e.target.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header id="home">
      <ParticlesBg type="circle" bg={true} />

      <nav id="nav-wrap" ref={navRef}>
        <a className="mobile-btn" onClick={() => setMenuOpen(true)} href="#nav-wrap">
          Show navigation
        </a>
        <a className="mobile-btn" onClick={() => setMenuOpen(false)} href="#home">
          Hide navigation
        </a>

        <ul id="nav" className={`nav ${menuOpen ? "open" : ""}`}>
          <li className="current">
            <a className="smoothscroll" href="#home" onClick={handleLinkClick}>
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about" onClick={handleLinkClick}>
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume" onClick={handleLinkClick}>
              Resume
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#portfolio" onClick={handleLinkClick}>
              Works
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact" onClick={handleLinkClick}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <Fade bottom>
            <h1 className="responsive-headline">{name}</h1>
          </Fade>
          <Fade bottom duration={1200}>
            <h3>{description}.</h3>
          </Fade>
          <hr />
          <Fade bottom duration={2000}>
            <ul className="social">
              <a href={project} className="button btn project-btn">
                <i className="fa fa-book"></i>Project
              </a>
              <a href={github} className="button btn github-btn">
                <i className="fa fa-github"></i>Github
              </a>
            </ul>
          </Fade>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
