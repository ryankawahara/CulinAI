// nav bar --> implement nav bar function!
let icon = document.querySelectorAll(".icon");
let nav = document.querySelector("nav");
icon.onclick = function(event) {
    if (nav.classList.contains("hidden")) {
        nav.classList.remove("hidden");
    } else {
        nav.classList.add("hidden");
    }
}
