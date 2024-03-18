const renderSurvey = () => {
  const mainElement = document.querySelector('main');

  const surveyHeader = document.createElement('h1');
  surveyHeader.textContent = 'Encuesta Mensual';

  const surveyForm = document.createElement('form');
  surveyForm.id = 'survey-form';

  const labelBook = document.createElement('label');
  labelBook.textContent = 'Quiero que la próxima lectura sea:';
  labelBook.htmlFor = 'book-selection';

  const selectBook = document.createElement('select');
  selectBook.id = 'book-selection';
  selectBook.name = 'book';
  selectBook.required = true;

  const books = ['Libro 1', 'Libro 2', 'Libro 3'];
  books.forEach(book => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    selectBook.appendChild(option);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Enviar Encuesta';

  surveyForm.appendChild(labelBook);
  surveyForm.appendChild(selectBook);
  surveyForm.appendChild(submitButton);

  mainElement.innerHTML = '';

  mainElement.appendChild(surveyHeader);
  mainElement.appendChild(surveyForm);

  surveyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedBook = document.getElementById('book-selection').value;

    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      try {
        const response = await submitSurvey({ selectedBook }, authToken);
        console.log('Respuesta del servidor:', response);
      } catch (error) {
        console.error('Error al enviar resultados:', error);
      }
    } else {
      console.error('No se encontró el token de autenticación');
    }
  });
};

const submitSurvey = async (surveyData, authToken) => {
  const response = await fetch('http://localhost:3000/api/v1/results/survey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(surveyData),
  });

  if (!response.ok) {
    console.error("Error al enviar resultados");
  }

  return response.json();
};

export { renderSurvey, submitSurvey };