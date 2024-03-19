import './Login.css'
import { clearHeaderContent, updateHeaderContent } from "../../components/Header/Header";
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

  clearHeaderContent();

  const mainElement = document.querySelector('main');
  mainElement.innerHTML = `
  <div class="container">
    <form class="form" id="login-form">
    <p class="title">Login</p>
      <input placeholder="Usuario" class="username input" type="text" id="username" name="username" required>
      <br>
      <input placeholder="Contraseña" class="password input" type="password" id="password" name="password" required>
      <br>
      <button class="btn" type="submit">Iniciar Sesión</button>
    </form>
  </div>
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