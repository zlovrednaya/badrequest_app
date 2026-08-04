import React, { useState, useRef, useEffect } from 'react';
import './WorkList.css';
import { CiShare1 } from "react-icons/ci";

type WorkListProps = { 
    id: string, 
    role: string, 
    name: string, 
    logo: string, 
    description: string, 
    link: string | undefined,
    color: string | undefined,
    scrollComponent?: any[],
    year: string,
};

const SCROLL_COMPONENT_WIDTH = 2400;
const ITEM_WIDTH = 600;
export default function WorkList({ id }: { id: string }) {
    const baseLogoUrl = window.location.origin + "/storage/";
    const [scrollPosition, setScrollPosition] = useState<Record<number, number>>({});
    const scrollContainerRef = useRef<(HTMLDivElement | null)[]>([]);
    const works: WorkListProps[] = [
        { 
            id: "KlientiksCRM", 
            role: "Full-stack developer", 
            name: "KlientiksCRM", 
            logo: "klientiks_logo.png", 
            description: "CRM system for managing customer relationships and sales processes.", 
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
            role: "Full-stack developer", 
            name: "RTMIS", 
            logo: "rtmis_logo.svg", 
            description: "Huge healthcare system for managing patient records, appointments, and medical data.", 
            color: "#006aec",
            link: "https://rtmis.ru/",
            year: "2023-2023",
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

    const scrollTo = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
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
        <div className="work-list-timeline">
            <div className="container-set">
                <div className="container container-left">
                    <h2>2025 - present</h2>
                    <p>Fullstack Software Engineer</p>
                    <a href="#" onClick={() => scrollTo('widget-list')}>Own projects</a>
                </div>
                <div className="container container-right no-point">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="front-card">
                                <img src={`${baseLogoUrl}own_example.jpg`} alt="own projects example" />
                            </div>
                            <div className="back-card">
                                <div className="back-card-content">Here I create innovative solutions for my own projects.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-set">
                <div className="container container-left no-point">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="front-card">
                                <img src={`${baseLogoUrl}rtmis_example_2.jpg`} alt="rt mis example" />
                            </div>
                            <div className="back-card">
                                <div className="back-card-content">I maintained and refactored laboratory management software, developing new features and reducing technical debt.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container container-right">
                    <h2>2023 - 2025</h2>
                    <p>Full-stack Software Engineer</p>
                    <a href="https://rtmis.ru/" target="_blank" >
                        RT MIS <CiShare1 />
                    </a>
                </div>
                
            </div>
            <div className="container-set">
                <div className="container container-left">
                    <h2>2021 - 2023</h2>
                    <p>Full-stack Software Engineer</p>
                    <a href="https://klientiks.ru/" target="_blank">
                        Klientiks CRM <CiShare1 />
                    </a>
                </div>
                <div className="container container-right no-point">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="front-card">
                                <img src={`${baseLogoUrl}klientiks_example_6.jpg`} alt="klientiks example" />
                            </div>
                            <div className="back-card">
                                <div className="back-card-content">I implemented front-end and back-end solutions for a scalable CRM system that replaces ten different business applications, 
                                    allowing users to schedule appointments, call clients, and generate financial reports.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-set">
                <div className="container container-left no-point">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="front-card">
                                <img src={`${baseLogoUrl}klientiks_example_7.jpg`} alt="klientiks example" />
                            </div>
                            <div className="back-card">
                                <div className="back-card-content">I successfully released a new version of the product, performing extensive testing and quality assurance checks.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container container-right">
                    <h2>2020 - 2021</h2>
                    <p>QA Engineer</p>
                    <a href="https://klientiks.ru/" target="_blank" rel="noopener noreferrer">
                        Klientiks CRM <CiShare1 />
                    </a>
                </div>
            </div>
            <div className="container-set">
                <div className="container container-left">
                    <h2>2017 - 2020</h2>
                    <p>Manufacturing Engineering Intern</p>
                    <a href="https://www.bsh-group.com/" target="_blank" rel="noopener noreferrer">
                        BSH Group <CiShare1 />
                    </a>
                </div>
                <div className="container container-right no-point">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="front-card">
                                <img src={`${baseLogoUrl}factory.jpg`} alt="bsh example" />
                            </div>
                            <div className="back-card">
                                <div className="back-card-content">I improved assembly processes on the production line, resulting in increased efficiency and reduced production costs.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    </div>
    );
}