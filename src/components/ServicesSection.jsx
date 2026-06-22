'use client';

import { useState } from 'react';
import Image from 'next/image';

const SERVICES_DATA = [
  {
    num: '01',
    title: 'Consultation',
    description: 'We partner with you to transform raw ideas into definitive architectural strategies. Our expert advisors ensure every detail aligns with your lifestyle and future growth.',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1ikiZhEycVPG3CB1_OCXuCcmwXwbqF-kA%26sz=w1200'
  },
  {
    num: '02',
    title: 'Design & Automation',
    description: "Our design service creates smart, sustainable homes tailored to your needs. We anticipate the future, integrating modern lifestyle features with tomorrow's technology.",
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam%26sz=w1200'
  },
  {
    num: '03',
    title: 'Construction',
    description: 'Building excellence through surgical precision. We combine high-performance materials with master craftsmanship to deliver homes that stand for generations.',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK%26sz=w1200'
  },
  {
    num: '04',
    title: 'Project Management',
    description: 'Seamless delivery from vision to handover. We manage the complexities of construction, timelines, and logistics so you can focus on your future.',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk%26sz=w1200'
  },
  {
    num: '05',
    title: 'Smart Investment',
    description: 'Strategic real estate growth driven by data and architectural value. We identify high-potential opportunities that ensure your smart city investment appreciates.',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r%26sz=w1200'
  }
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="services-grid-body">
      <div className="services-list-column">
        <ul className="services-editorial-list" role="list">
          {SERVICES_DATA.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={service.title}
                className={`services-editorial-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="services-item-header">
                  <span className="services-item-number">{service.num}</span>
                  <h3 className="services-item-title">{service.title}</h3>
                </div>
                <div className="services-item-body">
                  <p className="services-item-description">
                    {service.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="services-image-column">
        <div className="services-image-wrapper">
          <div className="services-image-inner">
            <Image
              width={800}
              height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={SERVICES_DATA[activeIndex].image}
              alt={`${SERVICES_DATA[activeIndex].title} Architectural View`}
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
