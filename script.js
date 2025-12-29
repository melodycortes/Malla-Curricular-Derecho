const ramos = document.querySelectorAll('.ramo');
const estado = JSON.parse(localStorage.getItem('ramos')) || {};

function guardar() {
  localStorage.setItem('ramos', JSON.stringify(estado));
}

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prereq;
    if (prereq && !estado[prereq]) {
      ramo.classList.add('locked');
    } else {
      ramo.classList.remove('locked');
    }
  });
}

ramos.forEach(ramo => {
  const id = ramo.dataset.id;

  if (estado[id]) {
    ramo.classList.add('aprobado');
  }

  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('locked')) return;

    ramo.classList.toggle('aprobado');
    estado[id] = ramo.classList.contains('aprobado');
    guardar();
    actualizarBloqueos();
  });
});

actualizarBloqueos();
