//Global currentCatTax variable
let currentCatTax = 0;

// TODO: calcButtonClick function
// Function should handle the following items:
// 1) Generate a random, whole number between 0 and 20.
// 2) If the random number is not 0, update the amountOwed div to display "You owe {random number} cat tax! Pay up!"
// 3) If the random number is not 0, update the pay button text to display "Pay Cat Tax"
// 4) If the random number is not 0, update the pay button so that it is no longer hidden
// 5) If the random number is 0, update the amountOwed div to display "You owe {random number} cat tax! You've escaped this time!"
// 6) If the random number is 0, update the pay button so that it is hidden.
// 7) Both the amountOwed and pay amount button should be updated every time the calculate cat tax button is clicked.

// Changed the payBtn class to be a success button with bootstrap
// So I changed payBtn from the class to the id and updated the functions here to be getElementById instead
function calcButtonClick() {
    currentCatTax = Math.floor(Math.random() * 21);
    if (currentCatTax !== 0) {
        document.getElementById("amountOwed").innerHTML = "You owe " + currentCatTax + " cat tax! Pay up!";
        document.getElementById("payBtn").innerHTML = "Pay Cat Tax";
        document.getElementById("payBtn").style.display = "block";
    } else {
        document.getElementById("amountOwed").innerHTML = "You owe " + currentCatTax + " cat tax! You've escaped this time!";
        document.getElementById("payBtn").style.display = "none";
    }

}

// TODO: payButton function
// Function should handle the following items:
// 1) Decrement the currentCatTax amount by 1
// 2) If the remaining cat tax is greater than zero, update the amountOwed div to display "You still owe {remaining amount} cat tax! Pay up!"
// 3) If the remaining cat tax is zero or fewer, update the amountOwed div to display "Your debts are paid..."
// 4) If the cat tax was payable (amount was greater than 0) when the button was clicked, make a call to the cat api to get a cat image (https://api.thecatapi.com/v1/images/search)
// 5) Once the cat image is retrieved, append the image to the image container
// 6) If the cat tax was not payable (amount was less than or equal to 0) when the button was clicked, replace the entire contents of the container with the gif found here (https://gfycat.com/snivelingbeautifuljoey-cat)

function payButton() {
    if (currentCatTax > 0) {
        // Moved currentCatTax variable into the if statement but before the number is shown on the site
        // In post interview testing, the last image when tax was 1 doesn't get entered if you decrement before the if statement since it checks if tax > 0
        currentCatTax--;
        // Moved logic for showing your debts are paid to if statement so it will show only when the currentCatTax is 0
        // Otherwise, it'll print how much you owe as expected
        if (currentCatTax === 0) {
            document.getElementById("amountOwed").innerHTML = "Your debts are paid...";
        } else {
            document.getElementById("amountOwed").innerHTML = "You still owe " + currentCatTax + " cat tax! Pay up!";
        }
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response data as JSON
            } else {
                throw new Error('API request failed');
            }
            })
            .then(data => {
                // Process the response data here
                console.log(data); // Example: Logging the data to the console
                // Changed order that image gets appended to it appends to the front following the given video
                document.getElementsByClassName("imageContainer")[0].innerHTML = "<img src=" + data[0].url + " alt ='cat' class='catImage'>" + document.getElementsByClassName("imageContainer")[0].innerHTML;
            })
            .catch(error => {
                // Handle any errors here
                console.error(error); // Example: Logging the error to the console
            });

    } else {
        // Step 6: Remove contents of container and replace with a cat gif of my choice (since link is broken)
        document.getElementsByClassName("container")[0].innerHTML = "<iframe src='https://giphy.com/embed/WoRz0xf3fUBWTWXUJ0' id='swag cat' width='500' height='500'>";
    }


}
