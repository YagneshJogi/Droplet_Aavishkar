import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 0.5rem;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Icon = styled.div`
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 99, 235, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0;
`;

const Text = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 1rem;
  color: #4b5563;

  li {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: "•";
      color: #2563eb;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

const SubTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "→";
    color: #2563eb;
    font-weight: bold;
  }
`;

const Table = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  }

  th {
    background: rgba(37, 99, 235, 0.1);
    color: #1e40af;
    font-weight: 600;
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr {
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const ExpandableSection = styled(motion.div)`
  overflow: hidden;
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    color: #1e40af;
  }

  svg {
    transition: transform 0.3s ease;
    transform: rotate(${props => props.isExpanded ? '180deg' : '0deg'});
  }
`;

const SystemInfo = () => {
  const [expandedSections, setExpandedSections] = useState({
    sensorIntegration: false,
    hardware: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TitleWrapper>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
            </svg>
          </Icon>
          <Title>System Overview</Title>
        </TitleWrapper>
        <Text>
          This project is a real-time IoT-based water quality monitoring system designed using the ESP32 microcontroller. 
          It continuously monitors and displays four key parameters that indicate water health:
        </Text>
        <List>
          <li>Temperature (via DS18B20 sensor)</li>
          <li>TDS (Total Dissolved Solids)</li>
          <li>Dissolved Oxygen (DO)</li>
          <li>Turbidity</li>
        </List>
      </Card>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TitleWrapper>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19.29 17.29L18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.9 0 1.34-1.08.71-1.71zM16 17H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2z"/>
            </svg>
          </Icon>
          <Title>Sensor Integration</Title>
        </TitleWrapper>
        <div>
          <SubTitle>DS18B20</SubTitle>
          <Text>Provides accurate temperature readings which are essential for compensating other sensor outputs like TDS and DO.</Text>
          
          <ExpandButton 
            onClick={() => toggleSection('sensorIntegration')}
            isExpanded={expandedSections.sensorIntegration}
          >
            {expandedSections.sensorIntegration ? 'Show Less' : 'Show More'} 
            <span>▼</span>
          </ExpandButton>

          <ExpandableSection
            animate={{ height: expandedSections.sensorIntegration ? 'auto' : 0 }}
            initial={false}
          >
            <SubTitle>TDS Sensor</SubTitle>
            <Text>Measures the total dissolved solids in water using a median filter for stability, and applies temperature compensation.</Text>
            
            <SubTitle>DO Sensor</SubTitle>
            <Text>Calculates dissolved oxygen using a voltage-to-DO conversion based on a temperature-dependent saturation table.</Text>
            
            <SubTitle>Turbidity Sensor</SubTitle>
            <Text>Outputs raw ADC values, which are converted to NTU (Nephelometric Turbidity Units) using two calibration methods:</Text>
            <List>
              <li>A linear model based on manual calibration</li>
              <li>A quadratic model derived from manufacturer data for improved accuracy</li>
            </List>
          </ExpandableSection>
        </div>
      </Card>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TitleWrapper>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
            </svg>
          </Icon>
          <Title>Features</Title>
        </TitleWrapper>
        <List>
          <li>Sensor data is read in real-time and processed using ESP32's 12-bit ADC resolution</li>
          <li>Each reading is printed to the serial monitor for easy debugging or integration with external dashboards</li>
          <li>Code is optimized with averaging, filtering, and compensation for real-world accuracy</li>
        </List>
      </Card>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <TitleWrapper>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"/>
            </svg>
          </Icon>
          <Title>Applications</Title>
        </TitleWrapper>
        <List>
          <li>Environmental water quality testing</li>
          <li>Aquaculture farms</li>
          <li>Smart irrigation systems</li>
          <li>Research and educational purposes</li>
        </List>
      </Card>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <TitleWrapper>
          <Icon>🔧</Icon>
          <Title>Hardware Implementation</Title>
        </TitleWrapper>
        <Text>
          The water quality monitoring system is built around the ESP32 microcontroller, chosen for its powerful processing capabilities 
          and integrated Wi-Fi/Bluetooth, making it ideal for IoT applications.
        </Text>
        
        <ExpandButton 
          onClick={() => toggleSection('hardware')}
          isExpanded={expandedSections.hardware}
        >
          {expandedSections.hardware ? 'Show Less' : 'Show More'} 
          <span>▼</span>
        </ExpandButton>

        <ExpandableSection
          animate={{ height: expandedSections.hardware ? 'auto' : 0 }}
          initial={false}
        >
          <SubTitle>Components Used</SubTitle>
          <List>
            <li>ESP32 Dev Board</li>
            <li>DS18B20 Waterproof Temperature Sensor</li>
            <li>TDS Sensor Module</li>
            <li>Dissolved Oxygen (DO) Sensor</li>
            <li>Turbidity Sensor</li>
            <li>Resistors, Wires, and Breadboard/PCB</li>
            <li>Power Supply (Battery or USB)</li>
          </List>

          <SubTitle>Sensor Connections</SubTitle>
          <Table>
            <StyledTable>
              <thead>
                <tr>
                  <th>Sensor</th>
                  <th>ESP32 Pin</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DS18B20 (Temp)</td>
                  <td>GPIO 25</td>
                  <td>1-wire protocol, needs 4.7kΩ pull-up</td>
                </tr>
                <tr>
                  <td>TDS Sensor</td>
                  <td>GPIO 35</td>
                  <td>Analog input</td>
                </tr>
                <tr>
                  <td>DO Sensor</td>
                  <td>GPIO 34</td>
                  <td>Analog input</td>
                </tr>
                <tr>
                  <td>Turbidity Sensor</td>
                  <td>GPIO 32</td>
                  <td>Analog input</td>
                </tr>
              </tbody>
            </StyledTable>
          </Table>

          <SubTitle>Setup Steps</SubTitle>
          <List>
            <li>Connect sensors to the specified GPIO pins on the ESP32</li>
            <li>Power the sensors using the 3.3V or 5V rail, depending on individual requirements</li>
            <li>Use the temperature sensor for real-time compensation of TDS and DO readings</li>
            <li>Apply signal conditioning in the code using averaging filters and calibration equations</li>
            <li>View all sensor readings in real-time using the serial monitor for debugging and analysis</li>
          </List>

          <SubTitle>Calibration</SubTitle>
          <List>
            <li>The turbidity sensor is calibrated using both manual testing and a quadratic model for increased accuracy</li>
            <li>The TDS sensor uses a polynomial equation with built-in temperature correction</li>
            <li>The DO sensor is calibrated using a two-point method and a temperature-dependent DO saturation table</li>
          </List>
        </ExpandableSection>
      </Card>
    </Container>
  );
};

export default SystemInfo; 