import React, { useState, useRef, useEffect } from 'react';
import './WorkList.css';
import { CiShare1 } from "react-icons/ci";

type WorkListProps = { 
    id: string, 
    role: string, 
    name: string, 
    logo: string, 
    description: string, 
    link?: string | undefined,
    color: string | undefined,
    scrollComponent?: any[],
    year: string,
    onClick?: (arg0: any) => void,
};

type EducationListProps = {
    year: string,
    uniName: string,
    degree: string,
};

const SCROLL_COMPONENT_WIDTH = 2400;
const ITEM_WIDTH = 600;
export default function WorkList({ id }: { id: string }) {
    const baseLogoUrl = window.location.origin + "/storage/";
    const [workListState, setWorkListState] = useState<string>('journey');
    const [scrollPosition, setScrollPosition] = useState<Record<number, number>>({});
    const scrollContainerRef = useRef<(HTMLDivElement | null)[]>([]);

    const scrollTo = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const works: WorkListProps[] = [
        { 
            id: "BSHGroup", 
            role: "Manufacturing Engineering Intern", 
            name: "BSH Group", 
            logo: "factory.jpg", 
            description: "I improved assembly processes on the production line, resulting in increased efficiency and reduced production costs.", 
            color: "#fff",
            link: "https://klientiks.ru/",
            year: "2017 - 2020",
            scrollComponent: [
                {
                    'id': 0,
                    'text': null,
                    'image': "klientiks_logo.png",
                },
                {
                    'id': 1,
                    'text': "CRM system for managing customer relationships and sales processes.", 
                    'image': null,
                },
                {
                    'id': 2,
                    'text': null, 
                    'image': "klientiks_example.png",
                },
                {
                    'id': 3,
                    'text': null, 
                    'image': "klientiks_example2.png",
                },
            ] 
        },
        { 
            id: "KlientiksCRM", 
            role: "Full-stack developer", 
            name: "KlientiksCRM", 
            logo: "klientiks_example_7.jpg", 
            description: "I successfully released a new version of the product, performing extensive testing and quality assurance checks.", 
            color: "#fff",
            link: "https://klientiks.ru/",
            year: "2020-2021",
            scrollComponent: [
                {
                    'id': 0,
                    'text': null,
                    'image': "klientiks_logo.png",
                },
                {
                    'id': 1,
                    'text': "CRM system for managing customer relationships and sales processes.", 
                    'image': null,
                },
                {
                    'id': 2,
                    'text': null, 
                    'image': "klientiks_example.png",
                },
                {
                    'id': 3,
                    'text': null, 
                    'image': "klientiks_example2.png",
                },
            ] 
        },
        { 
            id: "KlientiksCRM", 
            role: "Full-stack Software Developer", 
            name: "KlientiksCRM", 
            logo: "klientiks_example_6.jpg", 
            description: "I implemented front-end and back-end solutions for a scalable CRM system that replaces ten different business applications, allowing users to schedule appointments, call clients, and generate financial reports.", 
            color: "#fff",
            link: "https://klientiks.ru/",
            year: "2020-2023",
            scrollComponent: [
                {
                    'id': 0,
                    'text': null,
                    'image': "klientiks_logo.png",
                },
                {
                    'id': 1,
                    'text': "CRM system for managing customer relationships and sales processes.", 
                    'image': null,
                },
                {
                    'id': 2,
                    'text': null, 
                    'image': "klientiks_example.png",
                },
                {
                    'id': 3,
                    'text': null, 
                    'image': "klientiks_example2.png",
                },
            ] 
        },
        { 
            id: "RTMIS", 
            role: "Full-stack Software Developer", 
            name: "RTMIS", 
            logo: "rtmis_example_2.jpg", 
            description: "I maintained and refactored laboratory management software, developing new features and reducing technical debt.", 
            color: "#006aec",
            link: "https://rtmis.ru/",
            year: "2022-2025",
            scrollComponent: [
                {
                    'id': 0,
                    'text': null,
                    'image': "rtmis_logo.svg",
                },
                {
                    'id': 1,
                    'text': "Huge healthcare system for managing patient records, appointments, and medical data.", 
                    'image': null,
                },
                {
                    'id': 2,
                    'text': null, 
                    'image': "rtmis_example.jpg",
                },
                {
                    'id': 3,
                    'text': null, 
                    'image': "rtmis_example_2.jpg",
                },
            ]
        },
        { 
            id: "ownproj", 
            role: "Full-stack Software Developer", 
            name: "Own projects", 
            logo: "own_example.jpg", 
            description: "Here I create innovative solutions for my own projects.", 
            color: "#006aec",
            year: "2025 - present",
            
            onClick: () => scrollTo('projects'),
            scrollComponent: [
                {
                    'id': 0,
                    'text': null,
                    'image': "rtmis_logo.svg",
                },
                {
                    'id': 1,
                    'text': "Huge healthcare system for managing patient records, appointments, and medical data.", 
                    'image': null,
                },
                {
                    'id': 2,
                    'text': null, 
                    'image': "rtmis_example.jpg",
                },
                {
                    'id': 3,
                    'text': null, 
                    'image': "rtmis_example_2.jpg",
                },
            ]
        },
    ];

    const educationList: EducationListProps[] = [
        {
            year: '2014-2018',
            uniName: 'Saint Petersburg Electrotechnical University "LETI"',
            degree: 'BSc Instrumentation technology',
        },
        {
            year: '2018-2020',
            uniName: 'Saint Petersburg Electrotechnical University "LETI"',
            degree: 'MSc Instrumentation technology',
        }
    ];
    const handleScroll = (index: number, step: number) => {  
        setScrollPosition((prev: any) => {
            let currentScrollPosition = prev[index] || 0;
            let newScrollPosition = currentScrollPosition + step;

            if (newScrollPosition > SCROLL_COMPONENT_WIDTH) newScrollPosition = 0;
            if (!scrollContainerRef.current[index]) return;
            scrollContainerRef.current[index].scrollLeft = newScrollPosition;

            console.log({
                prev,
                step,
                newScrollPosition,
            });

            return {
                ...prev[index],
                [index]: newScrollPosition

            };
        });
    };

    const flipCard = () => {

    }

    useEffect(()=>{
        // scroll work element
        const interval = setInterval(() => {
            for(let i = 0; i < scrollContainerRef.current.length; i++) {
                handleScroll(i, ITEM_WIDTH);
            }          
        }, 3000);

        return () => clearInterval(interval);
    },[]);

    return (
    <div className="page-block work-list" id={id}>
        <div className="widget-title">MY EXPERIENCE</div>
        <div className="experience-switch">
            <div className={`${workListState === 'journey' ? ' active': ''} `} onClick={()=>setWorkListState('journey')}>Journey</div>
            <div className={`${workListState === 'edu'  ? ' active': ''}`} onClick={()=>setWorkListState('edu')}>Education</div>
        </div>
        {workListState === 'journey' && (
            <div className="work-list-timeline">
                {works.reverse().map((item, i)=>(
                     <div className={`container-set ${i % 2 === 0 ? "":"right"}`} key={i}>
                        <div className={`container ${i % 2 === 0 ? "":"right"}`}>
                            <h2>{item.year}</h2>
                            <p>{item.role}</p>
                            <a href={`${item.link || "#"}`} onClick={item.onClick}>{item.name} <CiShare1 /></a>
                        </div>
                        <div className="container no-point">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="front-card">
                                        <img src={`${baseLogoUrl}${item.logo}`} alt={item.id} />
                                    </div>
                                    <div className="back-card">
                                        <div className="back-card-content">{item.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>   
                ))}     
            </div>
        )}
        {workListState === 'edu' && (
            <div className="edu-list-timeline">
                {educationList.reverse().map((item, i) => (
                    <div className="container" key={i}>
                        <h2>{item.year}</h2>
                        <div>{item.uniName}</div>
                        <p>{item.degree}</p>
                    </div>
                ))}
            </div>
        )}
        
    </div>
    );
}