// src/utils/generateReport.js
import jsPDF from 'jspdf';

/**
 * Internal helper: build the PDF and either download or preview.
 * mode = 'download' | 'preview'
 */
function createWaterReport(payload = {}, mode = 'download') {
  const {
    source = 'Not specified',
    sensorData = {},
    pollutionLabel = 'Not classified',
    approxBOD,          // online estimate (number)
    bod5,               // lab BOD5 result (number, optional – unused in layout)
    bod5Form = {},      // { Vs, Vt, DO1, DO5 } (optional – unused in layout)
    isManual = false,   // true if from manual test
    timestamp = new Date().toISOString(),
  } = payload;

  const {
    temp = 0,
    tds = 0,
    ntu = 0,
    do: DO = 0,
    pH = 7.0,
  } = sensorData;

  const doc = new jsPDF();

  const marginLeft = 20;
  const valueColX = 85;
  const lineGap = 7;

  const drawReport = (logoImg) => {
    let y = 20;

    // ---------- HEADER ----------

    // Logo on the left (same position/size as your working version)
    if (logoImg) {
      try {
        doc.addImage(logoImg, 'PNG', marginLeft, 10, 26, 26);
      } catch (e) {
        console.warn('Could not add logo:', e);
      }
    }

    // Title centered
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('DROPLET', 105, 20, { align: 'center' });

    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Smart Water Quality Monitoring System',
      105,
      26,
      { align: 'center' }
    );

    // Horizontal line
    doc.setDrawColor(180);
    doc.setLineWidth(0.4);
    doc.line(20, 34, 190, 34);

    // Generated on line
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Generated on: ${new Date(timestamp).toLocaleString()}`,
      marginLeft,
      42
    );

    // move below header
    y = 58;

    const sectionTitle = (title) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, marginLeft, y);
      y += lineGap + 2;
    };

    const keyValue = (label, value) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(label, marginLeft, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), valueColX, y);
      y += lineGap;
    };

    // ---------- Sample Information ----------
    sectionTitle('Sample Information');
    keyValue('Water Source', source || 'Not specified');
    keyValue(
      'Reading mode',
      isManual ? 'Manual test input' : 'Live from ESP32 / Firebase'
    );

    y += lineGap; // small gap before next section

    // ---------- Latest Sensor Readings ----------
    sectionTitle('Latest Sensor Readings');
    keyValue('Temperature (°C)', temp.toFixed(2));
    keyValue('TDS (ppm)', tds.toFixed(2));
    keyValue('Turbidity (NTU)', ntu.toFixed(2));
    keyValue('Dissolved Oxygen (mg/L)', DO.toFixed(2));
    keyValue('pH', pH.toFixed(2));

    y += lineGap;

    // ---------- Pollution Classification ----------
    sectionTitle('Pollution Classification');
    keyValue('Predicted class', pollutionLabel);

    y += lineGap;

    // ---------- Real-time Approximate BOD ----------
    sectionTitle('Real-time Approximate BOD');
    const bodOnlineText =
      typeof approxBOD === 'number'
        ? `${approxBOD.toFixed(2)} mg/L`
        : 'Not computed';
    keyValue('Approximate BOD (online)', bodOnlineText);

    // Note at the bottom (same style/wording)
    y += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120);
    doc.text(
      'Note: This is a rough estimate based on TDS, turbidity, temperature and DO. Lab BOD5 test is the official value.',
      marginLeft,
      y + lineGap,
      { maxWidth: 175 }
    );
    doc.setTextColor(0);

    // ---------- File name ----------
    const safeSource = String(source || 'sample').trim() || 'sample';
    const fileSlug = safeSource
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

    if (mode === 'preview') {
      // Open in new tab for preview
      const blobUrl = doc.output('bloburl');
      window.open(blobUrl, '_blank');
    } else {
      // Default: download
      doc.save(`${fileSlug}_water_quality_report.pdf`);
    }
  };

  // ---------- Load logo from /public and then render ----------
  const logo = new Image();
  logo.src = '/droplet-logo.png';

  logo.onload = () => drawReport(logo);
  logo.onerror = () => {
    console.warn('droplet-logo.png not found or failed to load. Rendering without logo.');
    drawReport(null);
  };
}

/** Download PDF (existing behavior) */
export function generateWaterReport(payload) {
  createWaterReport(payload, 'download');
}

/** Preview PDF in a new tab (no auto-download) */
export function previewWaterReport(payload) {
  createWaterReport(payload, 'preview');
}
