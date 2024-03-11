import {renderSurvey} from "../Survey/Survey"

const updateHeaderContent = () => {
  const headerNav = document.querySelector('nav');
  headerNav.innerHTML = `
    <a href="/">Inicio</a>
    <a href="#" id="surveyLink">Encuesta</a>
    <a href="#" id="profileLink">Mi perfil</a>
  `;

  const surveyLink = document.getElementById('surveyLink');
  surveyLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderSurvey();
  });
}

export { updateHeaderContent };
