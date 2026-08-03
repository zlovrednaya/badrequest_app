import React, { useState, useRef, useEffect } from 'react';
import './WorkList.css';

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
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
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

    const handleScroll = (step: number) => {
        
        setScrollPosition((prev: any) => {
            let newScrollPosition = prev + step;

            if (newScrollPosition > SCROLL_COMPONENT_WIDTH) newScrollPosition = 0;
            if (!scrollContainerRef.current) return;
            scrollContainerRef.current.scrollLeft = newScrollPosition;

            console.log({
                prev,
                step,
                newScrollPosition,
            });

            return newScrollPosition;
        });

        

        
    };

    useEffect(()=>{
        // scroll work element
        const interval = setInterval(() => {
            handleScroll(ITEM_WIDTH);           
        }, 3000);

        return () => clearInterval(interval);
    },[]);

    return (
    <div className="page-block work-list" id={id}>
        <div className="work-list-title">MY EXPERIENCE</div>
        <div className="work-list-container">
            {works.map((work) => (
            <div className="work-item"
                id={work.id}
                key={work.id}
                style={{backgroundColor: work.color? work.color: '#fff'}}
            >
                
                <div className="works-container" >
                        {work.scrollComponent && work.scrollComponent.length > 0 && (
                            <div className="scrollbar"
                                ref={scrollContainerRef}
                                style={{
                                    width: ITEM_WIDTH + "px",
                                    overflowX: "scroll",
                                    scrollBehavior: "smooth",
                                }} 
                            >
                                <div className="works-content-box" >
                                    {work.scrollComponent.map((item) => (
                                        <div key={item.id} className="works-scroll-item">
                                            {item.image && <img src={`${baseLogoUrl}${item.image}`} alt={work.name} />}
                                            {item.text && <p>{item.text}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={() => handleScroll(-ITEM_WIDTH)}>←</button>
                        <button className="btn btn-primary" onClick={() => handleScroll(ITEM_WIDTH)}>→</button>
                    </div>
                </div>


                <h3>{work.role}</h3>
                <h3>{work.name}</h3>
                <p>{work.description}</p>
            </div>
        ))}
        </div>
    </div>
    );
}