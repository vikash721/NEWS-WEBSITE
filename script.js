const apiKey = 'process.env.NEXT_PUBLIC_API_KEY'

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

async function fetchRandomNews(){

    try{

        const apiUrl =`https://newsapi.org/v2/everything?q=india&pageSize=20&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.articles;

        // Filter out articles without images
        // const articlesWithImages = data.articles.filter(article => article.urlToImage);
        // return articlesWithImages;

    } catch(error){
        console.error("Error fetching random news" , error);
        return[];
        
    }

}


searchButton.addEventListener("click" , async ()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{

            const article = await fetchNewsQuery(query);
            displayBlogs(article)

        }catch(error){
            console.log("Error fetching news by querry" , error);
            
        }
    }
})

// Add event listener to trigger button click when Enter key is pressed
searchField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action if needed
        searchButton.click(); // Trigger a click event on the search button
    }
});


async function fetchNewsQuery(query){

    try{

        const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;

        

    } catch(error){
        console.error("Error fetching random news" , error);
        return[];
        
    }



}


function displayBlogs(articels){
     blogContainer.innerHTML = ""

     articels.forEach(article => {

        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")

        const img = document.createElement("img")
        // img.src = article.urlToImage
        img.alt = article.title
        if (article.urlToImage) {
            img.src = article.urlToImage;
        }else{
            img.src = 'image-not-found.png';
        }

        const title = document.createElement("h2")

        const trimedTitle = article.title.length> 30 ? article.title.slice(0,30) + "...." : article.title;
        title.textContent = trimedTitle
        
        const description = document.createElement("p")

        const trimedDescription = article.description.length > 120 ? article.description.slice(0,120) + "...." : article.description;
        description.textContent = trimedDescription

        // description.textContent = article.description

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)

        blogCard.addEventListener("click" , ()=>{
            window.open(article.url, "_blank")
        })

        blogContainer.appendChild(blogCard)
        
     });

}


(async () =>{
    try{
       const article =  await fetchRandomNews();
       displayBlogs(article)
       

    } catch(error){
        console.error("Error fetching random news",error);
        
    }
})();



