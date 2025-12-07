// src/pages/BOD.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

/* Layout wrapper */
const Container = styled.main`
  padding: 24px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* Glass card (same vibe as History slabs) */
const SectionCard = styled.section`
  background: rgba(15, 23, 42, 0.78);
  border-radius: 22px;
  padding: 22px 20px;
  box-shadow:
    0 22px 50px rgba(15, 23, 42, 0.85),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.28);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/* Connection badge like Dashboard */
const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ connected }) =>
    connected
      ? 'linear-gradient(90deg, rgba(16,185,129,0.18), rgba(16,185,129,0.08))'
      : 'linear-gradient(90deg, rgba(239,68,68,0.18), rgba(239,68,68,0.08))'};
  color: ${({ connected }) => (connected ? '#bbf7d0' : '#fecaca')};
  border: 1px solid
    ${({ connected }) =>
      connected ? 'rgba(34,197,94,0.45)' : 'rgba(248,113,113,0.45)'};
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
`;

/* Sensor tiles */
const SensorGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const SensorTile = styled.div`
  background: rgba(15, 23, 42, 0.9);
  border-radius: 16px;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow:
    0 16px 38px rgba(15, 23, 42, 0.85),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SensorLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SensorValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

/* Approx BOD highlight */
const BODHighlight = styled.div`
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.7);
  color: #bbf7d0;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

/* BOD5 form */
const FormGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.92);
  background: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  color: #020617;
  box-shadow:
    0 12px 30px rgba(15, 23, 42, 0.85),
    inset 0 2px 4px rgba(0, 0, 0, 0.08);
  outline: none;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(180deg, #3b82f6, #2563eb);
  color: white;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(191, 219, 254, 0.8);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 16px 38px rgba(37, 99, 235, 0.35);

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ResultBar = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.5);
  box-shadow:
    0 18px 42px rgba(15, 23, 42, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

/* ===== Component ===== */

function BOD() {
  // Real-time sensor data (now from Firebase RTDB)
  const [sensorData, setSensorData] = useState({
    temp: 0,
    tds: 0,
    ntu: 0,
    do: 0,
    pH: 7.0,
  });
  const [connected, setConnected] = useState(false);

  // BOD5 form
  const [form, setForm] = useState({
    source: '',
    Vs: '',
    Vt: '',
    DO1: '',
    DO5: '',
  });
  const [bod5, setBod5] = useState(null);

  /* 🔁 Listen to Firebase /waterQuality just like Dashboard */
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
          pH: Number(val.pH ?? prev.pH ?? 7.0),
        }));
      },
      (err) => {
        console.error('RTDB error (BOD page):', err);
        setConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Approximate BOD from the live sensors
  const estimateBOD = ({ tds, ntu, temp, do: DO }) => {
    const TDS = Number(tds) || 0;
    const TURB = Number(ntu) || 0;
    const TEM = Number(temp) || 0;
    const DOv = Number(DO) || 0;

    let bod = 0.002 * TDS + 0.3 * TURB + 0.1 * TEM - 0.5 * DOv;
    if (bod < 0) bod = 0;
    if (bod > 40) bod = 40;
    return bod;
  };

  const approxBOD = estimateBOD(sensorData);

  // BOD5 = (DO1 − DO5) × (Vt / Vs)
  const handleComputeBOD5 = () => {
    const VsNum = Number(form.Vs);
    const VtNum = Number(form.Vt);
    const DO1num = Number(form.DO1);
    const DO5num = Number(form.DO5);

    if (!VsNum || !VtNum || VsNum <= 0 || VtNum <= 0) {
      alert('Enter valid Vs and Vt (mL).');
      return;
    }
    if (Number.isNaN(DO1num) || Number.isNaN(DO5num)) {
      alert('Enter valid DO₁ and DO₅ (mg/L).');
      return;
    }

    const df = VtNum / VsNum;
    const result = (DO1num - DO5num) * df;
    setBod5(result);
  };

  return (
    <Container>
      {/* 1. Real-time approximate BOD */}
      <SectionCard>
        <TitleRow>
          <div>
            <Title>Real-time Approximate BOD</Title>
            <Subtitle>
              Uses latest values from Firebase Realtime Database (updated by the ESP32)
              to estimate BOD. This is for trend monitoring – the lab BOD₅ test gives
              the official value.
            </Subtitle>
          </div>
          <StatusBadge connected={connected}>
            {connected ? 'Live from Firebase RTDB' : 'Waiting for RTDB data'}
          </StatusBadge>
        </TitleRow>

        <SensorGrid>
          <SensorTile>
            <SensorLabel>Temperature</SensorLabel>
            <SensorValue>{sensorData.temp.toFixed(2)} °C</SensorValue>
          </SensorTile>
          <SensorTile>
            <SensorLabel>TDS</SensorLabel>
            <SensorValue>{sensorData.tds.toFixed(2)} ppm</SensorValue>
          </SensorTile>
          <SensorTile>
            <SensorLabel>Turbidity</SensorLabel>
            <SensorValue>{sensorData.ntu.toFixed(2)} NTU</SensorValue>
          </SensorTile>
          <SensorTile>
            <SensorLabel>Dissolved Oxygen</SensorLabel>
            <SensorValue>{sensorData.do.toFixed(2)} mg/L</SensorValue>
          </SensorTile>
          <SensorTile>
            <SensorLabel>pH</SensorLabel>
            <SensorValue>{sensorData.pH.toFixed(2)}</SensorValue>
          </SensorTile>
        </SensorGrid>

        <BODHighlight>
          <span>Approximate BOD (online):</span>
          <span style={{ fontSize: '1.25rem' }}>{approxBOD.toFixed(2)} mg/L</span>
        </BODHighlight>
      </SectionCard>

      {/* 2. BOD₅ test calculator */}
      <SectionCard>
        <TitleRow>
          <div>
            <Title>BOD₅ Lab Test Calculator</Title>
            <Subtitle>
              Enter DO₁ (day 0) and DO₅ (day 5) with sample volume Vs and bottle volume Vt.
              BOD₅ = (DO₁ − DO₅) × (Vt / Vs).
            </Subtitle>
          </div>
        </TitleRow>

        <FormGrid>
          <Field>
            <Label>Water Source (optional)</Label>
            <Input
              type="text"
              placeholder="e.g. River A - Point 1"
              value={form.source}
              onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
            />
          </Field>

          <Field>
            <Label>Sample volume Vs (mL)</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g. 15"
              value={form.Vs}
              onChange={(e) => setForm((f) => ({ ...f, Vs: e.target.value }))}
            />
          </Field>

          <Field>
            <Label>Bottle volume Vt (mL)</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g. 300"
              value={form.Vt}
              onChange={(e) => setForm((f) => ({ ...f, Vt: e.target.value }))}
            />
          </Field>

          <Field>
            <Label>DO₁ (mg/L) – initial</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="e.g. 8.6"
              value={form.DO1}
              onChange={(e) => setForm((f) => ({ ...f, DO1: e.target.value }))}
            />
          </Field>

          <Field>
            <Label>DO₅ (mg/L) – after 5 days</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="e.g. 2.4"
              value={form.DO5}
              onChange={(e) => setForm((f) => ({ ...f, DO5: e.target.value }))}
            />
          </Field>
        </FormGrid>

        <ButtonRow>
          <PrimaryButton onClick={handleComputeBOD5}>
            Compute BOD₅
          </PrimaryButton>
        </ButtonRow>

        {bod5 !== null && (
          <ResultBar>
            <div>
              <strong>BOD₅ result:&nbsp;</strong>
              {bod5.toFixed(2)} mg/L
              {form.source ? `  —  ${form.source}` : ''}
            </div>
          </ResultBar>
        )}
      </SectionCard>
    </Container>
  );
}

export default BOD;
