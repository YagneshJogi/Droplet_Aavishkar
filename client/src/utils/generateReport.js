// src/utils/generateReport.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dropletLogo from '../assets/droplet-logo.png';

/**
 * Build the common report layout and return the jsPDF instance.
 */
function buildBaseReport({
  source,
  sensorData,
  pollutionLabel,
  approxBOD,
  bod5,
  bod5Form,
  isManual,
  timestamp,
}) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 56;
  let y = 60;

  // Header with logo + title
  const logoSize = 52;

  try {
    if (dropletLogo) {
      doc.addImage(dropletLogo, 'PNG', marginX, y - 20, logoSize, logoSize);
    }
  } catch (err) {
    // If image fails, just ignore – report still works
    // eslint-disable-next-line no-console
    console.warn('Logo image failed to load in PDF:', err);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('DROPLET', pageWidth / 2, y, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(
    'Smart Water Quality Monitoring System',
    pageWidth / 2,
    y + 18,
    { align: 'center' }
  );

  // Horizontal separator
  doc.setDrawColor(180);
  doc.setLineWidth(0.8);
  doc.line(marginX, y + 30, pageWidth - marginX, y + 30);

  // Generated on
  y += 52;
  const generatedAt = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Generated on: ${generatedAt}`, marginX, y);

  // Sample information
  y += 26;
  doc.setTextColor(0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Sample Information', marginX, y);

  y += 10;
  doc.setDrawColor(220);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, marginX + 140, y);

  // Info rows
  y += 18;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Water Source', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(source || 'Unknown'), marginX + 130, y);

  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.text('Reading mode', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isManual ? 'Manual entry' : 'Live from ESP32 / Firebase',
    marginX + 130,
    y
  );

  // Latest sensor readings section
  y += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Latest Sensor Readings', marginX, y);

  y += 10;
  doc.setDrawColor(220);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, marginX + 180, y);

  const {
    temp = 0,
    tds = 0,
    ntu = 0,
    do: doVal = 0,
    pH = 7.0,
  } = sensorData || {};

  const readingsBody = [
    ['Temperature (°C)', `${temp.toFixed(2)} °C`],
    ['TDS (ppm)', `${tds.toFixed(2)} ppm`],
    ['Turbidity (NTU)', `${ntu.toFixed(2)} NTU`],
    ['Dissolved Oxygen (mg/L)', `${doVal.toFixed(2)} mg/L`],
    ['pH', pH.toFixed(2)],
  ];

  doc.autoTable({
    startY: y + 14,
    margin: { left: marginX, right: marginX },
    styles: {
      fontSize: 10,
      cellPadding: 4,
      lineWidth: 0.3,
      lineColor: [220, 220, 220],
    },
    headStyles: {
      fillColor: [248, 250, 252],
      textColor: [15, 23, 42],
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
    },
    columnStyles: {
      0: { cellWidth: 220, fontStyle: 'bold' },
    },
    head: [['Parameter', 'Value']],
    body: readingsBody,
  });

  y = doc.lastAutoTable.finalY + 28;

  // Pollution classification
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Pollution Classification', marginX, y);

  y += 10;
  doc.setDrawColor(220);
  doc.line(marginX, y, marginX + 190, y);

  y += 18;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Predicted class', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(pollutionLabel || 'Unknown'), marginX + 130, y);

  // Real-time Approximate BOD
  y += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Real-time Approximate BOD', marginX, y);

  y += 10;
  doc.setDrawColor(220);
  doc.line(marginX, y, marginX + 210, y);

  y += 18;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Approximate BOD (online)', marginX, y);
  doc.setFont('helvetica', 'normal');

  const approxText =
    typeof approxBOD === 'number'
      ? `${approxBOD.toFixed(2)} mg/L`
      : 'Not available';

  doc.text(approxText, marginX + 180, y);

  // Optional BOD₅ lab test section (uses bod5 + bod5Form so ESLint is happy)
  if (typeof bod5 === 'number') {
    y += 30;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('BOD₅ Laboratory Test Result', marginX, y);

    y += 10;
    doc.setDrawColor(220);
    doc.line(marginX, y, marginX + 230, y);

    y += 18;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('BOD₅ (5-day) result', marginX, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${bod5.toFixed(2)} mg/L`, marginX + 160, y);

    if (bod5Form && (bod5Form.Vs || bod5Form.Vt)) {
      // Show volumes if provided
      y += 18;
      const vsText = bod5Form.Vs ? `Vs = ${bod5Form.Vs} mL` : '';
      const vtText = bod5Form.Vt ? `Vt = ${bod5Form.Vt} mL` : '';
      const combo = [vsText, vtText].filter(Boolean).join(' , ');
      if (combo) {
        doc.setFontSize(10);
        doc.setTextColor(80);
        doc.text(combo, marginX, y);
        doc.setTextColor(0);
      }
    }
  }

  // Footer note
  const footerY = doc.internal.pageSize.getHeight() - 48;
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    'Note: This is a rough estimate based on TDS, turbidity, temperature and DO. Lab BOD₅ test is the official value.',
    marginX,
    footerY
  );

  return doc;
}

/**
 * Download PDF directly.
 */
export function generateWaterReport(payload) {
  const doc = buildBaseReport(payload);
  const sourceSafe = (payload.source || 'water_sample')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const filename = `${sourceSafe || 'sample'}_water_quality_report.pdf`;
  doc.save(filename);
}

/**
 * Open PDF in a new browser tab for preview.
 */
export function previewWaterReport(payload) {
  const doc = buildBaseReport(payload);
  const blobUrl = doc.output('bloburl');
  window.open(blobUrl, '_blank');
}
