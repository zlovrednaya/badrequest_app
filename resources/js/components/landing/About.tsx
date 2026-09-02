import React from "react";
import SkillList from "./SkillList.tsx";
import { GrLocationPin } from "react-icons/gr";
import { CiLinkedin } from "react-icons/ci";
import { FaLaptopCode } from "react-icons/fa6";
import { GrCycle } from "react-icons/gr";
import { LuShield } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import SocialList from "./SocialList.tsx";



type AboutFormProps = {
  id: string,
  onOpenContactForm: () => void,
}
export default function About({ id, onOpenContactForm }: AboutFormProps) {
  return (
    <div className="page-block about-tab" id={id}>
      <div className="name-title">Daria Hostieva</div>
      <div className="about-main-form">
        <div className="country-title highlight-text">
          <GrLocationPin /> Based in The Netherlands
        </div>
        
        <p>5+ years of software development experience</p>
        <p className="importnant-text">Passionate about development, I have contributed to both startups and established companies, gaining experience in agile and traditional development environments.</p>
        
        <div className="credo-component">
          <div className="skill-title highlight-text">Credo</div>
          <div className="credo-list">
            <div><FaLaptopCode /> Create</div>
            <div><GrCycle/> Refactor</div>
            <div><LuShield /> Maintain</div>
          </div>
        </div>

        
      </div>
      
      <SkillList />
      <div className="social-buttons">
        <div className="component-button linkedin-link">
            <a href="https://www.linkedin.com/in/daria-hostieva/" target="_blank" rel="noopener noreferrer">
              <CiLinkedin /> Discover my LinkedIn
            </a>
        </div>

        <div className="component-button linkedin-link">
            <a href="https://github.com/zlovrednaya/" target="_blank" rel="noopener noreferrer">
              <FaGithub /> Check my GitHub
            </a>
        </div>
        <div className="component-button component-button-inverted" onClick={onOpenContactForm}>Contact me</div>
      </div>

      
      
    </div>
  );
}
