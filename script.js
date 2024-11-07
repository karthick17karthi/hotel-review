let goodReviews = JSON.parse(localStorage.getItem('goodReviews')) || [];
let averageReviews = JSON.parse(localStorage.getItem('averageReviews')) || [];
let badReviews = JSON.parse(localStorage.getItem('badReviews')) || [];

document.getElementById('submit').addEventListener('click', function() {
    const reviewInput = document.getElementById('review');
    const review = reviewInput.value.trim();

    if (review) {
        classifyReview(review);
        reviewInput.value = ''; // Clear the input after submission
        updateCounts();
        displayReviews();
        saveReviews();
    }
});

document.getElementById('clear').addEventListener('click', function() {
    goodReviews = [];
    averageReviews = [];
    badReviews = [];
    updateCounts();
    displayReviews();
    saveReviews();
});

function classifyReview(review) {
    const reviewLower = review.toLowerCase();
    const goodKeywords = ["amazing","amazing", "excellent", "fantastic", "great", "love", "delicious", "tasty", "flavorful", "mouthwatering", "perfect", "fresh", "satisfying", "friendly", "prompt", "attentive", "excellent service", "courteous", "cozy", "comfortable", "beautiful", "clean", "relaxing", "wonderful", "highly recommend", "superb", "charming", "luxurious", "top-notch", "fabulous", "outstanding", "spectacular", "warm", "pleasant", "elegant", "cleanliness", "perfectly located", "spacious", "welcoming", "superior", "exceptional", "good value", "great ambiance", "outstanding facilities", "well-maintained", "hassle-free", "delightful", "chic", "homey", "unforgettable", "peaceful", "excellent", "fantastic", "great", "love", "delicious", "tasty", "flavorful", "mouthwatering", "perfect", "fresh", "satisfying", "friendly", "prompt", "attentive", "excellent service", "courteous", "cozy", "comfortable", "beautiful", "clean", "relaxing", "wonderful", "highly recommend"];
    const averageKeywords = ["okay","okay", "average", "not bad", "decent", "fine", "acceptable", "ordinary", "nothing special", "satisfactory", "neutral", "adequate", "modest", "acceptable", "standard", "okay service", "nothing extraordinary", "decent value", "mediocre", "just fine", "standard facilities", "unremarkable", "acceptable amenities", "serviceable", "average comfort", "pretty good", "average", "not bad", "decent", "fine", "acceptable", "ordinary", "nothing special", "satisfactory"];
    const badKeywords = ["did not like","did not like", "bland", "slow", "terrible", "cold", "tasteless", "overcooked", "undercooked", "disappointing", "rude", "dirty", "noisy", "uncomfortable", "awful", "bad", "disgusting", "worst", "unpleasant", "unfriendly", "unprofessional", "unhygienic", "not worth it", "poor service", "lackluster", "messy", "no hot water", "uncomfortable bed", "disorganized", "old-fashioned", "unwelcoming", "stale", "dirty linens", "unsanitary", "overpriced", "not clean", "unpleasant smell", "broken facilities", "lack of maintenance", "inconvenient", "unreliable", "noisy rooms", "no air conditioning", "lousy", "shabby", "underwhelming", "staff inattentive", "uncomfortable pillows", "poor food quality", "bad location", "inadequate service","did not like",,"inadequate service" "bland", "slow", "terrible", "cold", "tasteless", "overcooked", "undercooked", "disappointing", "rude", "dirty", "noisy", "uncomfortable", "awful", "bad", "disgusting", "worst"];

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
            p.innerText = `Good Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }

    if (averageReviews.length > 0) {
        averageReviews.forEach(review => {
            const p = document.createElement('p');
            p.innerText = `Average Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }

    if (badReviews.length > 0) {
        badReviews.forEach(review => {
            const p = document.createElement('p');
            p.innerText = `Bad Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }
}

function saveReviews() {
    // Save the review arrays to localStorage
    localStorage.setItem('goodReviews', JSON.stringify(goodReviews));
    localStorage.setItem('averageReviews', JSON.stringify(averageReviews));
    localStorage.setItem('badReviews', JSON.stringify(badReviews));
}

// Load saved reviews when the page loads
window.onload = function() {
    updateCounts();
    displayReviews();
}
