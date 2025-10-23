const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],


};

answers_yes = {
    "english": "Yes",
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

// GIF list to cycle through every time the No button is clicked
const noGifs = [
    'sad.gif',
    'cute-sad.gif',
    'crying-sad.gif',
    'no.gif',
    'game.gif'

];
let gifIndex = 0;

// Ensure the button's CSS custom property matches the initial JS size
if (yes_button) {
    yes_button.style.setProperty('--btn-size', `${size}px`);
}

no_button.addEventListener('click', () => {
    // Change banner source: cycle through the noGifs array each click (instant)
    const banner = document.getElementById('banner');
    const newGif = `public/images/${noGifs[gifIndex]}`;
    if (banner) {
        banner.src = newGif;
        refreshBanner();
    }
    gifIndex = (gifIndex + 1) % noGifs.length;
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    // update the CSS custom property so font-size (which uses var(--btn-size)) scales
    yes_button.style.setProperty('--btn-size', `${size}px`);
    // keep width in sync if you want a square button
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        // reset CSS custom property and inline width
        yes_button.style.setProperty('--btn-size', `50px`);
        yes_button.style.width = `50px`;
        size = 50;
        // reset the GIF cycle and return banner to the default image
        if (banner) {
            banner.src = 'public/images/sad.gif';
            refreshBanner();
        }
        gifIndex = 0;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path instantly
    const banner = document.getElementById('banner');
    if (banner) {
        banner.src = 'public/images/yes.gif';
        refreshBanner();
    }
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    if (banner) {
        const src = banner.src;
        banner.src = '';
        banner.src = src;
    }
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, à bientôt :3";
    } else if (language === "thai") {
        successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    } else {
        successMessage.textContent = "Yepppie :3";
    }
}