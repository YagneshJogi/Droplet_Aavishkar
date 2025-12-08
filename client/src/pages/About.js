// src/pages/About.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 20px 40px;

  @media (max-width: 640px) {
    padding: 22px 14px 32px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: 640px) {
    font-size: 1.7rem;
  }
`;

const Lead = styled.p`
  margin: 0 0 24px;
  max-width: 800px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  }
`;

const SectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SectionCard = styled.section`
  background: rgba(15, 23, 42, 0.88);
  border-radius: 20px;
  padding: 20px 20px 18px;
  border: 1px solid rgba(148, 163, 184, 0.26);
  box-shadow:
    0 22px 45px rgba(15, 23, 42, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SectionTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 1.15rem;
  font-weight: 700;
`;

const SectionBody = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    margin-bottom: 10px;
  }

  ul {
    margin: 6px 0 0 16px;
    padding: 0;
  }

  li {
    margin-bottom: 4px;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.4);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: 6px;
  margin-top: 4px;

  @media (min-width: 640px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
    column-gap: 22px;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  font-size: 0.93rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SpecLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  &::after {
    content: ':';
  }
`;

const SpecValue = styled.span`
  flex: 1;
`;

// =================== COMPONENT ===================

function About() {
  return (
    <Container>
      <PageTitle>About Droplet</PageTitle>
      <Lead>
        Droplet is a smart water quality monitoring system that reads live data
        from sensors, stores it in Firebase Realtime Database, classifies
        pollution levels using a machine–learning model and generates
        technical PDF reports for each sample.
      </Lead>

      <Grid>
        {/* LEFT COLUMN */}
        <SectionColumn>
          <SectionCard>
            <SectionTitle>System Overview</SectionTitle>
            <SectionBody>
              <p>
                Droplet continuously monitors temperature, TDS, turbidity,
                dissolved oxygen and pH using an ESP32 microcontroller. Every
                reading is pushed to Firebase Realtime Database and displayed on
                a responsive React.js dashboard.
              </p>
              <p>
                The system can classify water into categories such as{' '}
                <strong>Good Water, Sewage, Agricultural Runoff</strong> and{' '}
                <strong>Chemical Intrusion</strong>. Each sample is time-stamped,
                logged and available for analysis, trend monitoring and
                on-demand PDF reporting.
              </p>
              <TagRow>
                <Tag>ESP32</Tag>
                <Tag>Firebase RTDB</Tag>
                <Tag>React.js Dashboard</Tag>
                <Tag>PDF Reports</Tag>
              </TagRow>
            </SectionBody>
          </SectionCard>

          <SectionCard>
            <SectionTitle>Sensor Integration</SectionTitle>
            <SectionBody>
              <p>
                Droplet integrates a compact sensor stack to capture key water
                health indicators:
              </p>
              <ul>
                <li>
                  <strong>Temperature (DS18B20)</strong> – used to compensate TDS
                  and DO readings and understand thermal conditions.
                </li>
                <li>
                  <strong>TDS sensor</strong> – measures Total Dissolved Solids
                  in ppm to reflect dissolved salts and minerals.
                </li>
                <li>
                  <strong>Turbidity sensor</strong> – measures suspended
                  particles in NTU, indicating clarity or muddiness.
                </li>
                <li>
                  <strong>DO sensor</strong> – dissolved oxygen in mg/L, a key
                  parameter for aquatic life and self-purification.
                </li>
                <li>
                  <strong>pH input</strong> – entered from a meter or lab test to
                  track acidity / alkalinity.
                </li>
              </ul>
              <p>
                All readings are acquired by the ESP32 and streamed to Firebase,
                where they are used for ML-based pollution classification and
                approximate online BOD estimation.
              </p>
            </SectionBody>
          </SectionCard>
        </SectionColumn>

        {/* RIGHT COLUMN */}
        <SectionColumn>
          <SectionCard>
            <SectionTitle>Key Features</SectionTitle>
            <SectionBody>
              <ul>
                <li>
                  Real-time monitoring of <strong>temperature, TDS,
                  turbidity, DO and pH</strong>.
                </li>
                <li>
                  Dark, ocean-themed <strong>React.js</strong> dashboard optimised
                  for both desktop and mobile browsers.
                </li>
                <li>
                  <strong>Pollution classification</strong> into multiple classes
                  using a trained machine-learning model.
                </li>
                <li>
                  <strong>Online BOD approximation</strong> based on live sensor
                  values for quick screening.
                </li>
                <li>
                  Built-in <strong>BOD₅ lab calculator</strong> for DO₁ / DO₅,
                  Vs and Vt.
                </li>
                <li>
                  <strong>History page</strong> with per-sample PDF generation,
                  manual / live mode indication and delete actions.
                </li>
              </ul>
            </SectionBody>
          </SectionCard>

          <SectionCard>
            <SectionTitle>Applications</SectionTitle>
            <SectionBody>
              <ul>
                <li>River, lake, canal and tap water quality studies.</li>
                <li>
                  Campus and building tank monitoring for colleges and hostels.
                </li>
                <li>
                  Aquaculture, fish farms and hatcheries requiring quick checks.
                </li>
                <li>
                  Smart irrigation and agriculture runoff assessment.
                </li>
                <li>
                  Academic projects in IoT, embedded systems and environmental
                  engineering.
                </li>
              </ul>
            </SectionBody>
          </SectionCard>
        </SectionColumn>
      </Grid>

      {/* FULL-WIDTH TECH SPECS CARD */}
      <SectionCard style={{ marginTop: 20 }}>
        <SectionTitle>Technical Specifications</SectionTitle>
        <SectionBody>
          <SpecGrid>
            <SpecItem>
              <SpecLabel>Microcontroller</SpecLabel>
              <SpecValue>ESP32</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Sensors Integrated</SpecLabel>
              <SpecValue>
                Temperature (DS18B20), TDS, Turbidity, Dissolved Oxygen, pH
              </SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Data Transmission</SpecLabel>
              <SpecValue>Wi-Fi</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Database</SpecLabel>
              <SpecValue>Firebase Realtime Database</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Frontend</SpecLabel>
              <SpecValue>React.js responsive web dashboard</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Backend</SpecLabel>
              <SpecValue>Firebase services (RTDB, Hosting-side integration)</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Data Logging</SpecLabel>
              <SpecValue>Real-time streaming + historical storage</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Report Generation</SpecLabel>
              <SpecValue>Automated PDF water quality reports per sample</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Pollution Classification</SpecLabel>
              <SpecValue>
                Machine-learning based water quality class prediction
              </SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>BOD Support</SpecLabel>
              <SpecValue>
                Online BOD estimation and laboratory BOD₅ calculator
              </SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Deployment</SpecLabel>
              <SpecValue>
                Web app optimised for desktop and mobile browsers
              </SpecValue>
            </SpecItem>
          </SpecGrid>
        </SectionBody>
      </SectionCard>
    </Container>
  );
}

export default About;
