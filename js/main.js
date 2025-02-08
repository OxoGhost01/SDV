const image = document.getElementById('wagonTitre')
const imageWidth = image.width
const screenWidth = window.innerWidth
let positionX = screenWidth

function animateImage() {
    positionX -= 1.5; // Vitesse de défilement
    if (positionX < -imageWidth) {
        positionX = screenWidth
    }
    image.style.left = positionX + 'px'
    requestAnimationFrame(animateImage)
}

animateImage();

const sub = document.getElementById('message')
const button = document.getElementById('bouton')
button.addEventListener('click', () => {
    sub.innerText = "Merci !"
    button.style.backgroundColor = "green"
})

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    let hcaptchaResponse = document.querySelector("[name='h-captcha-response']").value; // Récupère la réponse hCaptcha
    if (!hcaptchaResponse) {
        document.getElementById("message").innerText = "Veuillez valider le hCaptcha.";
        return;
    }

    // Envoyer la réponse hCaptcha à l'API de vérification
    fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            "secret": "ES_ed60eb9128ab4d038590d49f3d254d01",
            "response": hcaptchaResponse
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("message").innerText = "hCaptcha validé ! Formulaire soumis.";
            // Ici, vous pouvez envoyer les données via Fetch ou une API.
        } else {
            document.getElementById("message").innerText = "Échec de hCaptcha, veuillez réessayer.";
        }
    })
    .catch(error => console.error("Erreur:", error));
});