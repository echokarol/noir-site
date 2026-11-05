const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); });
const details = document.querySelector('#details');
const photo = document.querySelector('#photo');
document.querySelectorAll('.gallery button').forEach(button => button.addEventListener('click', () => { const source = button.querySelector('img'); const target = photo.querySelector('img'); target.src = source.src; target.alt = source.alt; photo.showModal(); }));
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); }); });

const form = document.querySelector('#booking-form');
const success = document.querySelector('#booking-success');
const clientName = document.querySelector('#client-name');
const phone = document.querySelector('#client-phone');
function resetBooking() { form.reset(); clientName.setCustomValidity(''); phone.setCustomValidity(''); form.hidden = false; success.hidden = true; }
function openBooking(service = '') { resetBooking(); document.querySelector('#booking-service').value = service; closeMenu(); details.showModal(); }
document.querySelectorAll('.booking-trigger').forEach(b => b.addEventListener('click', () => openBooking()));
document.querySelectorAll('[data-service]').forEach(b => b.addEventListener('click', () => openBooking(b.dataset.service)));
clientName.addEventListener('input', () => clientName.setCustomValidity(''));
phone.addEventListener('input', () => phone.setCustomValidity(''));
form.addEventListener('submit', event => {
 event.preventDefault();
 clientName.setCustomValidity(clientName.value.trim() ? '' : 'Введите ваше имя.');
 const digits = phone.value.replace(/\D/g, '');
 phone.setCustomValidity(/^[+\d\s()\-]+$/.test(phone.value) && digits.length >= 10 && digits.length <= 15 ? '' : 'Введите телефон: от 10 до 15 цифр.');
 if (!form.reportValidity()) return;
 form.reset(); form.hidden = true; success.hidden = false; success.focus();
});
details.addEventListener('close', resetBooking);
document.querySelector('#booking-done').addEventListener('click', () => details.close());
// Clear transient fields when leaving the page, including back/forward cache.
window.addEventListener('pagehide', resetBooking);
