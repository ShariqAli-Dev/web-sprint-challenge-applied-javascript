import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // Creating Elements
  const { headline, authorPhoto, authorName } = article;
  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const authorImg = document.createElement('img');
  const authorSpan = document.createElement('span');

  // Adressing Classes
  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  imgDiv.classList.add('img-container');
  authorDiv.classList.add('author');
  
  // Adressing Content
  headlineDiv.textContent = headline;
  authorImg.src = authorPhoto;
  authorSpan.textContent = `By ${authorName}`;

  // Adressing Heiarchy
  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  authorDiv.appendChild(authorSpan);
  imgDiv.appendChild(authorImg);

  // Click Event Listener
  cardDiv.addEventListener('click', () => {
    console.log(headlineDiv.textContent);
  });

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  
  const selectedElement = document.querySelector(selector);
  axios.get('https://lambda-times-api.herokuapp.com/articles')
  .then(request => {
    // Declaring Arrays
    const bootstrapArray = request.data.articles.bootstrap;
    const javascriptArray = request.data.articles.javascript;
    const jqueryArray = request.data.articles.jquery;
    const nodeArray = request.data.articles.node;
    const technologyArray = request.data.articles.technology;

    // Function that convers the given array of articles into a news card
    const arrayToCard = (array) => {
      array.forEach(article => {
        const newCard = Card(article);
        selectedElement.appendChild(newCard);
      });
    }

    arrayToCard(bootstrapArray)
    arrayToCard(javascriptArray)
    arrayToCard(jqueryArray)
    arrayToCard(nodeArray)
    arrayToCard(technologyArray)    
  })
  .catch(error => console.log(error));
}

export { Card, cardAppender }
