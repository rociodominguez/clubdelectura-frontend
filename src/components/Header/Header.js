import { renderBooksContent } from "../../pages/Books/Books";
import {renderSurvey} from "../Survey/Survey"

const updateHeaderContent = () => {
  const headerNav = document.querySelector('nav');
  headerNav.innerHTML = `
  <a href="#" id="homeLink">Inicio</a>
  <a href="#" id="surveyLink">Encuesta</a>
  <a href="/">Logout</a>
  `;

  const surveyLink = document.getElementById('surveyLink');
  surveyLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderSurvey();
  });

  const homeLink = document.getElementById('homeLink');
  homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderBooksContent();
  });

};

export { updateHeaderContent };