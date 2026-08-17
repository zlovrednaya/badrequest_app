import React from "react";
import SkillList from "./SkillList.tsx";
import { GrLocationPin } from "react-icons/gr";
import { CiLinkedin } from "react-icons/ci";


export default function About({ id }: { id: string }) {
  return (
    <div className="page-block about-tab" id={id}>
      <div className="name-title">Daria Hostieva</div>
      <div className="country-title red-text">
        <GrLocationPin /> Based in The Netherlands
      </div>
      <p>4+ years of software development experience</p>
      <p>I worked in startups and established companies, gaining experience in both agile and traditional development environments.</p>
      <div>
        <div className="skill-title red-text">Credo</div>
        <p>I create</p>
        <p>I refactor</p>
        <p>I maintain</p>
      </div>

      <div className="linkedin-link">
        <a href="https://www.linkedin.com/in/daria-hostieva/" target="_blank" rel="noopener noreferrer">
          <CiLinkedin /> Discover my LinkedIn
        </a>
      </div>
      
      
      <SkillList />
      

      
    </div>
  );
}
