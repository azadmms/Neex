const FIXED_CURRENCY = 'IQD';

const controls = document.getElementById('controls');
const receiptSection = document.getElementById('receiptSection');
const amountInput = document.getElementById('amountInput');
const formMessage = document.getElementById('formMessage');

const receiptDate = document.getElementById('receiptDate');
const detailDate = document.getElementById('detailDate');
const receiptAmount = document.getElementById('receiptAmount');
const detailAmount = document.getElementById('detailAmount');

function getCurrentDateTime() {
  const now = new Date();

  const date = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(now);

  const time = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  return `${date}, ${time}`;
}

function formatAmount(value) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(Number(value));
}

function generateReceipt() {
  const amount = Number(amountInput.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    formMessage.textContent = 'Enter a valid amount greater than zero.';
    amountInput.focus();
    return;
  }

  const dateTime = getCurrentDateTime();
  const formattedAmount = formatAmount(amount);

  receiptDate.textContent = dateTime;
  detailDate.textContent = dateTime;
  receiptAmount.textContent = formattedAmount;
  detailAmount.textContent = `${formattedAmount} ${FIXED_CURRENCY}`;

  formMessage.textContent = '';
  controls.classList.add('hidden');
  receiptSection.classList.remove('hidden');

  requestAnimationFrame(() => {
    receiptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function editAmount() {
  receiptSection.classList.add('hidden');
  controls.classList.remove('hidden');

  requestAnimationFrame(() => {
    amountInput.focus();
    controls.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawCenteredText(ctx, text, x, y, maxWidth) {
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y, maxWidth);
}

function downloadReceiptPng() {
  const canvas = document.getElementById('downloadCanvas');
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;
  const brand = '#66b39f';
  const brandDark = '#2f8f7a';
  const text = '#101415';
  const muted = '#778184';
  const line = '#e3e9e7';

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = brand;
  ctx.fillRect(0, 0, width, 440);

  ctx.fillStyle = 'rgba(255,255,255,.94)';
  roundedRect(ctx, 275, 35, 530, 54, 27);
  ctx.fill();

  ctx.fillStyle = '#8e2424';
  ctx.font = '700 24px Arial';
  drawCenteredText(ctx, 'SAMPLE — NOT A BANK RECEIPT', width / 2, 70, 490);

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(width / 2, 210, 105, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = brandDark;
  ctx.lineWidth = 17;
  [155, 210, 265].forEach(y => {
    ctx.beginPath();
    ctx.arc(width / 2, y, 25, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 54px Arial';
  drawCenteredText(ctx, 'Transaction Receipt', width / 2, 390, 900);

  ctx.fillStyle = text;
  ctx.font = '700 55px Arial';
  drawCenteredText(ctx, 'SkyGate Technology', width / 2, 535, 900);

  ctx.strokeStyle = line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 600);
  ctx.lineTo(980, 600);
  ctx.stroke();

  ctx.fillStyle = text;
  ctx.font = '700 38px Arial';
  drawCenteredText(ctx, 'Transaction Summary', width / 2, 675, 900);

  ctx.fillStyle = muted;
  ctx.font = '400 30px Arial';
  drawCenteredText(ctx, receiptDate.textContent, width / 2, 730, 900);

  ctx.fillStyle = brandDark;
  ctx.font = '700 92px Arial';
  drawCenteredText(ctx, receiptAmount.textContent, width / 2, 850, 900);

  ctx.fillStyle = muted;
  ctx.font = '400 34px Arial';
  drawCenteredText(ctx, FIXED_CURRENCY, width / 2, 905, 900);

  ctx.strokeStyle = line;
  ctx.beginPath();
  ctx.moveTo(100, 965);
  ctx.lineTo(980, 965);
  ctx.stroke();

  const rows = [
    ['Date & Time', detailDate.textContent],
    ['Beneficiary Name', 'SkyGate Technology'],
    ['Amount', detailAmount.textContent],
    ['Status', 'Completed']
  ];

  let rowY = 1040;
  rows.forEach((row, index) => {
    ctx.fillStyle = '#465053';
    ctx.font = '400 30px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(row[0], 120, rowY);

    ctx.fillStyle = index === 3 ? brandDark : text;
    ctx.font = index === 3 ? '700 30px Arial' : '400 30px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(row[1], 960, rowY, 520);

    ctx.strokeStyle = line;
    ctx.beginPath();
    ctx.moveTo(100, rowY + 45);
    ctx.lineTo(980, rowY + 45);
    ctx.stroke();

    rowY += 115;
  });

  ctx.fillStyle = muted;
  ctx.font = '400 25px Arial';
  drawCenteredText(
    ctx,
    'Computer-generated sample for internal reference only.',
    width / 2,
    1510,
    900
  );
  drawCenteredText(
    ctx,
    'Not valid as proof of payment.',
    width / 2,
    1550,
    900
  );

  const link = document.createElement('a');
  const safeDate = new Date().toISOString().slice(0, 10);
  link.download = `skygate-sample-receipt-${safeDate}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

document.getElementById('generateBtn').addEventListener('click', generateReceipt);
document.getElementById('editBtn').addEventListener('click', editAmount);
document.getElementById('downloadBtn').addEventListener('click', downloadReceiptPng);
document.getElementById('printBtn').addEventListener('click', () => window.print());

amountInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    generateReceipt();
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {
      // The website still works normally if service worker registration fails.
    });
  });
}
