let goodReviews = [];
let averageReviews = [];
let badReviews = [];

// Load reviews from local storage when the page loads
window.addEventListener('load', () => {
    goodReviews = JSON.parse(localStorage.getItem('goodReviews')) || [];
    averageReviews = JSON.parse(localStorage.getItem('averageReviews')) || [];
    badReviews = JSON.parse(localStorage.getItem('badReviews')) || [];
    updateCounts();
    displayReviews();
});

// Save reviews to local storage
function saveToLocalStorage() {
    localStorage.setItem('goodReviews', JSON.stringify(goodReviews));
    localStorage.setItem('averageReviews', JSON.stringify(averageReviews));
    localStorage.setItem('badReviews', JSON.stringify(badReviews));
}

// Handle review submission
document.getElementById('submit').addEventListener('click', function() {
    const reviewInput = document.getElementById('review');
    const review = reviewInput.value.trim();

    if (review) {
        classifyReview(review);
        reviewInput.value = ''; // Clear the input after submission
        updateCounts();
        displayReviews();
        saveToLocalStorage(); // Save reviews to local storage
    }
});

// Handle clearing reviews
document.getElementById('clear').addEventListener('click', function() {
    goodReviews = [];
    averageReviews = [];
    badReviews = [];
    updateCounts();
    displayReviews();
    saveToLocalStorage(); // Clear reviews from local storage
});

function classifyReview(review) {
    const reviewLower = review.toLowerCase();
    const goodKeywords = ["amazing", "excellent", "fantastic", "great", "love", "delicious", "tasty", "flavorful", "mouthwatering", "perfect", "fresh", "satisfying", "friendly", "prompt", "attentive", "excellent service", "courteous", "cozy", "comfortable", "beautiful", "clean", "relaxing", "wonderful", "highly recommend"];
    const averageKeywords = ["okay", "average", "not bad", "decent", "fine", "acceptable", "ordinary", "nothing special", "satisfactory"];
    const badKeywords = ["did not like", "bland", "slow", "terrible", "cold", "tasteless", "overcooked", "undercooked", "disappointing", "rude", "dirty", "noisy", "uncomfortable", "awful", "bad", "disgusting", "worst"];

    if (goodKeywords.some(word => reviewLower.includes(word))) {
        goodReviews.push(review);
    } else if (averageKeywords.some(word => reviewLower.includes(word))) {
        averageReviews.push(review);
    } else if (badKeywords.some(word => reviewLower.includes(word))) {
        badReviews.push(review);
    } else {
        averageReviews.push(review); // Default to average if no keywords match
    }
}

function updateCounts() {
    document.getElementById('good-count').innerText = `Good Reviews: ${goodReviews.length}`;
    document.getElementById('average-count').innerText = `Average Reviews: ${averageReviews.length}`;
    document.getElementById('bad-count').innerText = `Bad Reviews: ${badReviews.length}`;
}

function displayReviews() {
    const reviewsDiv = document.getElementById('reviews');
    reviewsDiv.innerHTML = ''; // Clear previous reviews

    if (goodReviews.length > 0) {
        goodReviews.forEach(review => {
            const p = document.createElement('p');
            p.classList.add('good'); // Assign the class for styling
            p.innerText = `Good Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }

    if (averageReviews.length > 0) {
        averageReviews.forEach(review => {
            const p = document.createElement('p');
            p.classList.add('average'); // Assign the class for styling
            p.innerText = `Average Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }

    if (badReviews.length > 0) {
        badReviews.forEach(review => {
            const p = document.createElement('p');
            p.classList.add('bad'); // Assign the class for styling
            p.innerText = `Bad Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }
}
