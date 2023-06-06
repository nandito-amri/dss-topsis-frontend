const main = () => {
  const baseUrl = 'http://localhost:9000';

  const getAllCriteria = async () => {
    try {
        const response = await fetch(`${baseUrl}/criteria`);
        const responseJson = await response.json();

        if (responseJson.error) {
            console.log(responseJson);
        } else {
          console.log(responseJson.rows);
            renderAllCriteria(responseJson.rows);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const renderAllCriteria = (criteria) => {
    const container = document.querySelector('main');
    container.innerHTML = '';
    container.innerHTML += `
    <div class="content">
      <h2 class="content__heading">Whats Your Desired Laptop</h2>
      <h2 class="content__heading2">Whats your laptops criteria?</h2>
      <h3 class="keterangan">1 : tidak penting</h3>
      <h3 class="keterangan">2 : sedikit penting</h3>
      <h3 class="keterangan">3 : cukup penting</h3>
      <h3 class="keterangan">4 : penting</h3>
      <h3 class="keterangan">5 : sangat penting</h3>
    </div>
    <div class="main"></div>
    `;

    const innerConatiner = document.querySelector('.main');
    const formInput = document.createElement('form');
    formInput.setAttribute('id', 'formSlider');
    innerConatiner.appendChild(formInput);

    for (const data of criteria){
      const criteriaElement = document.createElement('div');
      criteriaElement.setAttribute('id', data.criteria_id);

      criteriaElement.innerHTML += `
        <h2 class="kriteria">${data.name}</h2>
        <div class="slider">
          <input class="sliderInput" id="${data.criteria_id}" type="range" min="1" max="5" value="1" step="1" list="settings">
          <datalist id="settings">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </datalist>
        </div>
      `;

      formInput.appendChild(criteriaElement);
    };

    formInput.innerHTML += `
    <button type="submit" class="calculate__button">Calculate</button>
    `

    formInput.addEventListener("submit", (event) => {
      event.preventDefault();

      const rangeValue = document.querySelectorAll(".sliderInput");
      console.log(rangeValue);
      for (const a of rangeValue) {
        let id = a.getAttribute('id');
        let weight = a.value;
        console.log(weight);
        updateCriteria(id, weight);
      }

      getAllAlternatives();
    })
  }

  const updateCriteria = async (id, newWeight) => {
    try {
      const data = {
        "weight": newWeight.toString()
      }
        const response = await fetch(`${baseUrl}/criteria/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const responseJson = await response.json();

        if (responseJson.error) {
            console.log(responseJson);
        } else {
          console.log(responseJson);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const getAllAlternatives = async () => {
    try {
      const response = await fetch(`${baseUrl}/alternatives`);
      const responseJson = await response.json();

      if (responseJson.error) {
          console.log(responseJson);
      } else {
        console.log(responseJson);
          renderAllAternatives(responseJson);
      }
    } catch (error) {
        console.log(error);
    }
  };

  const renderAllAternatives = (alternatives) => {
    const container = document.querySelector('main');
    container.innerHTML = '';
    container.innerHTML += `
    <div class="content">
      <h2 class="content__heading">Whats Your Desired Laptop</h2>
      <h2 class="content__heading2">Whats your laptops criteria?</h2>
      <h3 class="keterangan">1 : tidak penting</h3>
      <h3 class="keterangan">2 : sedikit penting</h3>
      <h3 class="keterangan">3 : cukup penting</h3>
      <h3 class="keterangan">4 : penting</h3>
      <h3 class="keterangan">5 : sangat penting</h3>
    </div>
    <div class="main"></div>
    `;

    const innerConatiner = document.querySelector('.main');

    for (const data of alternatives){
      const alternativeElement = document.createElement('div');
      alternativeElement.setAttribute('id', data.alter_id);

      alternativeElement.innerHTML += `
        <h2 class="alternative">${data.name}</h2>
      `;

      innerConatiner.appendChild(alternativeElement);
    };

    const calculateButton = document.createElement('button');
    calculateButton.setAttribute("class", "calculate__button");
    innerConatiner.appendChild(calculateButton);

    calculateButton.addEventListener('click', () => {
      getTopsisResult();
    })
  }

  const getTopsisResult = async () => {
    try {
      const response = await fetch(`${baseUrl}/topsis`);
      const responseJson = await response.json();

      if (responseJson.error) {
          console.log(responseJson);
      } else {
        console.log(responseJson);
          renderTopsis(responseJson);
      }
    } catch (error) {
        console.log(error);
    }
  }

  const renderTopsis = (results) => {
    const container = document.querySelector('main');
    container.innerHTML = '';
    container.innerHTML += `
    <div class="content">
      <h2 class="content__heading">Whats Your Desired Laptop</h2>
      <h2 class="content__heading2">Whats your laptops criteria?</h2>
      <h3 class="keterangan">1 : tidak penting</h3>
      <h3 class="keterangan">2 : sedikit penting</h3>
      <h3 class="keterangan">3 : cukup penting</h3>
      <h3 class="keterangan">4 : penting</h3>
      <h3 class="keterangan">5 : sangat penting</h3>
    </div>
    <div class="main"></div>
    `;

    const innerConatiner = document.querySelector('.main');
    for (const data of results){
      const topsisElement = document.createElement('div');
      topsisElement.setAttribute('id', data.alter_id);

      topsisElement.innerHTML += `
        <h2 class="alternative">Alternative ${data.alternative}</h2>
        <p class="alternative">Score : ${data.score}</p>
      `;

      innerConatiner.appendChild(topsisElement);
    };

  }

  getAllCriteria();
}

export default main;