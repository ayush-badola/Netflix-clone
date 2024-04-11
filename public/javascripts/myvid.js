var body = document.getElementById("page");
var sidepic = document.getElementById("pic");
var imgs = document.getElementById("imgs");
var text = document.getElementById("protex");
var sidebar = document.getElementById("sidebar1");
var sideopen = false;




(imgs).addEventListener("click", function(event){
    event.stopPropagation();
    if(!sideopen) {openside();}
});

(text).addEventListener("click", function(event){
    event.stopPropagation();
    if(!sideopen) {openside();}
});

document.addEventListener("click", function(event){
    var elemclic = event.target;
    if(sideopen && (!sidebar.contains(elemclic))) {closeside();}
});

function openside() {
    console.log("openside triggered");
    sidebar.style.width ="50vh";
    sidebar.style.opacity ="1";
    sidebar.style.boxShadow = "0 0 10px 10px rgba(255, 0, 0, 0.970)";
    body.style.filter = "blur(3px)";
    sideopen = true;
}

function closeside() {
    console.log("closeside triggered");
    sidebar.style.width = "0";
    sidebar.style.opacity = "0";
    sidebar.style.boxShadow = "0 0 0 0";
    body.style.filter = "blur()";
    sideopen = false;
}