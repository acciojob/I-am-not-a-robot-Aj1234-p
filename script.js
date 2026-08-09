let parent = document.querySelector('.flex');
let resetButton  = document.querySelector('#reset');
let verifyButton = document.querySelector('#verify');
let msg = document.querySelector('.msg');
let eventCnt = 0, firstImageLink = "", secondImageLink = "",firstImageClass,secondImageClass, isFirstLinkFound = false;;

function shuffleImages(min,max){
  const numbers = Array.from(
    {length:max},
    (_,index)=>min+index
  );
  for(let i=numbers.length-1;i>=0;i--){
    let j = Math.floor(Math.random()*(i+1));
    [numbers[i],numbers[j]] = [numbers[j],numbers[i]];
  }
  return numbers;
}

console.log(shuffleImages(1,5));
let shuffleIndex;
 shuffleIndex = shuffleImages(1,5);

// populate image like recursion
populateImage(shuffleIndex);
// image url for random image
let imageUrl = []; 
let children = parent.children;
fetchImageUrl(imageUrl,children);
console.log(imageUrl)
// random image
randomImage(imageUrl);

function populateImage(){
  for(let i=0;i<shuffleIndex.length;i++){
    let img = document.createElement('img');
    img.classList.add(`img${shuffleIndex[i]}`);
    parent.appendChild(img);
  }
}

function fetchImageUrl(imageUrl,children){
  for(let child of children){
    let el = child;
    let style = window.getComputedStyle(el,null);
    let contentValue = style.getPropertyValue("content");
    imageUrl.push(contentValue.slice(5,-2));
  }
}

function randomImage(imageUrl){
  let newClassIdx = Math.floor(Math.random()*imageUrl.length);
  let link = imageUrl[newClassIdx];
  console.log(newClassIdx);
  let img = document.createElement('img');
  img.src = link;
  img.classList.add(`img${imageUrl.length+1}`);
  parent.appendChild(img);
}


function resetTheState(event){
  resetButton.style.display = 'none';
  parent.innerHTML = "";
  eventCnt =0;
  firstImageClass;
  secondImageClass;
  firstImageLink = "";
  secondImageLink = "";
  isFirstLinkFound = false;
  shuffleIndex = [];
  shuffleIndex = shuffleImages(1,5);
  populateImage(shuffleIndex);
  imageUrl = [];
  children = parent.children;
  fetchImageUrl(imageUrl,children);
  randomImage(imageUrl);
}

function userImageChoose(ele){
   resetButton.style.display = 'inline';
   resetButton.addEventListener('click',resetTheState);
  eventCnt++;
  let imageLink, imageClass;
  if(ele.target.src){
    imageLink = ele.target.src;
    imageClass = ele.target.classList.value;
  }else{
    let el = ele.target;
    imageClass = ele.target.classList.value;
    let style = window.getComputedStyle(el,null);
    let contentValue = style.getPropertyValue("content");
    imageLink = contentValue.slice(5,-2);
  }
  if(!isFirstLinkFound){
    firstImageLink = imageLink;
    firstImageClass = imageClass;
    isFirstLinkFound = true;
  }else{
    secondImageLink = imageLink;
    secondImageClass = imageClass;
    isFirstLinkFound = false;
  }
  if(!isFirstLinkFound && firstImageClass!==secondImageClass && eventCnt==2 ){
    verifyButton.style.display = 'inline';
    verifyButton.addEventListener('click',()=>{
      verifyButton.style.display = 'none';
      let p = document.createElement('p');
      p.id = "para";
      if(firstImageLink===secondImageLink){
        p.textContent = "You are a human. Congratulations!"
      }else{
        p.textContent = "We can't verify you as a human. You selected the non-identical tiles."
      }
      msg.appendChild(p);
    });
  }
  else{
    verifyButton.style.display = 'none';
  }
}

parent.addEventListener('click',userImageChoose);

