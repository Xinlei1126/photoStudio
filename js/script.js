const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const filterButtons = document.querySelectorAll('.filters button');
const items = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  items.forEach(item => {
    item.hidden = btn.dataset.filter !== 'all' && item.dataset.category !== btn.dataset.filter;
  });
}));

const lightbox = document.querySelector('.lightbox');
const preview = lightbox.querySelector('.lightbox-image');
const caption = lightbox.querySelector('p');

items.forEach(item => item.addEventListener('click', () => {
  const image = item.querySelector('img');
  preview.src = image.src;
  preview.alt = image.alt;
  caption.textContent = item.querySelector('span').textContent;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}));

function closeLightbox() {
  lightbox.hidden = true;
  preview.src = '';
  document.body.style.overflow = '';
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

const form = document.querySelector('#contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(field => {
    const error = field.parentElement.querySelector('.error');
    error.textContent = '';
    if (!field.value.trim()) {
      error.textContent = 'This field is required.';
      ok = false;
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      error.textContent = 'Enter a valid email address.';
      ok = false;
    }
  });
  const status = form.querySelector('.form-status');
  if (ok) {
    status.textContent = 'Thanks! Your demo inquiry was validated successfully. No message was actually sent.';
    form.reset();
  } else {
    status.textContent = 'Please check the fields above.';
  }
});
