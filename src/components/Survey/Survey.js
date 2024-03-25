import "./Survey.css";

const renderSurvey = () => {
  const mainElement = document.querySelector('main');

  const surveyForm = document.createElement('form');
  surveyForm.id = 'survey-form';

  const surveyHeader = document.createElement('h1');
  surveyHeader.textContent = 'Encuesta Mensual';
  surveyHeader.className = "survey-title";
  surveyForm.appendChild(surveyHeader);

  const labelBook = document.createElement('label');
  labelBook.textContent = '¿Qué libro quieres leer este mes?';
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
  submitButton.className = "button";
  submitButton.textContent = 'Enviar';

  surveyForm.appendChild(labelBook);
  surveyForm.appendChild(selectBook);
  surveyForm.appendChild(submitButton);

  mainElement.innerHTML = '';
  mainElement.appendChild(surveyForm);

  surveyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedBook = document.getElementById('book-selection').value;

    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      try {
        const response = await submitSurvey({ selectedBook }, authToken);
        console.log('Respuesta del servidor:', response);

        if (response.ok) {
          fetchSurveyResults();
        } else {
          console.error('Error al enviar resultados:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar resultados:', error);
      }
    } else {
      console.error('No se encontró el token de autenticación');
    }
  });

  fetchSurveyResults();
};

const submitSurvey = async (surveyData, authToken) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/results/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(surveyData),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar resultados: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Error al enviar resultados:', error);
    throw error;
  }
};

const fetchSurveyResults = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:3000/api/v1/results/survey-results', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener los resultados de la encuesta');
    }
    const data = await response.json();
    displaySurveyResults(data);
  } catch (error) {
    console.error(error);
  }
};

const displaySurveyResults = (results) => {
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'survey-results';

  results.forEach(result => {
    const resultItem = document.createElement('p');
    resultItem.textContent = `${result.book}: ha recibido ${result.count} votos`;
    resultItem.className = "votes";
    resultsContainer.appendChild(resultItem);
  });

  const mainElement = document.querySelector('main');
  mainElement.appendChild(resultsContainer);
};

export { renderSurvey, submitSurvey };