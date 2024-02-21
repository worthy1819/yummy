
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function() {

        const name = searchInput.value;
        // Perform fetch request
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display search results
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                searchResults.innerHTML = 'An error occurred while fetching data.';
            });
    });


    function displaySearchResults(data) {
        // Clear previous search results
        searchResults.innerHTML = '';

        // Display each result
        data.meals.forEach(meal => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <div class="rounded p-4 shadow-md bg-white">
                   <img src="${meal.strMealThumb}" class="w-full" alt="">
                   <h3 class="text-xl font-bold">${meal.strMeal}</h3>
                   <h5 class="text-sm">Category: ${meal.strCategory}</h5>
                   <h5 class="text-sm">Area: ${meal.strArea}</h5>
                   <a href="${meal.strSource}" target="_blank" class="btn bg-red-900 text-white hover:text-red-900 my-5">View Recipe</a>
               </div>
            `;
            searchResults.appendChild(resultItem);
        });

        if (data.length === 0) {
            searchResults.innerHTML = 'No results found.';
        }
    }
});
