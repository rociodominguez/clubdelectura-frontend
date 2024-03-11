import './Books.css';

const renderBooksContent = (booksData) => {
  const mainElement = document.querySelector('main');

  const currentReads = booksData.filter(book => book.readingStatus === "actual");
  const pastReads = booksData.filter(book => book.readingStatus === "acabada");

  mainElement.innerHTML = `
    <h1>Historial</h1>
    <section>
      <h2>Lectura Actual</h2>
      <ul>
        ${currentReads.map((book) => `<li>${book.title} - ${book.author}</li>`).join('')}
      </ul>
    </section>
    <section>
      <h2>Lecturas Anteriores</h2>
      <ul>
        ${pastReads.map((book) => `<li>${book.title} - ${book.author}</li>`).join('')}
      </ul>
    </section>
  `;
};

export { renderBooksContent };
