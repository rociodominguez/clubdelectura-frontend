import './Books.css';

const renderBooksContent = async () => {
  try {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const booksData = await response.json();
          return booksData;
        } else {
          console.error('Error al obtener libros:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la aplicación:', error);
      }
    };

    const handleVoteSubmission = async (event) => {
      event.preventDefault();
      
      const bookSelectElement = document.getElementById("book-select");
      const bookId = bookSelectElement.value;
      const rating = document.getElementById("rating").value;
      const authToken = localStorage.getItem('authToken');
    
      console.log("bookId:", bookId);
      console.log("rating:", rating);
    
      try {
        const response = await fetch(`http://localhost:3000/api/v1/books/${bookId}/vote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ rating }),
        });
    
        if (response.ok) {
          alert("¡Voto enviado exitosamente!");
          renderBooksContent();
        } else {
          alert("Error al enviar el voto. Por favor, inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error al enviar el voto:", error);
        alert("Error al enviar el voto. Por favor, inténtalo de nuevo.");
      }
    };
    

    const booksData = await fetchBooks();

    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    if (!booksData) {
      console.error("No se proporcionaron datos de libros");
      return;
    }

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
      <form id="vote-form">
        <label for="book-select">Selecciona un libro:</label>
        <select id="book-select" name="book-select">
          ${booksData.map((book) => `<option value="${book._id}">${book.title} - ${book.author}</option>`).join('')}
        </select>
        <br>
        <label for="rating">Votar del 1 al 5:</label>
        <select id="rating" name="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Enviar voto</button>
      </form>
    `;

    document.getElementById("vote-form").addEventListener("submit", handleVoteSubmission);
  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
};

export { renderBooksContent };