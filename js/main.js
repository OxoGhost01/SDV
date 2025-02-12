const image = document.getElementById('wagonTitre')
const imageWidth = image.width
const screenWidth = window.innerWidth
let positionX = screenWidth

function animateImage() {
    positionX -= 10; // Vitesse de défilement
    if (positionX < -imageWidth) {
        positionX = screenWidth
    }
    image.style.left = positionX + 'px'
    requestAnimationFrame(animateImage)
}

animateImage();

const sub = document.getElementById('message')
const button = document.getElementById('submitBtn')
button.addEventListener('click', () => {
    sub.innerText = "Merci !"
    button.style.backgroundColor = "green"
    document.getElementById("contactForm").reset()
})

function onCaptchaSuccess(token) {
    console.log("✅ hCaptcha validé ! Token :", token)

    if (token) {
        document.getElementById("message").innerText = "✅ hCaptcha validé !"
        document.getElementById("submitBtn").classList.add("visible")
    }
}

const depart = document.getElementById("depart")
const destination = document.getElementById("destination")
const prixContainer = document.getElementById("prixContainer")
const prixElement = document.getElementById("prix")
const reserverBtn = document.getElementById("reserver")
const distances = {
    "paris-lyon": 450,
    "paris-marseille": 775,
    "paris-bordeaux": 584,
    "paris-lille": 220,
    "lyon-marseille": 315,
    "lyon-bordeaux": 540,
    "lyon-lille": 680,
    "marseille-bordeaux": 646,
    "marseille-lille": 1020,
    "bordeaux-lille": 790
}
let visible = false
reserverBtn.addEventListener('click', () => {
        if(!visible) {
        const gareDepart = depart.value
        const gareArrivee = destination.value

        if (gareDepart === gareArrivee || gareDepart === "" || gareArrivee === "") {
            prixContainer.classList.add("hidden")
            alert("Veuillez choisir deux gares différentes")
            return
        }
        if (date.value === "" || horaire.value === "") {
            alert("Veuillez sélectionner une date et un horaire");
            return;
        }

        const trajet = gareDepart + "-" + gareArrivee
        const trajetInverse = gareArrivee + "-" + gareDepart

        let distance = distances[trajet] || distances[trajetInverse] || 0

        if (distance > 0) {
            let prix = (distance * 0.12 + 10).toFixed(2) // Prix basé sur la distance (~0.12€/km + 10€ de base)
            prixElement.textContent = prix
            prixContainer.classList.remove("hidden")
            prixContainer.classList.add("visible")
            visible = true
            reserverBtn.textContent = "Payer"
        }
    }
    else {
        window.location.href = "https://buy.stripe.com/test_fZeaI06YR7da6aI5kk"
        visible = false
    }
})

window.onload = function() {
    document.getElementById("depart").selectedIndex = 0
    document.getElementById("destination").selectedIndex = 0
    document.getElementById("date").value = ""
    document.getElementById("horaire").value = ""
}