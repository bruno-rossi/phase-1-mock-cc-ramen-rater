// ## Deliverable 1:
// As a user, I would like to see the ramen images from the db populated as menu elements.
// Steps:
// 1. GET data from "http://localhost:3000/ramens" with a fetch request.
// 2. Write a function to create a ramen in the <div id="ramen-menu"> element.
// 3. Execute the function for each element in the dataset.

// ## Deliverable 2:
// As a user, when I click on an image in the ramen menu div, I would like to see the details of that ramen populated in the <div id="ramen-detail"> and following elements:
// Steps: 
// 1. Add a click event listener to the imgTag.
// 2. Inside the event listener, querySelector each of the following elements and set their attributes or textContent as specified:
// - <h2 class="name">Insert Name Here</h2> - ramen.name;
// - <h3 class="restaurant">Insert Restaurant Here</h3> - ramen.restaurant;
// - <span id='rating-display'>Insert rating here</span> / 10 --- ramen.rating;
// - <p id='comment-display'> --- ramen.comment;
// - <img class="detail-image" src="./assets/image-placeholder.jpg" alt="Insert Name Here" /> -- ramen.image.
// * The image's alt text should also change to display the ramen's name (ramen.name);

// ## Deliverable 3:
// As a user, I would like to submit a new ramen and have it display in the menu, with the same functionality as the ramens from the db.
// Steps:
// 1. Select the form <form id="new-ramen">
// 2. Add a "submit" event listener to the form. * Remember to prevent default behavior on the submit event.
// 3. Select the values from the form's individual field and add them to a new ramen object.
// 4. Execute the createRamen function with the new ramen object:
// - <input type="text" name="name" id="new-name" />'s value ===> object.name;
// - <input type="text" name="restaurant" id="new-restaurant" />'s value ===> object.restaurant;
// - <input type="text" name="image" id="new-image" />'s value ===> object.image;
// - <input type="number" name="rating" id="new-rating" />'s value ===> object.rating;
// - <textarea name="new-comment" id="new-comment"></textarea>'s value ====> object.comment;

// ## Advanced Deliverable 1:
// As a user, I would like to see the details of the first ramen in the db populated as soon as I load the page. 
// Steps:
// 1. Write a new function to display details
// 2. Inside the fetch, before the forEach loop, run the function to display details for ramens[0], which is the first ramen on the list.
// 3. Refactor the createRamen() function: inside the imgTag event listener, instead of writing the same code as the display details, function, we'll simply call that function and pass the ramen object as an argument.



let currentRamen;

fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(ramens => {
    
    // Run a function to display details for ramens[0] -- the first ramen in the list.
    displayRamenDetails(ramens[0]);
    
    ramens.forEach(ramen => {

        // Run the function to create a menu item here.
        createRamen(ramen);
    })
})

function createRamen(ramen) {
    const ramenMenu = document.querySelector("#ramen-menu");

    const imgTag = document.createElement("img");
    imgTag.src = ramen.image;

    ramenMenu.append(imgTag);

    imgTag.addEventListener("click", event => {
        // const detailImage = document.querySelector(".detail-image");
        // detailImage.src = ramen.image;
        // detailImage.alt = ramen.name;

        // document.querySelector(".name").textContent = ramen.name;
        // document.querySelector(".restaurant").textContent = ramen.restaurant;
        // document.querySelector("#rating-display").textContent = ramen.rating;
        // document.querySelector("#comment-display").textContent = ramen.comment;
        displayRamenDetails(ramen);
    })
}

// The function below is created in the scope of Advanced Deliverable 1:
function displayRamenDetails(ramen) {
    
    currentRamen = ramen;

    const detailImage = document.querySelector(".detail-image");
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;

    document.querySelector(".name").textContent = ramen.name;
    document.querySelector(".restaurant").textContent = ramen.restaurant;
    document.querySelector("#rating-display").textContent = ramen.rating;
    document.querySelector("#comment-display").textContent = ramen.comment;

    console.log(currentRamen);
}

const form = document.querySelector("#new-ramen");

form.addEventListener("submit", event => {
    event.preventDefault();

    let newRamen = {};

    const newRamenName = document.querySelector("#new-name").value;
    const newRamenRestaurant = document.querySelector("#new-restaurant").value;
    const newRamenImage = document.querySelector("#new-image").value;
    const newRamenRating = document.querySelector("#new-rating").value;
    const newRamenComment = document.querySelector("#new-comment").value;

    newRamen = {
        name: newRamenName,
        restaurant: newRamenRestaurant,
        image: newRamenImage,
        rating: newRamenRating,
        comment: newRamenComment
    };
    
    createRamen(newRamen);
    form.reset();

})

// ## Advanced Deliverable 2:
// As a user, I would like to submit a form to update the rating and comment for a given ramen.
// Steps:
// 1. Add the edit form's HTML to the index.html file, below the new ramen form. <form id="edit-ramen">
// 2. Add a submit event listener to the new form. Remember to prevent default!
// 3. Define a variable named currentRamen. Inside displayDetails function, assign the ramen argument to currentRamen. This will allow us to save state for any given ramen.
// 4. Assign the edit form's #new-rating input value to a new variable, updatedRating. 
// 4. Assign the form's #new-comment value to a new variable, updatedComment.
// 5. Update currentRamen's rating and comment properties using the new variables.

const editForm = document.querySelector("#edit-ramen");

editForm.addEventListener("submit", event => {
    event.preventDefault();

    const updatedRating = document.querySelector("#updated-rating").value;
    const updatedComment = document.querySelector("#updated-comment").value;

    console.log(document.querySelector("#updated-rating").value);

    currentRamen.rating = updatedRating;
    currentRamen.comment = updatedComment;

    displayRamenDetails(currentRamen);

    editForm.reset();

})