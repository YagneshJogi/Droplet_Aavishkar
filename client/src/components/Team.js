import React from 'react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Role = styled.div`
  color: #2563eb;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 600px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  color: #2563eb;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: #f1f5f9;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
`;

const Team = () => {
  return (
    <TeamContainer>
      <Section>
        <Title>Our Team</Title>
        <Description>
          We are a team of four driven and passionate individuals, working together to build an innovative 
          IoT-based water monitoring system. Our combined expertise in both software and hardware domains 
          allows us to deliver a seamless and intelligent solution that addresses real-world water 
          management challenges.
        </Description>
        
        <TeamGrid>
          <TeamMember>
            <MemberName>Yagnesh Jogi</MemberName>
            <Role>Full Stack Developer</Role>
            <Description>
              Specializes in React.js, Node.js, and Firebase integration. Responsible for implementing 
              real-time data visualization, system architecture, and full-stack development of the web 
              and mobile application.
            </Description>
            <ContactInfo>
              <ContactLink href="https://github.com/yagneshjogi" target="_blank" rel="noopener noreferrer">
                GitHub
              </ContactLink>
            </ContactInfo>
          </TeamMember>

          <TeamMember>
            <MemberName>Atharv Kulkarni</MemberName>
            <Role>Full-Stack Developer</Role>
            <Description>
              Focuses on backend development and database management. Handles API integration, data processing, 
              and ensures smooth communication between the IoT devices and the cloud platform.
            </Description>
            <ContactInfo>
              <ContactLink href="https://github.com/atharvkulkarni" target="_blank" rel="noopener noreferrer">
                GitHub
              </ContactLink>
            </ContactInfo>
          </TeamMember>

          <TeamMember>
            <MemberName>Manaswa Mahalunge</MemberName>
            <Role>Hardware Development Lead</Role>
            <Description>
              Oversees the hardware integration and sensor calibration. Expert in ESP32 programming and 
              sensor interfacing. Ensures accurate data collection and system reliability.
            </Description>
            <ContactInfo>
              <ContactLink href="https://github.com/Manaswa" target="_blank" rel="noopener noreferrer">
                GitHub
              </ContactLink>
            </ContactInfo>
          </TeamMember>

          <TeamMember>
            <MemberName>Apoorva Ghyare</MemberName>
            <Role>Hardware Engineer</Role>
            <Description>
              Specializes in circuit design and sensor optimization. Handles physical system assembly and 
              testing. Ensures proper sensor calibration and maintains hardware documentation.
            </Description>
            <ContactInfo>
              <ContactLink href="https://github.com/Apoopng" target="_blank" rel="noopener noreferrer">
                GitHub
              </ContactLink>
            </ContactInfo>
          </TeamMember>
        </TeamGrid>
      </Section>

      
    </TeamContainer>
  );
};

export default Team; 