/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const docFragment = document.createDocumentFragment();
const navList = document.querySelector('ul');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav

function buildNavItem(section){
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    const text = section.dataset.nav;
    const ref = section.id;
    anchor.href = '#' + ref;
    anchor.textContent = text;
    anchor.classList.add("menu__link");
    listItem.appendChild(anchor);
    listItem.classList.add("menu__item");
    docFragment.appendChild(listItem);
}


// Add class 'active' to section when near top of viewport
function toggleActiveState(navItems){
    if(!!window.IntersectionObserver){
        let observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
              if(entry.isIntersecting){
                for (const navItem of navItems) {
                    if(navItem.firstChild.getAttribute("href") === "#" + entry.target.id)
                    navItem.classList.add('active');
                    else 
                    navItem.classList.remove('active');
        
                }
                for (const section of sections) {
                    if(section.id === entry.target.id)
                    section.classList.add('active');
                    else 
                    section.classList.remove('active');
        
                }
              }
            });
          }, {threshold: 0.5});
          document.querySelectorAll('section').forEach(section => { observer.observe(section) });

        }
        
}




// Scroll to anchor ID using scrollTO event
function scrollToSection (evt) {
    evt.preventDefault();
    if (evt.target.nodeName === 'A') {
        const selectedSection = document.querySelector(evt.target.getAttribute("href")); 
        selectedSection.scrollIntoView({behavior: "smooth", block: "center"}); 
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
for (const section of sections) {
    buildNavItem(section);
}
navList.appendChild(docFragment);

let navItems = document.querySelectorAll('.menu__item');

// Scroll to section on link click
document.querySelector('ul').addEventListener('click', scrollToSection);

// Set sections as active
window.addEventListener('scroll', toggleActiveState(document.querySelectorAll('.menu__item')));

