// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue, push, set } from 'firebase/database';
import { database } from '../firebase';
import { NotificationManager } from '../components/Notification';
import { CardTitle, ValueDisplay } from '../components/Card';
import { useNavigate } from 'react-router-dom';

/* Container and layout */
const Container = styled.div`
  padding: 36px 28px 90px; /* extra bottom padding */
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 24px 16px 90px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const PageTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2rem;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

/* Connection badge */
const StatusBadge = styled.div`
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ connected }) =>
    connected
      ? 'linear-gradient(90deg, rgba(16,185,129,0.16), rgba(16,185,129,0.08))'
      : 'linear-gradient(90deg, rgba(239,68,68,0.16), rgba(239,68,68,0.08))'};
  color: ${({ connected }) => (connected ? '#bbf7d0' : '#fecaca')};
  border: 1px solid
    ${({ connected }) =>
      connected ? 'rgba(34,197,94,0.45)' : 'rgba(248,113,113,0.45)'};
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
`;

/* Grid layout */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-bottom: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

/* Dashboard tiles */
const Tile = styled.div`
  background: rgba(15, 23, 42, 0.78);
  border-radius: 22px;
  padding: 26px;
  box-shadow:
    0 22px 50px rgba(15, 23, 42, 0.85),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.28);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  min-height: 210px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Accent = styled.div`
  position: absolute;
  top: 16px;
  left: 22px;
  width: 70px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${(p) => p.colorStart || '#06b6d4'},
    ${(p) => p.colorEnd || '#22c1d1'}
  );
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.85);
`;

const TileWrapper = styled.div`
  position: relative;
`;

const BigTitle = styled(CardTitle)`
  font-size: 1.05rem;
  margin-bottom: 10px;
`;

const BigValue = styled(ValueDisplay)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

/* Actions row (source + buttons) */
const ActionsRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 18px;
  width: 100%;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SourceInput = styled.input`
  flex: 1;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.92);
  background: rgba(255, 255, 255, 0.96);
  font-size: 1rem;
  font-weight: 500;
  color: #020617;
  box-shadow:
    0 14px 40px rgba(15, 23, 42, 0.85),
    inset 0 2px 6px rgba(0, 0, 0, 0.12);
  outline: none;

  &::placeholder {
    color: #64748b;
  }
`;

const PHInput = styled.input`
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.92);
  background: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  color: #020617;
  outline: none;
  width: 100%;
  max-width: 140px;
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 680px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(180deg, #3b82f6, #2563eb);
  color: white;
  padding: 12px 20px;
  border-radius: 16px;
  border: 1px solid rgba(191, 219, 254, 0.6);
  font-weight: 800;
  min-width: 170px;
  cursor: pointer;
  box-shadow: 0 16px 38px rgba(37, 99, 235, 0.35);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const SaveButton = styled(PrimaryButton)`
  background: linear-gradient(180deg, #22c55e, #16a34a);
  box-shadow: 0 16px 38px rgba(34, 197, 94, 0.35);
`;

/* Manual card */
const ManualCard = styled(Tile)`
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 14px;
`;

const ManualButton = styled.button`
  background: linear-gradient(180deg, #7c3aed, #6b21a8);
  color: white;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(216, 180, 254, 0.7);
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 16px 40px rgba(124, 58, 237, 0.4);
`;

const PredictedBar = styled.div`
  margin-top: 20px;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow:
    0 20px 55px rgba(15, 23, 42, 0.95),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

/* ===== Component ===== */

function Dashboard() {
  const navigate = useNavigate();

  const [sensorData, setSensorData] = useState({
    temp: 0,
    tds: 0,
    ntu: 0,
    do: 0,
    pH: '', // manual pH
  });
  const [connected, setConnected] = useState(false);
  const [source, setSource] = useState('');
  const [pollutionLabel, setPollutionLabel] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success') =>
    setNotifications((prev) => [...prev, { message, type }]);

  const removeNotification = (i) =>
    setNotifications((prev) => prev.filter((_, idx) => idx !== i));

  // Listen to Firebase RTDB at /waterQuality
  useEffect(() => {
    const qRef = ref(database, 'waterQuality');

    const unsubscribe = onValue(
      qRef,
      (snap) => {
        const val = snap.val();
        if (!val) {
          setConnected(false);
          return;
        }
        setConnected(true);
        setSensorData((prev) => ({
          temp: Number(val.temp ?? val.temperature ?? prev.temp),
          tds: Number(val.tds ?? prev.tds),
          ntu: Number(val.ntu ?? val.turbidity ?? prev.ntu),
          do: Number(val.do ?? val.dissolvedOxygen ?? prev.do),
          // pH is manual only – do NOT overwrite user's input
          pH: prev.pH || '',
        }));
      },
      (err) => {
        console.error('RTDB error:', err);
        setConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const classifyLocal = ({ tds, pH, ntu, do: DO, temp }) => {
    const TDS = Number(tds) || 0;
    const PH = Number(pH) || 7.0;
    const TURB = Number(ntu) || 0;
    const DOv = Number(DO) || 0;
    const TEM = Number(temp) || 0;

    if (DOv > 7 && TDS < 300 && TURB < 5 && PH >= 6.5 && PH <= 8.5)
      return 'Good Water';
    if (DOv < 3 && TURB > 10) return 'Sewage';
    if (TDS > 500 && TURB > 10 && PH > 7.5) return 'Agricultural Runoff';
    if (TDS > 1000 || PH < 6 || PH > 9) return 'Chemical Intrusion';
    if (TEM > 30 && DOv < 6) return 'Thermal Pollution';
    return 'Good Water';
  };

  const estimateApproxBOD = ({ tds, ntu, temp, do: DO }) => {
    const TDS = Number(tds) || 0;
    const TURB = Number(ntu) || 0;
    const TEM = Number(temp) || 0;
    const DOv = Number(DO) || 0;

    let bod = 0.002 * TDS + 0.3 * TURB + 0.1 * TEM - 0.5 * DOv;
    if (bod < 0) bod = 0;
    if (bod > 40) bod = 40;
    return bod;
  };

  const handleClassify = () => {
    setIsClassifying(true);
    try {
      const label = classifyLocal(sensorData);
      setPollutionLabel(label);
      addNotification(`Predicted class: ${label}`, 'success');
    } catch (err) {
      console.error(err);
      addNotification('Classification failed', 'error');
    } finally {
      setIsClassifying(false);
    }
  };

  const handleSave = async () => {
    if (!pollutionLabel) {
      addNotification('Classify the water first.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const readingsRef = ref(database, 'readings');
      const newRef = push(readingsRef);

      const approxBOD = estimateApproxBOD(sensorData);

      await set(newRef, {
        source: source || 'Not specified',
        temperature: sensorData.temp,
        tds: sensorData.tds,
        turbidity: sensorData.ntu,
        dissolvedOxygen: sensorData.do,
        pH: sensorData.pH || null,
        pollutionLabel,
        approxBOD,
        mode: 'Live from ESP32 / Firebase',
        timestamp: Date.now(),
      });

      addNotification('Saved reading to Firebase', 'success');
    } catch (err) {
      console.error(err);
      addNotification('Save failed', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container>
      <Header>
        <PageTitle>Dashboard</PageTitle>
        <StatusBadge connected={connected}>
          {connected ? 'Live from ESP32 / Firebase' : 'Waiting for data'}
        </StatusBadge>
      </Header>

      <Grid>
        {/* Temperature */}
        <TileWrapper>
          <Accent colorStart="#0ea5e9" colorEnd="#22c1d1" />
          <Tile>
            <BigTitle>Temperature</BigTitle>
            <BigValue>{sensorData.temp.toFixed(2)} °C</BigValue>
          </Tile>
        </TileWrapper>

        {/* TDS */}
        <TileWrapper>
          <Accent colorStart="#22c55e" colorEnd="#2dd4bf" />
          <Tile>
            <BigTitle>TDS</BigTitle>
            <BigValue>{sensorData.tds.toFixed(2)} ppm</BigValue>
          </Tile>
        </TileWrapper>

        {/* Turbidity */}
        <TileWrapper>
          <Accent colorStart="#6366f1" colorEnd="#4f46e5" />
          <Tile>
            <BigTitle>Turbidity</BigTitle>
            <BigValue>{sensorData.ntu.toFixed(2)} NTU</BigValue>
          </Tile>
        </TileWrapper>

        {/* DO */}
        <TileWrapper>
          <Accent colorStart="#14b8a6" colorEnd="#22c55e" />
          <Tile>
            <BigTitle>Dissolved O₂</BigTitle>
            <BigValue>{sensorData.do.toFixed(2)} mg/L</BigValue>
          </Tile>
        </TileWrapper>

        {/* pH (manual) */}
        <TileWrapper>
          <Accent colorStart="#38bdf8" colorEnd="#0ea5e9" />
          <Tile>
            <BigTitle>pH (manual input)</BigTitle>
            <BigValue>
              {sensorData.pH !== '' ? Number(sensorData.pH).toFixed(2) : '--'}
            </BigValue>
            <PHInput
              type="number"
              step="0.01"
              placeholder="Enter pH"
              value={sensorData.pH}
              onChange={(e) =>
                setSensorData((prev) => ({ ...prev, pH: e.target.value }))
              }
            />
          </Tile>
        </TileWrapper>

        {/* Manual Test */}
        <TileWrapper>
          <Accent colorStart="#fb7185" colorEnd="#f97316" />
          <ManualCard>
            <BigTitle>Manual Test</BigTitle>
            <div style={{ color: 'rgba(226,232,240,0.9)' }}>
              Enter custom parameters on the test page
            </div>
            <ManualButton onClick={() => navigate('/test-input')}>
              Open Test Input
            </ManualButton>
          </ManualCard>
        </TileWrapper>
      </Grid>

      <ActionsRow>
        <SourceInput
          placeholder="Enter water source (e.g., tap, lake, well)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <ButtonsGroup>
          <PrimaryButton onClick={handleClassify} disabled={isClassifying}>
            {isClassifying ? 'Classifying...' : 'Classify Pollution'}
          </PrimaryButton>

          <SaveButton
            onClick={handleSave}
            disabled={isSaving || !pollutionLabel}
          >
            {isSaving ? 'Saving...' : 'Save to Firebase'}
          </SaveButton>
        </ButtonsGroup>
      </ActionsRow>

      {pollutionLabel && (
        <PredictedBar>
          <div style={{ color: 'rgba(241,245,249,0.96)' }}>
            <strong>Predicted:</strong>&nbsp;
            <span style={{ fontSize: 16 }}>{pollutionLabel}</span>
          </div>
          <div style={{ color: 'rgba(148,163,184,0.9)' }}>
            {new Date().toLocaleString()}
          </div>
        </PredictedBar>
      )}

      <NotificationManager
        notifications={notifications}
        onRemove={removeNotification}
      />
    </Container>
  );
}

export default Dashboard;
