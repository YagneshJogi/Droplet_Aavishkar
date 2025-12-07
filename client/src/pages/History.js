// src/pages/History.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue, off, remove } from 'firebase/database';
import { database } from '../firebase';
import { NotificationManager } from '../components/Notification';
import { Card } from '../components/Card';
import {
  generateWaterReport,
  previewWaterReport,
} from '../utils/generateReport';

/* ---------- LAYOUT ---------- */

const Container = styled.div`
  padding: 28px 20px 80px; /* extra bottom padding for mobile browser bars */
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px 14px 90px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Fog = styled.div`
  background: rgba(0, 0, 0, 0.18);
  padding: 18px;
  border-radius: 14px;
  backdrop-filter: blur(8px);
`;

const ReadingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReadingRow = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 640px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
`;

const SourceName = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Time = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 12px;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 900px) {
    grid-auto-flow: row;
    justify-items: flex-start;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatValue = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Badge = styled.div`
  padding: 8px 12px;
  border-radius: 999px;
  color: white;
  font-weight: 700;
  white-space: nowrap;
`;

/* ---------- BUTTONS ---------- */

const BaseBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
  }
`;

const PreviewBtn = styled(BaseBtn)`
  background: linear-gradient(180deg, #6366f1, #4f46e5);
  color: white;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.45);
`;

const PdfBtn = styled(BaseBtn)`
  background: linear-gradient(180deg, #0ea5e9, #0369a1);
  color: white;
`;

const DelBtn = styled(BaseBtn)`
  background: rgba(239, 68, 68, 0.9);
  color: white;
`;

/* ---------- HELPERS ---------- */

const pollutionColors = {
  'Good Water': '#10b981',
  Sewage: '#ef4444',
  'Agricultural Runoff': '#f59e0b',
  'Chemical Intrusion': '#8b5cf6',
  'Thermal Pollution': '#fb923c',
  Unknown: '#6b7280',
};

function colorFor(label) {
  return pollutionColors[label] || pollutionColors.Unknown;
}

function fmt(v) {
  if (v === undefined || v === null || Number.isNaN(Number(v))) return '-';
  return Number(v).toFixed(2);
}

/** Approximate BOD from a saved reading */
function estimateApproxBOD(reading) {
  const TDS = Number(reading.tds ?? 0);
  const TURB = Number(reading.turbidity ?? reading.ntu ?? 0);
  const TEM = Number(reading.temperature ?? reading.temp ?? 0);
  const DOv = Number(reading.dissolvedOxygen ?? reading.do ?? 0);

  if ([TDS, TURB, TEM, DOv].every((v) => Number.isNaN(v) || v === 0)) {
    return undefined;
  }

  let bod = 0.002 * TDS + 0.3 * TURB + 0.1 * TEM - 0.5 * DOv;
  if (bod < 0) bod = 0;
  if (bod > 40) bod = 40;
  return bod;
}

/** Build payload for PDF preview/download */
function buildReportPayload(reading) {
  const temp = reading.temperature ?? reading.temp ?? 0;
  const tds = reading.tds ?? 0;
  const ntu = reading.turbidity ?? reading.ntu ?? 0;
  const doVal = reading.dissolvedOxygen ?? reading.do ?? 0;
  const pH = reading.pH ?? 7.0;
  const label = reading.pollutionLabel ?? reading.label ?? 'Unknown';
  const approxBOD = estimateApproxBOD(reading);

  const mode = reading.mode || '';
  const isManual =
    !mode ||
    (mode.toLowerCase().includes('manual') &&
      !mode.toLowerCase().includes('live'));

  return {
    source: reading.source ?? 'Unknown',
    sensorData: { temp, tds, ntu, do: doVal, pH },
    pollutionLabel: label,
    approxBOD,
    bod5: typeof reading.bod5 === 'number' ? reading.bod5 : undefined,
    bod5Form: reading.bod5Form || {},
    isManual,
    timestamp: reading.timestamp,
  };
}

/* ---------- COMPONENT ---------- */

export default function History() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success') =>
    setNotifications((prev) => [...prev, { message, type }]);

  const removeNotification = (i) =>
    setNotifications((prev) => prev.filter((_, idx) => idx !== i));

  useEffect(() => {
    const readingsRef = ref(database, 'readings');

    const onData = (snap) => {
      const val = snap.val();
      if (!val) {
        setReadings([]);
        setLoading(false);
        return;
      }

      const arr = Object.entries(val)
        .map(([id, obj]) => ({ id, ...obj }))
        .reverse();

      setReadings(arr);
      setLoading(false);
    };

    const onErr = (err) => {
      console.error(err);
      setLoading(false);
    };

    onValue(readingsRef, onData, onErr);
    return () => off(readingsRef);
  }, []);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await remove(ref(database, `readings/${id}`));
      addNotification('Deleted entry', 'success');
    } catch (err) {
      console.error(err);
      addNotification('Delete failed', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (reading) => {
    const payload = buildReportPayload(reading);
    generateWaterReport(payload);
  };

  const handlePreview = (reading) => {
    const payload = buildReportPayload(reading);
    previewWaterReport(payload);
  };

  return (
    <Container>
      <Header>
        <Title>Historical Readings</Title>
      </Header>

      <Fog>
        {loading ? (
          <div style={{ color: 'rgba(255,255,255,0.9)' }}>Loading...</div>
        ) : (
          <ReadingList>
            {readings.length === 0 ? (
              <div style={{ color: 'rgba(255,255,255,0.9)' }}>
                No readings found
              </div>
            ) : (
              readings.map((r) => {
                const temp = r.temperature ?? r.temp ?? null;
                const tds = r.tds ?? null;
                const ntu = r.turbidity ?? r.ntu ?? null;
                const doVal = r.dissolvedOxygen ?? r.do ?? null;
                const pH = r.pH ?? null;
                const label = r.pollutionLabel ?? r.label ?? 'Unknown';

                return (
                  <ReadingRow key={r.id}>
                    <Left>
                      <SourceName>{r.source ?? 'Unknown'}</SourceName>
                      <Time>
                        {r.timestamp
                          ? new Date(r.timestamp).toLocaleString()
                          : '-'}
                      </Time>

                      <StatsGrid>
                        <Stat>
                          <StatLabel>Temp</StatLabel>
                          <StatValue>{fmt(temp)} °C</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>TDS</StatLabel>
                          <StatValue>{fmt(tds)} ppm</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>Turbidity</StatLabel>
                          <StatValue>{fmt(ntu)} NTU</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>Dissolved O₂</StatLabel>
                          <StatValue>{fmt(doVal)} mg/L</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>pH</StatLabel>
                          <StatValue>{fmt(pH)}</StatValue>
                        </Stat>
                      </StatsGrid>
                    </Left>

                    <Right>
                      <Badge style={{ background: colorFor(label) }}>
                        {label}
                      </Badge>

                      <PreviewBtn onClick={() => handlePreview(r)}>
                        Preview
                      </PreviewBtn>

                      <PdfBtn onClick={() => handleDownload(r)}>
                        Download
                      </PdfBtn>

                      <DelBtn
                        onClick={() => handleDelete(r.id)}
                        disabled={deleting === r.id}
                      >
                        {deleting === r.id ? 'Deleting...' : 'Delete'}
                      </DelBtn>
                    </Right>
                  </ReadingRow>
                );
              })
            )}
          </ReadingList>
        )}
      </Fog>

      <NotificationManager
        notifications={notifications}
        onRemove={removeNotification}
      />
    </Container>
  );
}
