import { updateHeaderContent } from "../../components/Header/Header";
import { renderBooksContent } from "../Books/Books";

const loginUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem('authToken', data.token);

      updateHeaderContent();
      renderBooksContent(data.booksData); 
      
    } else {
      console.error('Error en el inicio de sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
};

const renderLoginContent = () => {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = `
    <h1>Iniciar Sesión</h1>
    <form id="login-form">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Iniciar Sesión</button>
    </form>
  `;

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loginUser(username, password);
  });
};

export { renderLoginContent };