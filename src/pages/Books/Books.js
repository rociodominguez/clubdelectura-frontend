import './Books.css'

const renderBooksContent = (booksData) => {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
      <h1>Libros Disponibles</h1>
      <ul>
        ${booksData.map((book) => `<li>${book.title} - ${book.author}</li>`).join('')}
      </ul>
    `;
  };
  
  
  export { renderBooksContent };