import "./Books.css";

const renderBooksContent = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener libros:', response.statusText);
    }

    const booksData = await response.json();
    const reversedBooksData = booksData.reverse();

    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    const currentReadsTitleContainer = document.createElement('div');
    const currentReadsTitle = document.createElement('h3');
    currentReadsTitle.classList = "current-read";
    currentReadsTitle.innerHTML = 'Lectura en curso';
    currentReadsTitleContainer.appendChild(currentReadsTitle);

    const pastReadsTitleContainer = document.createElement('div');
    const pastReadsTitle = document.createElement('h3');
    pastReadsTitleContainer.classList = "past-read";
    pastReadsTitle.innerHTML = 'Anteriores lecturas';
    pastReadsTitleContainer.appendChild(pastReadsTitle);

    const currentReadsContainer = document.createElement('div');
    currentReadsContainer.classList.add('current-reads-container');
    const pastReadsContainer = document.createElement('div');
    pastReadsContainer.classList.add('past-reads-container');

    const currentReads = reversedBooksData.filter(book => book.readingStatus === "actual");
    const pastReads = reversedBooksData.filter(book => book.readingStatus === "acabada");

    if (currentReads.length === 0) {
      const noCurrentReadsParagraph = document.createElement('p');
      noCurrentReadsParagraph.textContent = 'Aún no hay libro seleccionado';
      noCurrentReadsParagraph.className = "no-book";;
      currentReadsContainer.appendChild(noCurrentReadsParagraph);
    } else {
      currentReads.forEach(book => {
        const bookElement = createBookElement(book);
        currentReadsContainer.appendChild(bookElement);
      });
    }

    pastReads.forEach(book => {
      const bookElement = createBookElement(book);
      pastReadsContainer.appendChild(bookElement);
    });

    mainElement.appendChild(currentReadsTitleContainer);
    mainElement.appendChild(currentReadsContainer);
    mainElement.appendChild(pastReadsTitleContainer);
    mainElement.appendChild(pastReadsContainer);

  } catch (error) {
    console.error('Error en la aplicación:', error);
  }
};

const createBookElement = (book) => {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book-card');
  bookElement.innerHTML = `
    <img src="${book.img}" alt="">
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <h4>${book.year}</h4>
    <div class="rating">
      <input value="5" name="rating-${book._id}" id="star5-${book._id}" type="radio" ${localStorage.getItem(`rating-${book._id}`) === "5" ? 'checked' : ''}>
      <label for="star5-${book._id}"></label>
      <input value="4" name="rating-${book._id}" id="star4-${book._id}" type="radio" ${localStorage.getItem(`rating-${book._id}`) === "4" ? 'checked' : ''}>
      <label for="star4-${book._id}"></label>
      <input value="3" name="rating-${book._id}" id="star3-${book._id}" type="radio" ${localStorage.getItem(`rating-${book._id}`) === "3" ? 'checked' : ''}>
      <label for="star3-${book._id}"></label>
      <input value="2" name="rating-${book._id}" id="star2-${book._id}" type="radio" ${localStorage.getItem(`rating-${book._id}`) === "2" ? 'checked' : ''}>
      <label for="star2-${book._id}"></label>
      <input value="1" name="rating-${book._id}" id="star1-${book._id}" type="radio" ${localStorage.getItem(`rating-${book._id}`) === "1" ? 'checked' : ''}>
      <label for="star1-${book._id}"></label>
    </div>
    <button type="button" class="vote-button" data-book-id="${book._id}">Enviar voto</button>
  `;

  const ratingInputs = bookElement.querySelectorAll('.rating input[type="radio"]');
  ratingInputs.forEach(input => {
    input.addEventListener('change', (event) => {
      const ratingValue = event.target.value;
      localStorage.setItem(`rating-${book._id}`, ratingValue);
    });
  });

  return bookElement;
};

export { renderBooksContent };
