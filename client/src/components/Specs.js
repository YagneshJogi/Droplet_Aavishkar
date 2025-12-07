import React from 'react';
import styled from 'styled-components';

const SpecsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h3`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  width: 100%;
  text-align: center;
`;

const SubTitle = styled.h4`
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  width: 100%;
  text-align: center;
`;

const List = styled.ul`
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
  text-align: left;
  width: 100%;
  max-width: 600px;

  li {
    margin-bottom: 0.5rem;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  color: #64748b;
`;

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 1.5rem 0;
  text-align: center;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const Th = styled.th`
  background: #f8fafc;
  color: #1e293b;
  font-weight: 600;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  color: #64748b;
  text-align: center;

  &:first-child {
    font-weight: 500;
  }
`;

const Specs = () => {
  return (
    <SpecsContainer>
      <Section>
        <Title>Hardware Specifications</Title>
        <SubTitle>Core Components</SubTitle>
        <List>
          <ListItem>ESP32 Dev Board - Dual-core processor, integrated Wi-Fi/Bluetooth</ListItem>
          <ListItem>DS18B20 Waterproof Temperature Sensor (±0.5°C accuracy)</ListItem>
          <ListItem>Gravity Analog TDS Sensor (0-1000ppm range)</ListItem>
          <ListItem>Atlas Scientific DO Sensor (0-20mg/L range)</ListItem>
          <ListItem>Turbidity Sensor (0-3000 NTU range)</ListItem>
        </List>

        <SubTitle>Power and Connectivity</SubTitle>
        <List>
          <ListItem>Operating Voltage: 3.3V/5V DC</ListItem>
          <ListItem>Wi-Fi: 2.4GHz IEEE 802.11 b/g/n</ListItem>
          <ListItem>Bluetooth: v4.2 BR/EDR and BLE</ListItem>
          <ListItem>USB Type-C for programming and power</ListItem>
          <ListItem>Optional battery power support (18650 Li-ion)</ListItem>
        </List>
      </Section>

      <Section>
        <Title>Sensor Connections</Title>
        <Table>
          <thead>
            <tr>
              <Th>Sensor</Th>
              <Th>ESP32 Pin</Th>
              <Th>Interface Type</Th>
              <Th>Notes</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>DS18B20</Td>
              <Td>GPIO 25</Td>
              <Td>Digital (1-Wire)</Td>
              <Td>4.7kΩ pull-up resistor required</Td>
            </tr>
            <tr>
              <Td>TDS Sensor</Td>
              <Td>GPIO 35</Td>
              <Td>Analog</Td>
              <Td>Temperature compensated</Td>
            </tr>
            <tr>
              <Td>DO Sensor</Td>
              <Td>GPIO 34</Td>
              <Td>Analog</Td>
              <Td>Temperature calibrated</Td>
            </tr>
            <tr>
              <Td>Turbidity</Td>
              <Td>GPIO 32</Td>
              <Td>Analog</Td>
              <Td>Dual calibration models</Td>
            </tr>
          </tbody>
        </Table>
      </Section>

      <Section>
        <Title>Performance Specifications</Title>
        <SubTitle>Measurement Ranges</SubTitle>
        <List>
          <ListItem>Temperature: -10°C to +85°C (±0.5°C accuracy)</ListItem>
          <ListItem>TDS: 0-1000ppm (±2% accuracy)</ListItem>
          <ListItem>Dissolved Oxygen: 0-20mg/L (±0.2mg/L accuracy)</ListItem>
          <ListItem>Turbidity: 0-3000 NTU (±2% accuracy)</ListItem>
        </List>

        <SubTitle>System Performance</SubTitle>
        <List>
          <ListItem>Sampling Rate: 1 sample/2 seconds</ListItem>
          <ListItem>ADC Resolution: 12-bit</ListItem>
          <ListItem>Data Storage: Firebase Realtime Database</ListItem>
          <ListItem>Communication Range: Up to 50m (line of sight)</ListItem>
          <ListItem>Battery Life: Up to 12 hours (with 18650 battery)</ListItem>
        </List>
      </Section>
    </SpecsContainer>
  );
};

export default Specs; 