import { renderBooksContent } from "./src/pages/Books/Books";
import { renderHomeContent } from "./src/pages/Home/Home";
import { renderLoginContent } from "./src/pages/Login/Login";

const initApp = () => {
  const path = window.location.pathname;

  if (path === '/login') {
    renderLoginContent();
  } else if (path === '/books') {
    renderBooksContent();
  } else {
    renderHomeContent();
  }
};

initApp();