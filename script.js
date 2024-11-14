// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("Firebase initialized"); // Check Firebase initialization

let goodReviews = [];
let averageReviews = [];
let badReviews = [];

// Load reviews from Firebase when the page loads
window.addEventListener('load', () => {
    console.log("Page loaded");
    fetchReviewsFromFirestore();
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
        fetchReviewsFromFirestore(); // Refresh reviews after adding new one
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
        addReviewToFirestore(review); // Save to Firestore
    } else {
        alert("Please enter a review."); // Alert if no review text
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
    const goodKeywords = ["amazing", "excellent", "fantastic", "great", "love", "delicious", "perfect", "fresh"];
    const averageKeywords = ["okay", "decent", "average", "fine", "acceptable", "ordinary"];
    const badKeywords = ["bad", "horrible", "terrible", "disappointing", "rude", "dirty", "slow"];

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

