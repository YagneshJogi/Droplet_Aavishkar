import jsPDF from "jspdf";
import "jspdf-autotable";

/** Format timestamp safely for header */
function formatDateTime(ts) {
  try {
    if (!ts) return "-";
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "-";
  }
}

/** Build a safe, descriptive filename */
function buildFilename(source) {
  const safeSource = (source || "water_source")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "");

  return `${safeSource || "water_source"}_water_quality_report.pdf`;
}

/** Main PDF builder */
function buildPdf(data, mode = "download") {
  const {
    source,
    sensorData,
    pollutionLabel,
    approxBOD,
    bod5,
    isManual,
  } = data;

  // A4 portrait in points
  const doc = new jsPDF("p", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;

  let y = 40;

  /* ========= GLOBAL FONT DEFAULT ========= */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0);

  /* ========= TITLE ========= */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("DROPLET", pageWidth / 2, y, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    "Smart Water Quality Monitoring System",
    pageWidth / 2,
    y + 18,
    { align: "center" }
  );

  doc.setDrawColor(180);
  doc.line(marginX, y + 30, pageWidth - marginX, y + 30);
  y += 52;

  /* ========= GENERATED ON ========= */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Generated on: ${formatDateTime(Date.now())}`, marginX, y);
  y += 26;

  /* ========= SECTION: SAMPLE INFORMATION ========= */
  const drawSectionHeader = (title) => {
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, marginX, y);
    y += 12;
    doc.setDrawColor(200);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 16;
    doc.setFontSize(11);
  };

  const drawField = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(`${label}:`, marginX, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.text(String(value ?? "--"), marginX + 120, y);
    y += 16;
  };

  drawSectionHeader("Sample Information");

  drawField("Water Source", source || "Unknown");
  drawField(
    "Reading Mode",
    isManual ? "Manual" : "Live from ESP32 / Firebase"
  );

  y += 16;

  /* ========= SECTION: LATEST SENSOR READINGS ========= */
  drawSectionHeader("Latest Sensor Readings");

  const { temp, tds, ntu, do: DO, pH } = sensorData || {};

  const fmtValue = (val, unit) => {
    if (val === undefined || val === null || Number.isNaN(Number(val))) {
      return "--";
    }
    const num = Number(val).toFixed(2);
    return unit ? `${num} ${unit}` : num;
  };

  const drawReadingRow = (label, value, unit) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(label, marginX, y);

    doc.setFont("helvetica", "normal");
    doc.text(fmtValue(value, unit), marginX + 180, y);
    y += 16;
  };

  drawReadingRow("Temperature (°C)", temp, "°C");
  drawReadingRow("TDS (ppm)", tds, "ppm");
  drawReadingRow("Turbidity (NTU)", ntu, "NTU");
  drawReadingRow("Dissolved Oxygen (mg/L)", DO, "mg/L");
  drawReadingRow("pH", pH, "");

  y += 20;

  /* ========= SECTION: POLLUTION CLASSIFICATION ========= */
  drawSectionHeader("Pollution Classification");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);
  doc.text("Predicted Class:", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.text(pollutionLabel || "Unknown", marginX + 120, y);
  y += 24;

  /* ========= SECTION: REAL-TIME APPROX BOD ========= */
  drawSectionHeader("Real-time Approximate BOD");

  doc.setFont("helvetica", "bold");
  doc.text("Approximate BOD (online):", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.text(
    approxBOD === undefined || approxBOD === null
      ? "--"
      : `${approxBOD.toFixed(2)} mg/L`,
    marginX + 180,
    y
  );
  y += 24;

  /* ========= SECTION: LAB BOD₅ (OPTIONAL) ========= */
  if (typeof bod5 === "number") {
    drawSectionHeader("Laboratory BOD₅ Result");

    doc.setFont("helvetica", "bold");
    doc.text("BOD₅:", marginX, y);

    doc.setFont("helvetica", "normal");
    doc.text(`${bod5.toFixed(2)} mg/L`, marginX + 60, y);
    y += 24;
  }

  /* ========= FOOTNOTE (WRAPPED, NORMAL WEIGHT) ========= */


  /* ========= EXPORT ========= */
  const filename = buildFilename(source);

  if (mode === "preview") {
    const blobUrl = doc.output("bloburl");
    window.open(blobUrl, "_blank");
  } else {
    doc.save(filename);
  }
}

/** Public API: download PDF */
export function generateWaterReport(data) {
  try {
    buildPdf(data, "download");
  } catch (err) {
    console.error("PDF generation failed:", err);
  }
}

/** Public API: preview PDF in new tab */
export function previewWaterReport(data) {
  try {
    buildPdf(data, "preview");
  } catch (err) {
    console.error("PDF preview failed:", err);
  }
}
