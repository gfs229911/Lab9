'use strict';

/* ---------- Burger menu ---------- */
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Before / After sliders ---------- */
document.querySelectorAll('.ba').forEach((box) => {
  const range = box.querySelector('.ba-range');
  const update = () => box.style.setProperty('--pos', range.value + '%');
  range.addEventListener('input', update);
  update();
});

/* ---------- Cost calculator ---------- */
const calc = document.getElementById('calc');
const service = document.getElementById('calc-service');
const area = document.getElementById('calc-area');
const result = document.getElementById('calc-result');
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function recalc() {
  const acres = parseFloat(area.value);
  result.textContent = acres > 0 ? money.format(acres * Number(service.value)) : 'Enter the area';
}
service.addEventListener('change', recalc);
area.addEventListener('input', recalc);
calc.addEventListener('submit', (e) => e.preventDefault());
recalc();

/* ---------- Request form ---------- */
const form = document.getElementById('request');
const status = document.getElementById('form-status');
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', (e) => {
  e.preventDefault();               // browser already checked the required/type/pattern attributes
  const name = form.elements.name.value.trim();
  status.textContent = `Thank you, ${name}! An engineer will call you to confirm the visit on ${dateInput.value}.`;
  form.reset();
});

/* ---------- Theme selector: system / light / dark ---------- */
const themeSelect = document.getElementById('theme');
const root = document.documentElement;

function applyTheme(value) {
  if (value === 'light' || value === 'dark') root.setAttribute('data-theme', value);
  else root.removeAttribute('data-theme');          // follow system setting
}
let saved = 'system';
try { saved = localStorage.getItem('theme') || 'system'; } catch (err) { /* storage unavailable */ }
themeSelect.value = saved;
applyTheme(saved);
themeSelect.addEventListener('change', () => {
  applyTheme(themeSelect.value);
  try { localStorage.setItem('theme', themeSelect.value); } catch (err) { /* ignore */ }
});
