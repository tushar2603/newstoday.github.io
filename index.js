console.log("This is my index js file ");
// b33f392ffb654a138115cc9f9f7c72ca

//Initialize the news api parameters
let apiKey = "52e6b81f7dac8697661e6fcb37092d1e";

//Grab the news container
newsAccordian = document.getElementById("newsAccordian");

//Create a ajax GET request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en`,
  true
);

//When response is ready
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    // console.log(articles);
    let newsHtml = "";
    articles.forEach(function(element,index) {
      news = ` <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}"
                    aria-expanded="false"
                    aria-controls="collapse${index}"
                >
                   <b>Breaking News ${index+1}:</b> ${element["title"]}
                </button>
                </h2>
                <div
                id="collapse${index}"
                class="accordion-collapse collapse"
                aria-labelledby="heading${index}"
                data-bs-parent="#newsAccordian"
                >
                <div class="accordion-body">
                    ${element["description"]}. <a href="${element["url"]}" target="_blank">Read more here</a>
                </div>
                </div>
                </div>`;
      newsHtml += news;
    });
    newsAccordian.innerHTML = newsHtml;
  } else {
    console.log("Some error has occured");
  }
};

xhr.send();
