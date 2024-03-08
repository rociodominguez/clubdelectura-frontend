import { renderLoginContent } from '../Login/Login';

const renderHomeContent = () => {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = `
    <h1>Bienvenido a El Vivero Cultural</h1>
    <p>Explora nuestra colección de libros y descubre nuevas historias.</p>
  `;

  const loginLink = document.querySelector('#login');
  loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderLoginContent();
  });
};

export { renderHomeContent };
