//accrtion//
          
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}


/* Navigation */
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function getallPosts() {
  fetch("http://amberdream.dk/examwp/wp-json/wp/v2/posts?_embed&per_page=16")
      .then(res=>res.json())
      .then(showEvents);
}
//for categories//
function getPostsByTag(id) {
  fetch("http://amberdream.dk/examwp/wp-json/wp/v2/posts?_embed&categories="+id).then(res=>res.json()).then(showEvents);
}
//for categories//
function getSingleEventById(myId){
  //console.log(myId);
    fetch("http://amberdream.dk/examwp/wp-json/wp/v2/posts/"+myId+"/?_embed").then(res=>res.json()).then(showSingleEvent);
}

function showSingleEvent(json) {
  //console.log(json);
    document.querySelector("#single h1").textContent = json.title.rendered;
    document.querySelector("#single .price span").textContent = json.acf.price;
    document.querySelector("#single .materials span").textContent = json.acf.material;
    document.querySelector("#single .content").innerHTML = json.content.rendered;
    document.querySelector("#single .img").setAttribute = json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
   
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function getMenu() {
  fetch(
    "http://amberdream.dk/examwp/wp-json/wp/v2/categories"
  )
    .then(e=>e.json())
    .then(showMenu);
}

function showMenu(tags){
    //console.log(tags);
    let lt = document.querySelector("#linkTemplate").content;
    
    
    tags.forEach(function(tag){
       let clone = lt.cloneNode(true);
    let parent = document.querySelector("#tagMenu");
    
    clone.querySelector("a").textContent=tag.name;
    clone.querySelector("a").setAttribute("href", "gallery.html?tagid="+tag.id);
    parent.appendChild(clone); 
    });
    
};
function showEvents(data){
    console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector(".eventTemplate").content;
    
    data.forEach(function(theEvent){
        //console.log(theEvent)
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        //let excerpt = clone.querySelector (".excerpt");
        let price = clone.querySelector (".price span");
        let img = clone.querySelector(".img");
        
        //....for single//
        let link = clone.querySelector("a.read-more");
        
        
        title.textContent =theEvent.title.rendered;
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
        price.textContent =theEvent.acf.price;
        //excerpt.innerHTML = theEvent.excerpt.rendered;
        //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url)
        //img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
        
        //....for single//
        link.setAttribute("href", "single.html?id="+theEvent.id);
        
        
        list.appendChild(clone);
    });
    
    
}

let searchParams = new URLSearchParams(window.location.search);
  let id = searchParams.get("id");
  let tagid = searchParams.get("tagid");


getMenu();
if(id){
    getSingleEventById(id);
}
if(tagid){
  getPostsByTag(tagid) ; 

}else{
    getallPosts();
}


//drop down menu//
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}