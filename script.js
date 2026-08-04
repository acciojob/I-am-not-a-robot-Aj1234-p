let parent = document.querySelector('.flex');
let resetButton  = document.querySelector('#reset');
let verifyButton = document.querySelector('#verify');
let msg = document.querySelector('.msg');
let eventCnt = 0, firstImageClass = "", secondImageClass = "", isFirstClassFound = false;;

function populateImage(){
  console.log("inside populate");
  let imageUrl = [];
  for(let i=1;i<=5;i++){
    let img = document.createElement('img');
    console.log(img);
    img.classList.add(`img${i}`);
    imageUrl.push(`img${i}`);
    parent.appendChild(img);
  }
  let newClassIdx = Math.floor(Math.random()*imageUrl.length);
  let img = document.createElement('img');
  img.classList.add(imageUrl[newClassIdx]);
  parent.appendChild(img);
}

populateImage();

function resetTheState(event){
     resetButton.style.display = 'none';
     parent.innerHTML = "";
     populateImage();
}

function userImageChoose(e){
  console.log("child click ",e.target)
  eventCnt++;
  let addClass = e.target.classList.value;
  if(!isFirstClassFound){
    firstImageClass = addClass;
    isFirstClassFound = true;
  }else{
    secondImageClass = addClass;
    isFirstClassFound = false;
  }
  resetButton.style.display = 'inline';
  resetButton.addEventListener('click',resetTheState);
  console.log("Event cnt",eventCnt);
  console.log("first class ",firstImageClass);
  console.log("second class ",secondImageClass)
  if(!isFirstClassFound && eventCnt==2 ){
    verifyButton.style.display = 'inline';
    verifyButton.addEventListener('click',()=>{
      verifyButton.style.display = 'none';
      let p = document.createElement('p');
      p.id = "para";
      if(firstImageClass===secondImageClass){
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
