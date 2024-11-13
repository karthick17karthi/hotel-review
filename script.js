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
    const goodKeywords = ["amazing", "amazing", "excellent", "fantastic", "great", "love", "delicious", "tasty", "flavorful", "mouthwatering", "perfect",
    "fresh", "satisfying", "friendly", "prompt", "attentive", "excellent service", "courteous", "cozy", "comfortable", "beautiful",
    "clean", "relaxing", "wonderful", "highly recommend", "outstanding", "superb", "impressive", "exceptional", "amazing experience",
    "top-notch", "enjoyable", "luxurious", "memorable", "quality", "remarkable", "great ambiance", "top quality", "beautiful decor",
    "affordable", "friendly staff", "welcoming", "delightful", "calm", "peaceful", "tranquil", "classy", "stylish", "exquisite",
    "spacious", "modern", "charming", "cozy atmosphere", "good value", "personalized service", "wonderful experience", "great taste",
    "beautiful surroundings", "outdoor seating", "comfortable beds", "good vibes", "relaxed atmosphere", "welcoming environment",
    "attention to detail", "romantic", "elegant", "exceeds expectations", "highly satisfied", "luxurious comfort", "unforgettable",
    "timely service", "superior quality", "excellent food", "amazing customer service", "professional staff", "well-maintained",
    "polite staff", "outdoor space", "good variety", "friendly ambiance", "close to attractions", "great hospitality", "impressive menu",
    "pleasant experience", "relaxing stay", "easy check-in", "wonderful staff", "luxury experience", "excellent location", "charming place",
    "beautiful view", "good food", "fresh produce", "quick response", "luxurious amenities", "top tier", "well-priced", "clean room",
    "attentive service", "comfy bed", "positive experience", "fantastic food", "excellent communication", "pleasant atmosphere",
    "easy check-out", "fun experience", "comfortable environment", "timely assistance", "loved the ambiance", "above and beyond",
    "friendly management", "great selection", "enjoyable stay", "good breakfast", "beautiful hotel", "positive energy", "lovely place",
    "helpful staff", "top experience", "extraordinary", "superb ambiance", "great facilities", "wonderful design", "great options",
    "perfect atmosphere", "excellent attention", "welcoming vibe", "outstanding food", "perfect getaway", "easy access", "amazing experience",
    "exceptional decor", "perfect place to stay", "outdoor activities", "vibrant", "ideal location", "lovely atmosphere", "friendly environment","excellent", "fantastic", "great", "love", "delicious", "tasty", "flavorful", "mouthwatering", "perfect", "fresh", "satisfying", "friendly", "prompt", "attentive", "excellent service", "courteous", "cozy", "comfortable", "beautiful", "clean", "relaxing", "wonderful", "highly recommend"];
    const averageKeywords = ["okay", "okay", "average", "not bad", "decent", "fine", "acceptable", "ordinary", "nothing special", "satisfactory", "fair",
    "neutral", "adequate", "alright", "okay service", "just okay", "standard", "consistent", "decent food", "reasonable", "okay experience",
    "typical", "mediocre", "adequate service", "average quality", "just fine", "average food", "acceptable service", "passable",
    "standard service", "nothing to complain", "fair service", "standard experience", "okay stay", "basic", "acceptable decor", "acceptable price",
    "alright place", "fine dining", "average taste", "nothing extraordinary", "just alright", "simple", "fair price", "average atmosphere",
    "fairly comfortable", "just decent", "moderate", "adequate facilities", "just okay food", "not impressive", "basic amenities", "good but not great",
    "enough", "mediocre service", "somewhat good", "no surprises", "decent stay", "average quality food", "average value", "standard room",
    "comfortable enough", "average comfort", "fair dining experience", "good enough", "just fine service", "mediocre ambiance", "simple food",
    "average variety", "nothing memorable", "okay ambiance", "fine service", "decent comfort", "nothing wrong", "neutral review", "nothing fancy",
    "basic stay", "not bad experience", "nothing special about it", "moderate quality", "fairly priced", "average location", "decent choice",
    "good enough location", "normal experience", "okay quality", "mediocre experience", "nothing exciting", "nothing spectacular", "fine atmosphere",
    "decent room", "standard food", "average comfort level", "nothing out of the ordinary", "fairly decent", "moderate dining", "basic decor",
    "okay location", "average vibe", "no complaints", "average option", "average services", "adequate amenities", "so-so", "fine service",
    "fair value", "unremarkable", "average stay", "moderate service", "satisfactory service", "moderately priced", "consistent quality",
    "standard experience", "just sufficient", "nothing exceptional", "basic amenities provided", "nothing to write home about", "decent dining",
    "sufficient", "mediocre quality", "tolerable", "nothing bad", "nothing special food", "average reviews", "acceptable price point" ,"average", "not bad", "decent", "fine", "acceptable", "ordinary", "nothing special", "satisfactory"];
    const badKeywords = ["did not like", "bland", "slow", "terrible", "cold", "tasteless", "overcooked", "undercooked", "disappointing", "rude", "dirty", "noisy", "uncomfortable", "awful", "bad", "disgusting", "worst","did not like", "bland", "slow", "terrible", "cold", "tasteless", "overcooked", "undercooked", "disappointing", "rude","dirty", "noisy", "uncomfortable", "awful", "bad", "disgusting", "worst", "horrible", "unprofessional", "stale", "unfriendly",
    "unclean", "unpleasant", "dissatisfied", "shocking", "horrible experience", "unpleasant smell", "terrible service", "unhelpful",
    "uncooperative", "poor quality", "unhygienic", "not worth it", "poor food", "lackluster", "terrible food", "lack of service",
    "broken", "inconvenient", "disappointing service", "too noisy", "awful food", "noisy environment", "poor location", "horrible ambiance",
    "dirty room", "dirty bathroom", "subpar", "uncomfortable beds", "unsafe", "loud", "unpleasant stay", "negative experience",
    "not clean", "slow service", "unfriendly staff", "broken equipment", "unmaintained", "low quality", "not recommended", "uncomfortable room",
    "unresponsive", "unorganized", "horrible customer service", "lack of cleanliness", "poor decor", "not spacious", "broken appliances",
    "unsanitary", "shabby", "unprofessional staff", "cold food", "underwhelming", "awful experience", "terrible condition", "bad atmosphere",
    "stuffy", "inconvenient location", "bad management", "understaffed", "dirty sheets", "unsatisfactory service", "noisy neighbors",
    "terrible location", "rude employees", "overpriced", "too small", "no hot water", "unpleasant decor", "poor maintenance", "unpleasant stay",
    "dirty towels", "dissatisfactory", "bad smell", "noisy air conditioning", "sloppy", "hard to reach", "terrible ambiance", "cheap quality",
    "poor lighting", "cheap food", "poor reviews", "substandard", "shocking behavior", "not worth the money", "discomforting", "lack of care",
    "lousy", "inconvenient check-in", "smelly", "unresponsive service", "overpriced food", "unattractive", "unhygienic food", "unsatisfactory stay",
    "unwanted noise", "bad management", "terrible atmosphere", "no care for details", "incompetent staff", "negative reviews", "unimpressive",
    "too expensive", "worse than expected", "unmotivated staff", "untrustworthy", "very slow", "unworthy", "terrible value", "dirty restaurant",
    "poor reputation", "unsupportive staff", "disastrous", "overcrowded", "underperforming", "unreliable", "not cleaned properly", "inconsiderate",
    "bad value", "horrific", "poor service", "no room service"];

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
