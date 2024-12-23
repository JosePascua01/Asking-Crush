const choiceBox = document.getElementById('Choices');
const staticYesButton = document.getElementById('Yes');
const movingNoButton = document.getElementById('No');
const yesButtonDimensions = staticYesButton.getBoundingClientRect();
const choiceBoxDimensions = choiceBox.getBoundingClientRect();
let audio = new Audio("assets/audio/meow.mp3");

movingNoButton.style.top = `${yesButtonDimensions.top}px`;
movingNoButton.style.left = `${choiceBoxDimensions.left + choiceBoxDimensions.width / 2 + (yesButtonDimensions.left - choiceBoxDimensions.left)}px`;
console.log(choiceBoxDimensions.right)
console.log(choiceBoxDimensions.width)
console.log(((choiceBoxDimensions.width / 2 - 100) / 2))


document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const rectNoButton = movingNoButton.getBoundingClientRect();
    const buttonCenterX = rectNoButton.left + rectNoButton.width / 2;
    const buttonCenterY = rectNoButton.top + rectNoButton.height / 2;

    const distanceX = mouseX - buttonCenterX;
    const distanceY = mouseY - buttonCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Define the "danger zone" radius
    const dangerZone = 100;

    if (distance < dangerZone) {
        // Move the div in the opposite direction
        const moveX = distanceX / distance * dangerZone;
        const moveY = distanceY / distance * dangerZone;

        const newLeft = rectNoButton.left - moveX;
        const newTop = rectNoButton.top - moveY;

        // Update position while keeping the div within the viewport
        movingNoButton.style.transition = `top 0.1s, left 0.2s`;
        movingNoButton.style.left = `${Math.min(window.innerWidth - rectNoButton.width, Math.max(0, newLeft))}px`;
        movingNoButton.style.top = `${Math.min(window.innerHeight - rectNoButton.height, Math.max(0, newTop))}px`;
    }

    // Check if the button is cornered (close to any corner)
    const cornerThreshold = 50; // Distance from the corners to trigger repositioning
    const isCornered = (
        (rectNoButton.left <= cornerThreshold && rectNoButton.top <= cornerThreshold) || // Top-left corner
        (rectNoButton.left <= cornerThreshold && rectNoButton.bottom >= window.innerHeight - cornerThreshold) || // Bottom-left corner
        (rectNoButton.right >= window.innerWidth - cornerThreshold && rectNoButton.top <= cornerThreshold) || // Top-right corner
        (rectNoButton.right >= window.innerWidth - cornerThreshold && rectNoButton.bottom >= window.innerHeight - cornerThreshold) // Bottom-right corner
    );

    if (isCornered) {
        // Move the button to the center of the viewport
        movingNoButton.style.top = `${yesButtonDimensions.top}px`;
        movingNoButton.style.left = `${choiceBoxDimensions.left + choiceBoxDimensions.width / 2 + (yesButtonDimensions.left - choiceBoxDimensions.left)}px`;
    }
});