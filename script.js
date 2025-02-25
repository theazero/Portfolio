// SCrolla till motsvarande sektion

document.addEventListener("DOMContentLoaded", function () {
    // Skapa ett objekt för att koppla words till sektioner
    const sectionMap = {
        "word2": ".experience",  // Experience
        "word3": ".about-me",    // About
        "word4": ".projects",    // Projects
    };

    // Hämta alla "word"-element
    document.querySelectorAll(".word").forEach(word => {
        word.addEventListener("click", function () {
            const targetClass = sectionMap[this.id]; // Hämta rätt sektion från map
            const targetSection = document.querySelector(targetClass);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});







// Github API

var gitprojects = document.querySelector(".projects");

fetch("https://api.github.com/users/theazero/repos").then(
    response => {
        if(response.ok) {
            return response.json();
        } else {
            console.log(response.statusText);
        }
    }
).then(async result => {
        gitprojects.innerHTML = ""; // Rensa tidigare innehåll
        
        for (var i = 0; i < result.length; i++) {
            if (result[i].stargazers_count !== 0) {
                console.log(result[i]);
    
                let imageUrl = result[i].owner.avatar_url; // Standardbild från GitHub-profil
    
                try {
                    // Hämta repo-filer för att kolla efter PNG-bilder
                    const repoContents = await fetch(`https://api.github.com/repos/${result[i].owner.login}/${result[i].name}/contents`);
                    const files = await repoContents.json();
    
                    // Filtrera ut PNG-bilder
                    const pngFile = files.find(file => file.name.endsWith(".png"));
    
                    // Om en PNG-bild hittas, använd den istället
                    if (pngFile) {
                        imageUrl = pngFile.download_url;
                    }
                } catch (error) {
                    console.error("Error fetching repository contents:", error);
                }
    
                var proj = `
                <div class="project-list">
                  <div class="project">
                    <img src="${imageUrl}" alt="${result[i].name}" class="project-image">
                    <h3>${result[i].name}</h3>
                    <p>${result[i].description || "No description available"}</p>
                    <a href="${result[i].html_url}" target="_blank">View on GitHub</a>
                  </div>
                </div>`;
    
                gitprojects.innerHTML += proj;
            }
        }
    }).catch(error => console.error("Error fetching repositories:", error));
    
















// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    console.log(e);
  });



 
 
 






gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.page', // Trigger the animation on .page
        start: 'top bottom', // Start when the top of the page hits the bottom of the viewport
        end: 'bottom top', // End when the bottom of the page hits the top of the viewport
        scrub: true, // Sync the animation with scrolling
        markers: false, // Optional: for debugging, remove if not needed
        onEnter: () => {
            gsap.to('.page', {
                opacity: 1, // Fade in the element
                x: 0, // Slide the element from the right to its original position
                duration: 2, // Duration of the animation
                ease: 'power2.out', // Ease for a smooth transition
            });
        },
        
    }
});


document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM är laddad');

    // Samla alla element som ska påverkas
    const elements = [
        document.getElementById('word1'),
        document.getElementById('word2'),
        document.getElementById('word3'),
        document.getElementById('word4'),
        document.getElementById('word5')
    ];

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    function scrambleText(element, duration = 1000, fps = 60) {
        if (!element) return;

        let originalText = element.textContent;
        let scrambledText = originalText.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("");

        let frames = Math.floor((duration / 1000) * fps); // Antal bildrutor för smooth effekt
        let frame = 1;

        let interval = setInterval(() => {
            element.textContent = scrambledText.split("").map((char, index) => {
                let progress = frame / frames; // Hur långt vi har kommit i animationen (0-1)
                return Math.random() > progress ? chars[Math.floor(Math.random() * chars.length)] : originalText[index];
            }).join("");

            frame++;
            if (frame >= frames) {
                clearInterval(interval);
                element.textContent = originalText; // Återställ originaltexten
            }
        }, 1000 / fps);
    }

    // Starta scrambling på alla element
    elements.forEach(element => scrambleText(element, 1200, 60)); // 1200ms varaktighet, 60 fps
});



