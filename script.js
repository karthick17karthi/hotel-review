// Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyCxCHfCbE-cosAvU9oAEaVtU-bUria5FYc",
    authDomain: "hotel-reviews-ef6e0.firebaseapp.com",
    projectId: "hotel-reviews-ef6e0",
    storageBucket: "hotel-reviews-ef6e0.appspot.com",
    messagingSenderId: "596063870907",
    appId: "1:596063870907:web:664665d4cd07448685ee9e",
    measurementId: "G-PDC6GSGDNW"
};

// Initialize Firebase and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("Firebase initialized"); // Check Firebase initialization

let goodReviews = [];
let averageReviews = [];
let badReviews = [];

// Load reviews from Firebase when the page loads
window.addEventListener('load', () => {
    console.log("Page loaded");
    fetchReviewsFromFirestore();
    updateCounts();
    displayReviews();
});

// Fetch reviews from Firestore
function fetchReviewsFromFirestore() {
    db.collection("reviews").orderBy("timestamp", "desc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const review = doc.data().review;
                classifyReview(review);
            });
            updateCounts();
            displayReviews();
        })
        .catch((error) => {
            console.error("Error fetching reviews: ", error);
        });
}

// Save review to Firebase Firestore
function addReviewToFirestore(review) {
    db.collection("reviews").add({
        review: review,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Review added to Firestore!");
    }).catch((error) => {
        console.error("Error adding review to Firestore: ", error);
    });
}

// Handle review submission
document.getElementById('submit').addEventListener('click', function () {
    console.log("Submit button clicked"); // Log submit button click
    const reviewInput = document.getElementById('review');
    const review = reviewInput.value.trim();

    if (review) {
        classifyReview(review);
        reviewInput.value = ''; // Clear the input after submission
        updateCounts();
        displayReviews();
        addReviewToFirestore(review); // Save to Firestore
    } else {
        console.log("No review text entered");
    }
});

// Handle clearing reviews
document.getElementById('clear').addEventListener('click', function () {
    goodReviews = [];
    averageReviews = [];
    badReviews = [];
    updateCounts();
    displayReviews();
});

// Classify the review based on keywords
function classifyReview(review) {
    const reviewLower = review.toLowerCase();
    const goodKeywords = ["amazing", "excellent", "fantastic", "great", "love", "delicious", "perfect", "fresh","delicious", "amazing", "fantastic", "tasty", "excellent", "fresh", "mouth-watering", "scrumptious", "outstanding", "perfect",
"flavorful", "superb", "delectable", "exquisite", "satisfying", "top-notch", "best ever", "highly recommended", "incredible", "wonderful",
"generous portions", "rich", "well-seasoned", "heavenly", "premium", "quality", "authentic", "gourmet", "unforgettable", "superb presentation",
"tempting", "divine", "very fresh", "clean flavors", "perfectly cooked", "absolutely amazing", "exceptional", "worth every penny", "impressive", "mouthwatering",
"out of this world", "excellent service", "perfectly seasoned", "signature dish", "deliciously prepared", "beautifully plated", "excellent quality", "tender", "crispy", "flaky",
"luxurious", "creative", "beautifully crafted", "divine flavors", "tender and juicy", "fantastic variety", "classic dishes done right", "luxury dining", "rich textures", "top-tier",
"mouthwatering aroma", "full of flavor", "perfectly balanced", "comforting", "enjoyable", "great selection", "very satisfying", "perfect pairing", "unbeatable flavor", "amazing texture",
"very filling", "beautifully arranged", "beyond expectations", "flawless", "impeccable", "restaurant quality", "soothing", "delightful", "flavor-packed", "classic flavors"];
    const averageKeywords = ["okay", "decent", "average", "fine", "acceptable", "ordinary","okay", "decent", "fine", "good enough", "average", "not bad", "acceptable", "ordinary", "mediocre", "satisfactory",
"standard", "just okay", "nothing special", "average taste", "acceptable quality", "nothing to write home about", "okay flavor", "could be better", "fair", "passable",
"fairly good", "average experience", "nothing extraordinary", "decent choice", "tastes fine", "middle of the road", "nothing spectacular", "adequate", "so-so", "reasonable",
"standard fare", "so-so quality", "common", "not terrible", "generally fine", "consistent", "easy to enjoy", "safe choice", "works well", "moderate taste",
"could use improvement", "just fine", "unremarkable", "good enough but forgettable", "mostly okay", "non-offensive", "inconsistent", "mediocre quality", "average preparation", "mediocre selection",
"decent enough to fill you up", "passable quality", "average seasoning", "okay portion size", "quite bland", "underwhelming", "nothing special here", "just filling", "okay dish", "good for the price",
"nothing too exciting", "just alright", "okay flavor combination", "standard menu", "no complaints", "a little dry", "too salty", "ok portions", "average presentation", "safe bet"];
    const badKeywords = ["bad", "horrible", "terrible", "disappointing", "rude", "dirty", "slow","terrible", "awful", "disappointing", "bland", "gross", "overcooked", "tasteless", "cold", "burnt", "inedible",
"undercooked", "disgusting", "horrible", "unappetizing", "bad quality", "soggy", "overpriced", "unpleasant", "stale", "old",
"uncooked", "unseasoned", "rancid", "dry", "too greasy", "too salty", "too sweet", "underwhelming", "not fresh", "overwhelming",
"unfresh", "mushy", "too chewy", "hard", "too bitter", "sour", "unpalatable", "ruined dish", "bland flavor", "not tasty",
"poorly prepared", "uncooked meat", "terrible texture", "uninspired", "not what I expected", "not flavorful", "overwhelmingly spicy", "a disaster", "too salty",
"unhealthy", "disappointing experience", "flat taste", "very greasy", "too much fat", "cold food", "stale bread", "unbalanced flavors", "inconsistent", "soggy fries",
"unrealistic expectations", "inedible meal", "flavorless", "unappealing", "messy", "too much seasoning", "overly fatty", "too tough", "inconsistent taste", "badly burnt",
"poorly presented", "not cooked right", "not fresh ingredients", "unappetizing dish", "not edible", "sour taste", "not worth the price", "lack of flavor", "disgraceful", "just awful"];

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

// Update the review counts
function updateCounts() {
    document.getElementById('good-count').innerText = `Good Reviews: ${goodReviews.length}`;
    document.getElementById('average-count').innerText = `Average Reviews: ${averageReviews.length}`;
    document.getElementById('bad-count').innerText = `Bad Reviews: ${badReviews.length}`;
}

// Display reviews on the page
function displayReviews() {
    const reviewsDiv = document.getElementById('reviews');
    reviewsDiv.innerHTML = ''; // Clear previous reviews

    if (goodReviews.length > 0) {
        goodReviews.forEach(review => {
            const p = document.createElement('p');
            p.classList.add('good');
            p.innerText = `Good Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }

    if (averageReviews.length > 0) {
        averageReviews.forEach(review => {
            const p = document.createElement('p');
            p.classList.add('average');
            p.innerText = `Average Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }

    if (badReviews.length > 0) {
        badReviews.forEach(review => {
            const p = document.createElement('p');
            p.classList.add('bad');
            p.innerText = `Bad Review: ${review}`;
            reviewsDiv.appendChild(p);
        });
    }
}
