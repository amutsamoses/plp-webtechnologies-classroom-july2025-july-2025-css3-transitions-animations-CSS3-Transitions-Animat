// =========================================================
// 📚 Part 2: JavaScript Functions — Scope, Parameters & Return Values
// This section demonstrates function fundamentals.
// =========================================================

// Global Variable (Accessible everywhere)
const GLOBAL_THEME = "Interactive App";

/**
 * 1. Function demonstrating Parameters, Return Value, and Local Scope
 * Calculates a scaling factor for an animation based on user input.
 * @param {number} inputLevel A number representing the desired intensity (1 to 10).
 * @returns {number} A multiplier for an animation scale.
 */
function calculateScaleFactor(inputLevel) {
    // Local Variable (Only accessible inside this function)
    const MAX_SCALE = 1.5;
    
    // Validate input and calculate a factor between 1.0 and 1.5
    const normalizedLevel = Math.min(10, Math.max(1, inputLevel)); // Ensure between 1 and 10
    const factor = 1.0 + (normalizedLevel / 10) * (MAX_SCALE - 1.0);

    console.log(`[Scope Demo] Local variable MAX_SCALE: ${MAX_SCALE}`);
    console.log(`[Scope Demo] Global variable GLOBAL_THEME: ${GLOBAL_THEME}`);
    
    return factor;
}

// Example usage and demonstration of return value
const userIntensity = 7;
const calculatedScale = calculateScaleFactor(userIntensity);
console.log(`[Return Value] For intensity ${userIntensity}, scale factor is: ${calculatedScale.toFixed(2)}`);
// console.log(`Attempting to access local variable MAX_SCALE outside function: ${MAX_SCALE}`); // This would cause an error, demonstrating local scope.


/**
 * 2. Function demonstrating Reusability and DOM updates
 * Updates the status text on the page.
 * @param {string} message The status message to display.
 */
function updateStatus(message) {
    const statusElement = document.getElementById('animation-status');
    if (statusElement) {
        statusElement.textContent = `Status: ${message}`;
    }
}


// =========================================================
// 🎨🎬 Part 3: Combining CSS Animations with JavaScript
// Logic for triggering and managing the CSS animation.
// =========================================================

const animatedBox = document.getElementById('animated-box');
const triggerButton = document.getElementById('trigger-animation-btn');

/**
 * The main function to trigger the CSS animation via class manipulation.
 * This is a reusable function that combines JS logic and CSS effects.
 * @param {HTMLElement} element The DOM element to animate.
 * @param {string} animationClass The CSS class that defines the keyframe animation.
 */
function triggerCssAnimation(element, animationClass) {
    // 1. Remove any previous animation classes to allow it to be re-triggered
    element.classList.remove(animationClass, 'animated');
    
    // 2. Add the animation class to start the CSS animation (Part 3)
    // Using requestAnimationFrame ensures the class removal is processed before
    // the class is re-added, guaranteeing the animation restarts.
    requestAnimationFrame(() => {
        element.classList.add(animationClass);
        updateStatus("Animation started!");
    });

    // 3. Listen for the animation to end
    element.addEventListener('animationend', function handler() {
        // Remove the animation class once done
        element.classList.remove(animationClass);
        
        // Add a permanent visual marker (another CSS class)
        element.classList.add('animated');
        
        updateStatus("Animation finished!");
        
        // Remove the listener itself to prevent memory leaks/re-triggering
        element.removeEventListener('animationend', handler);
    });
}

// Event Listener for the button
if (triggerButton && animatedBox) {
    triggerButton.addEventListener('click', () => {
        // Call the reusable function with the specific element and CSS class
        triggerCssAnimation(animatedBox, 'bounce');
    });
} else {
    console.error("Missing DOM elements. Check index.html IDs.");
}