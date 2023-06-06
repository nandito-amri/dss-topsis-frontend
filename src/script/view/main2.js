const main = () => {
    const baseUrl = 'https://api.themoviedb.org/3';
    const imgUrl = 'https://image.tmdb.org/t/p/original';
    const APIKey = '5539aaf481dadfd39ca52702e71ef7cc';

    const laodMovie = async () => {
        try {
            const response = await fetch(`${baseUrl}/discover/movie?api_key=${APIKey}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                console.log(responseJson.message);
            } else {
                renderAllMovie(responseJson.results);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderAllMovie = (movies) => {
        const container = document.querySelector('main');
        container.innerHTML = '';
        container.innerHTML += `
            <div class="display">
                <img src="${imgUrl}${movies[0].backdrop_path}" alt="${movies[0].title}" id="display-item">
                <div class="cover"></div>
                <div class="identity">
                    <h3>${movies[0].title}</h3>
                    <p>${movies[0].release_date}</p>
                </div>
            </div>
            <div class="container">
                <div class="label">
                    <h4>All movie</h4>
                </div>
                <div class="grid-container">
                </div>
            </div>
        `;

        const innerConatiner = document.querySelector('.grid-container');

        for (const movie of movies){
            let color;
            if (movie.vote_average < 6){
                color = 'red';
            } else {
                color = 'green';
            }
            
            if (movie.poster_path == null){
                continue;
            }

            const movieElement = document.createElement('div');
            movieElement.classList.add('grid-item');

            movieElement.innerHTML += `
                <img src="${imgUrl}${movie.poster_path}" alt="">
                <p class="rating" style="color: ${color}">${movie.vote_average.toFixed(1)}</p>
                <div class="identity-content flex-column">
                    <p class="title">${movie.title}</p>
                    <p class="release-date">${movie.release_date}</p>
                </div>
                <div class= "id-access" id="${movie.id}"></div>
            `;

            innerConatiner.appendChild(movieElement);

            movieElement.addEventListener('click', event => {
                const movieId = event.target.id;

                detailedMovie(movieId);
            });
        };
    };

    const detailedMovie = async movieId => {  
        try {
            const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${APIKey}`);
            const movie = await response.json();
    
            const container = document.querySelector('main');
            container.innerHTML = '';
            container.innerHTML += `
                <div class="detail-container">
                    <img src="${imgUrl}${movie.poster_path}" alt="">
                    <div class="detail">
                        <h4 class="detail-title">${movie.title}</h4>
                        <p class="detail-release-date">${movie.release_date}</p>
                        <p class="detail-rating">${movie.vote_average.toFixed(1)}</p>
                        <p class="overview">${movie.overview}</p>
                    </div>
                </div>
                <div class="container">
                    <div class="label">
                        <h4>Recommendation Movie</h4>
                    </div>
                    <div class="grid-container"></div>
                </div>
            `;
    
            recommendationMovie(movieId);        
        } catch (error) {
            console.log(error);
        }
    };

    const recommendationMovie = async (movieId) => {
        const recommendations = await findMovies(movieId); 
        
        const recommendationContainer = document.querySelector('.grid-container');

        for (const recommendation of recommendations){
            let color;
            if (recommendation.vote_average < 6){
                color = 'red';
            } else {
                color = 'green';
            }

            if (recommendation.poster_path == null) {
                continue;
            }
            
            const movieElement = document.createElement('div');
            movieElement.classList.add('grid-item');
            
            movieElement.innerHTML += `
                <img src="${imgUrl}${recommendation.poster_path}" alt="">
                <p class="rating" style="color: ${color}">${recommendation.vote_average.toFixed(1)}</p>
                <div class="identity-content flex-column">
                    <p class="title">${recommendation.title}</p>
                    <p class="release-date">${recommendation.release_date}</p>
                </div>
                <div class= "id-access" id="${recommendation.id}"></div>
            `;

            recommendationContainer.appendChild(movieElement);

            movieElement.addEventListener('click', event => {
                const movieId = event.target.id;

                detailedMovie(movieId);
            });
        }
    };

    const findMovies = async (movieId) => {
        try {
            const response = await fetch(`${baseUrl}/movie/${movieId}/recommendations?api_key=${APIKey}`);
            const responseJson = await response.json();
    
            return responseJson.results;
        } catch (error) {
            console.log(error);
        }
    };

    const laodTv = async () => {
        try {
            const response = await fetch(`${baseUrl}/discover/tv?api_key=${APIKey}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                console.log(responseJson.message);
            } else {
                renderAllTv(responseJson.results);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const renderAllTv = (tvs) => {
        const container = document.querySelector('main');
        container.innerHTML = '';
        container.innerHTML += `
            <div class="display">
                <img src="${imgUrl}${tvs[0].backdrop_path}" alt="${tvs[0].name}" id="display-item">
                <div class="cover"></div>
                <div class="identity">
                    <h3>${tvs[0].name}</h3>
                    <p>${tvs[0].first_air_date}</p>
                </div>
            </div>
            <div class="container">
                <div class="label">
                    <h4>All movie</h4>
                </div>
                <div class="grid-container">
                </div>
            </div>
        `;

        const innerConatiner = document.querySelector('.grid-container');

        for(const tv of tvs){
            let color;
            if (tv.vote_average < 6){
                color = 'red';
            } else {
                color = 'green';
            }

            if (tv.poster_path == null) {
                continue;
            }

            const tvElement = document.createElement('div');
            tvElement.classList.add('grid-item');

            tvElement.innerHTML += `
                <img src="${imgUrl}${tv.poster_path}" alt="">
                <p class="rating" style="color: ${color}">${tv.vote_average.toFixed(1)}</p>
                <div class="identity-content flex-column">
                    <p class="title">${tv.name}</p>
                    <p class="release-date">${tv.first_air_date}</p>
                </div>
                <div class= "id-access" id="${tv.id}"></div>
            `;

            innerConatiner.appendChild(tvElement);

            tvElement.addEventListener('click', event => {
                const tvId = event.target.id;

                detailedTv(tvId);
            });
        };
    };

    const detailedTv = async tvId => {  
        try {
            const response = await fetch(`${baseUrl}/tv/${tvId}?api_key=${APIKey}`);
            const tv = await response.json();
    
            const container = document.querySelector('main');
            container.innerHTML = '';
            container.innerHTML += `
                <div class="detail-container">
                    <img src="${imgUrl}${tv.poster_path}" alt="">
                    <div class="detail">
                        <h4 class="detail-title">${tv.name}</h4>
                        <p class="detail-release-date">${tv.first_air_date}</p>
                        <p class="detail-rating">${tv.vote_average.toFixed(1)}</p>
                        <p class="overview">${tv.overview}</p>
                    </div>
                </div>
                <div class="container">
                    <div class="label">
                        <h4>Recommendation TV</h4>
                    </div>
                    <div class="grid-container"></div>
                </div>
            `;
    
            recommendationTv(tvId);        
        } catch (error) {
            console.log(error);
        }
    };

    const recommendationTv = async (tvId) => {
        const recommendations = await findTvs(tvId); 
        
        const recommendationContainer = document.querySelector('.grid-container');

        for (const recommendation of recommendations){
            let color;
            if (recommendation.vote_average < 6){
                color = 'red';
            } else {
                color = 'green';
            }

            if (recommendation.poster_path == null) {
                continue;
            }
            
            const tvElement = document.createElement('div');
            tvElement.classList.add('grid-item');
            
            tvElement.innerHTML += `
                <img src="${imgUrl}${recommendation.poster_path}" alt="">
                <p class="rating" style="color: ${color}">${recommendation.vote_average.toFixed(1)}</p>
                <div class="identity-content flex-column">
                    <p class="title">${recommendation.name}</p>
                    <p class="release-date">${recommendation.first_air_date}</p>
                </div>
                <div class= "id-access" id="${recommendation.id}"></div>
            `;

            recommendationContainer.appendChild(tvElement);

            tvElement.addEventListener('click', event => {
                const tvId = event.target.id;

                detailedTv(tvId);
            });
        }
    };

    const findTvs = async (tvId) => {
        try {
            const response = await fetch(`${baseUrl}/tv/${tvId}/recommendations?api_key=${APIKey}`);
            const responseJson = await response.json();
    
            return responseJson.results;
        } catch (error) {
            console.log(error);
        }
    };

    const movieFilter = document.getElementById('movie');
    movieFilter.addEventListener('click', () => {
        laodMovie();
    });

    const tvFilter = document.getElementById('tv');
    tvFilter.addEventListener('click', () => {
        laodTv();
    });    


    laodMovie();

    const searchElement = document.querySelector('search-bar');
    const buttonSearchOnClicked = async () => {
        try {
            const response = await fetch(`${baseUrl}/search/movie?api_key=${APIKey}&query=${searchElement.value}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                console.log(responseJson.message);
            } else {
                renderSearch(responseJson.results);
            }
        } catch (error) {
            console.log(error);
        }

    };

    searchElement.clickEvent = buttonSearchOnClicked;

    const renderSearch = (movies) => {
        const container = document.querySelector('main');
        container.innerHTML = '';
        container.innerHTML += `
            <div class="display">
                <img src="${imgUrl}${movies[0].backdrop_path}" alt="${movies[0].title}" id="display-item">
                <div class="cover"></div>
                <div class="identity">
                    <h3>${movies[0].title}</h3>
                    <p>${movies[0].release_date}</p>
                </div>
            </div>
            <div class="container">
                <div class="label">
                    <p>Hasil Pencarian Film <span id="search-key">"${searchElement.value}"<span><p>
                </div>
                <div class="grid-container">
                </div>
            </div>
        `;

        const innerConatiner = document.querySelector('.grid-container');

        for (const movie of movies){
            let color;
            if (movie.vote_average < 6){
                color = 'red';
            } else {
                color = 'green';
            }
            
            if (movie.poster_path == null){
                continue;
            }

            const movieElement = document.createElement('div');
            movieElement.classList.add('grid-item');

            movieElement.innerHTML += `
                <img src="${imgUrl}${movie.poster_path}" alt="">
                <p class="rating" style="color: ${color}">${movie.vote_average.toFixed(1)}</p>
                <div class="identity-content flex-column">
                    <p class="title">${movie.title}</p>
                    <p class="release-date">${movie.release_date}</p>
                </div>
                <div class= "id-access" id="${movie.id}"></div>
            `;

            innerConatiner.appendChild(movieElement);

            movieElement.addEventListener('click', event => {
                const movieId = event.target.id;

                detailedMovie(movieId);
            });
        };
    };
};

export default main;