let parent = document.querySelector('.flex');
let resetButton  = document.querySelector('#reset');
let verifyButton = document.querySelector('#verify');
let msg = document.querySelector('.msg');
let eventCnt = 0, firstImageLink = "", secondImageLink = "",firstImageClass,secondImageClass, isFirstLinkFound = false;;

function randomImage(imageUrl){
  let newClassIdx = Math.floor(Math.random()*imageUrl.length);
  let link = imageUrl[newClassIdx];
  let img = document.createElement('img');
  img.src = link;
  img.classList.add(`img${imageUrl.length+1}`);
  parent.appendChild(img);
}

function populateImage(){
  console.log("inside populate");
  for(let i=1;i<=5;i++){
    let img = document.createElement('img');
    img.classList.add(`img${i}`);
    parent.appendChild(img);
  }
}

// populate image like recursion
populateImage();

// image url for random image
let children = parent.children;
let imageUrl = []; 
for(let child of children){
  let el = child;
  let style = window.getComputedStyle(el,null);
  let contentValue = style.getPropertyValue("content");
  imageUrl.push(contentValue.slice(5,-2));
}

// random image
randomImage(imageUrl);

function resetTheState(event){
  resetButton.style.display = 'none';
  parent.innerHTML = "";
  eventCnt =0;
  firstImageClass;
  secondImageClass;
  firstImageLink = "";
  secondImageLink = "";
  isFirstLinkFound = false;
  populateImage();
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