import React from "react";
import SkillList from "./SkillList.tsx";

export default function About({ id }: { id: string }) {
  return (
    <div className="page-block about-tab" id={id}>
      <h2 className="name-title">Daria Hostieva</h2>
      <p>4+ years of software development experience</p>
      <div>
        <p>I create</p>
        <p>I refactor</p>
        <p>I maintain</p>
      </div>
      <p>Discover my LinkedIn</p>
      <div className="skill-list">
        <SkillList />
      </div>
    </div>
  );
}
