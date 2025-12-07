  // src/pages/TestInput.js
  import React, { useState } from 'react';
  import styled from 'styled-components';
  import { ref, push, set } from 'firebase/database';
  import { database } from '../firebase';
  import { NotificationManager } from '../components/Notification';
  import { Card, CardTitle } from '../components/Card';
  import { useNavigate } from 'react-router-dom';

  const Container = styled.div`
    padding: 28px 20px;
    max-width: 920px;
    margin: 0 auto;
  `;

  const BackLink = styled.button`
    background: transparent;
    border: none;
    color: ${({theme}) => theme.colors.primary};
    cursor: pointer;
    font-weight: 700;
    margin-bottom: 12px;
  `;

  const FormCard = styled(Card)`
    padding: 28px;
    display:flex;
    flex-direction:column;
    gap: 16px;
  `;

  const Row = styled.div`
    display:flex;
    gap: 12px;
    @media(max-width: 700px) { flex-direction: column; }
  `;

  const Field = styled.div`
    flex: 1;
    display:flex;
    flex-direction:column;
  `;

  const Label = styled.label`
    font-size: 0.85rem;
    color: ${({theme}) => theme.colors.text.secondary};
    margin-bottom: 6px;
  `;

  const Input = styled.input`
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.97);
    font-size: 1rem;
    font-weight: 600;
  `;

  const Buttons = styled.div`
    display:flex;
    gap: 12px;
    justify-content:flex-end;
    margin-top: 8px;
    @media(max-width:700px){ flex-direction: column; align-items: stretch; }
  `;

  const ButtonPrimary = styled.button`
    background: linear-gradient(180deg,#3b82f6,#2563eb);
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.12);
  `;

  const ButtonSave = styled(ButtonPrimary)`
    background: linear-gradient(180deg,#2dd4bf,#10b981);
  `;

  const ResultBar = styled(Card)`
    margin-top: 14px;
    padding: 12px 16px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  `;

  export default function TestInput() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
      temp: '',
      tds: '',
      ntu: '',
      do: '',
      pH: '',
      source: ''
    });

    const [classification, setClassification] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [saving, setSaving] = useState(false);

    const addNotification = (m, t='success') => setNotifications(prev => [...prev, { message: m, type: t }]);
    const removeNotification = (i) => setNotifications(prev => prev.filter((_, idx) => idx !== i));

    const classifyLocal = ({ tds, pH, ntu, do: DO, temp }) => {
      const TDS = Number(tds);
      const PH = Number(pH);
      const TURB = Number(ntu);
      const DOv = Number(DO);
      const TEM = Number(temp);

      if (DOv > 7 && TDS < 300 && TURB < 5 && PH >= 6.5 && PH <= 8.5) return "Good Water";
      if (DOv < 3 && TURB > 10) return "Sewage";
      if (TDS > 500 && TURB > 10 && PH > 7.5) return "Agricultural Runoff";
      if (TDS > 1000 || PH < 6 || PH > 9) return "Chemical Intrusion";
      if (TEM > 30 && DOv < 6) return "Thermal Pollution";
      return "Good Water";
    };

    const handleClassify = () => {
      const label = classifyLocal(form);
      setClassification(label);
      addNotification(`Classified as: ${label}`, 'success');
    };

    const handleSave = async () => {
      if (!classification) { addNotification('Please classify before saving', 'error'); return; }
      if (!form.source.trim()) { addNotification('Add a source before saving', 'error'); return; }

      setSaving(true);
      try {
        const readingsRef = ref(database, 'readings');
        const newRef = push(readingsRef);
        await set(newRef, {
          temperature: Number(form.temp),
          tds: Number(form.tds),
          turbidity: Number(form.ntu),
          dissolvedOxygen: Number(form.do),
          pH: Number(form.pH),
          pollutionLabel: classification,
          source: form.source.trim(),
          timestamp: new Date().toISOString()
        });
        addNotification('Saved manual test to Firebase', 'success');
      } catch (err) {
        console.error(err);
        addNotification('Save failed', 'error');
      } finally {
        setSaving(false);
      }
    };

    return (
      <Container>
        <BackLink onClick={() => navigate(-1)}>&larr; Back</BackLink>

        <FormCard>
          <CardTitle>Manual Test Input</CardTitle>

          <Row>
            <Field>
              <Label>Temperature (°C)</Label>
              <Input value={form.temp} onChange={e => setForm(f => ({...f, temp: e.target.value}))} type="number" step="0.01" />
            </Field>

            <Field>
              <Label>TDS (ppm)</Label>
              <Input value={form.tds} onChange={e => setForm(f => ({...f, tds: e.target.value}))} type="number" step="0.01" />
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Turbidity (NTU) — Quadratic</Label>
              <Input value={form.ntu} onChange={e => setForm(f => ({...f, ntu: e.target.value}))} type="number" step="0.01" />
            </Field>

            <Field>
              <Label>Dissolved Oxygen (mg/L)</Label>
              <Input value={form.do} onChange={e => setForm(f => ({...f, do: e.target.value}))} type="number" step="0.01" />
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>pH (manual)</Label>
              <Input value={form.pH} onChange={e => setForm(f => ({...f, pH: e.target.value}))} type="number" step="0.01" />
            </Field>

            <Field>
              <Label>Water Source</Label>
              <Input value={form.source} onChange={e => setForm(f => ({...f, source: e.target.value}))} placeholder="tap, lake, well..." />
            </Field>
          </Row>

          <Buttons>
            <ButtonPrimary onClick={handleClassify}>Classify</ButtonPrimary>
            <ButtonSave onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save to Firebase'}
            </ButtonSave>
          </Buttons>

          {classification && (
            <ResultBar>
              <div style={{ color: 'rgba(255,255,255,0.95)' }}><strong>Predicted:</strong> &nbsp; {classification}</div>
              <div style={{ color: 'rgba(255,255,255,0.75)' }}>{new Date().toLocaleString()}</div>
            </ResultBar>
          )}
        </FormCard>

        <NotificationManager notifications={notifications} onRemove={removeNotification} />
      </Container>
    );
  }
