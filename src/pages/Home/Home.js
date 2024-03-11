import "./Home.css";
import { renderLoginContent } from '../Login/Login';

const renderHomeContent = () => {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = `
  <div class="welcome">
    <h1>CLUB DE LECTURA</h1>
    <h2>Impulsado por El Vivero Cultural</h2>
    <p>Fundado en 2023 por la Asociación El Vivero Cultural, el club de lectura de Los Palacios y Villafranca es un vibrante punto de encuentro para amantes de la lectura. Con un enfoque inclusivo, el club organiza discusiones mensuales sobre diversas obras literarias, promoviendo la diversidad de géneros y fomentando la participación activa de los miembros. Además, el espacio sirve como plataforma para eventos literarios que enriquecen la vida cultural de la comunidad</p>
  </div>
  `;

  const loginLink = document.querySelector('#login');
  loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderLoginContent();
  });
};

export { renderHomeContent };
