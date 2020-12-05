"use strict";

document.querySelector(".particle-btn").addEventListener("click", spawnParticles);

function spawnParticles(event) {
    for (let i = 0; i < 30; i++) {
        createParticle(event.clientX, event.clientY);
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createParticle(x, y) {
    const particle = document.createElement("particle");

    document.body.append(particle);

    // Random size between 5px and 25px
    const particleSize = Math.floor(Math.random() * 20 + 5); 
    // Random blue/purple bg color
    const particleBgClr = `hsl(${randomIntFromRange(180, 270)}, 70%, 60%)`;

    if (particle.attributeStyleMap) {
        particle.attributeStyleMap.set("width", CSS.px(particleSize));
        particle.attributeStyleMap.set("height", CSS.px(particleSize));
        particle.attributeStyleMap.set("background-color", particleBgClr);
    } else {
        particle.style.width = `${particleSize}px`;
        particle.style.height = `${particleSize}px`;
        particle.style.backgroundColor = particleBgClr;
    }

    // Random x & y destination within a distance of 75px from the mouse click
    const destX = x + (Math.random() - 0.5) * 2 * 75;
    const destY = y + (Math.random() - 0.5) * 2 * 75;

    const animation = particle.animate([
        {
            // Set origin position of particle
            // We offset the particle with half its size, to center it around the mouse
            transform: `translate(${x - (particleSize / 2)}px, ${y - (particleSize / 2)}px)`,
            opacity: 1
        },
        {
            // Define the final coordinates as the second keyframe
            transform: `translate(${destX}px, ${destY}px)`,
            opacity: 0
        }
    ], {
        // Set a random duration and delay from range in ms
        duration: randomIntFromRange(500, 1500),
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: randomIntFromRange(0, 200)
    });

    // Event handler option 1
    // animation.onfinish = () => particle.remove();

    // Promise option 2
    animation
        .finished
        .then(() => particle.remove());
}