function getData() {
  fetch("http://amberdream.dk/examwp/wp-json/wp/v2/posts?_embed&per_page=16").then(res=>res.json()).then(showPosts);
}

function showPosts(data){
    console.log(data)
    let list = document.querySelector("#list2");
    let template = document.querySelector(".eventTemplate2").content;
    
    data.forEach(function(theEvent){
        console.log(theEvent)
        let clone = template.cloneNode(true);
        let title = clone.querySelector(".h2");
        //let excerpt = clone.querySelector (".excerpt");
        let price = clone.querySelector (".price2 span");
        let img = clone.querySelector(".img2");
        
         //....for single//
        let link = clone.querySelector("a.read-more2");
        
        
        
        
        
        
        title.textContent =theEvent.title.rendered;
        price.textContent =theEvent.acf.price;
        //excerpt.innerHTML = theEvent.excerpt.rendered;
        //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url)
        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
        
        
        
       link.setAttribute("href", "single.html?id="+theEvent.id); 
        
        
        list.appendChild(clone);
    });
}
    
    getData();
    