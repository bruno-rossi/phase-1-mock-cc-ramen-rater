// Core Deliverables:
// See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
// Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.
// Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

// ## Deliverable 1:
// We need to get the images from the db and populate it into the menu element.
// GET data from "http://localhost:3000/ramens" with a fetch request
// Write a function to create a ramen in the <div id="ramen-menu"> element.
// a. Execute the function for each element in the dataset.

// ## Deliverable 2:
// When a user clicks on an image in the ramen menu div, the details of that ramen get populated as textContent in the <div id="ramen-detail"> and following elements:
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


fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(ramens => {
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
        const detailImage = document.querySelector(".detail-image");
        detailImage.src = ramen.image;
        detailImage.alt = ramen.name;

        document.querySelector(".name").textContent = ramen.name;
        document.querySelector(".restaurant").textContent = ramen.restaurant;
        document.querySelector("#rating-display").textContent = ramen.rating;
        document.querySelector("#comment-display").textContent = ramen.comment;
    })
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

    console.log(newRamen);
    
    createRamen(newRamen);

})