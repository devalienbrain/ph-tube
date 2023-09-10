// Category Api Loading codes start
const loadCategoryApiData = async() =>{
const apiCategoryData = await fetch('https://openapi.programming-hero.com/api/videos/categories');
const categoryData = await apiCategoryData.json();
displayCategoryApiData(categoryData);
}
loadCategoryApiData();

function displayCategoryApiData(categoryData){
  const categoryContainer = document.getElementById('category-container');
  const categories = categoryData.data;
   categories.forEach(category => {
    const a = document.createElement('a');
    a.innerHTML=`<button onclick="dataCategorySelector(this)"  class="flex justify-center items-center bg-gray-200 py-2 px-5 rounded-sm">${category.category}</button>
    `;
categoryContainer.appendChild(a);
   });
    categoryContainer.childNodes[1].childNodes[0].classList.add('bg-red-500');
  categoryContainer.childNodes[1].childNodes[0].classList.add('text-white');
}
// Category Api Loading codes end

// Api all data loading codes
let url = 'https://openapi.programming-hero.com/api/videos/category/1000';

function dataCategorySelector(event){
const categoryContainer = document.getElementById('category-container');
for(let i = 1; i<=4;i++){
  categoryContainer.childNodes[i].childNodes[0].classList.remove('bg-red-500');
  categoryContainer.childNodes[i].childNodes[0].classList.remove('text-white');
  categoryContainer.childNodes[i].childNodes[0].classList.add('bg-gray-200');
  categoryContainer.childNodes[i].childNodes[0].classList.add('text-black');
  
}
event.classList.remove('bg-gray-200');
    event.classList.remove('text-black');
    event.classList.add('bg-red-500');

    event.classList.add('text-white');

  if (event.innerText === 'Music'){
    url='https://openapi.programming-hero.com/api/videos/category/1001';
  }
  else if (event.innerText === 'Comedy'){
    url='https://openapi.programming-hero.com/api/videos/category/1003';
  }
  else if (event.innerText === 'Drawing'){
    url='https://openapi.programming-hero.com/api/videos/category/1005';
  }
  else{
    url='https://openapi.programming-hero.com/api/videos/category/1000';
  }
  
  categoryWiseLoadApiData();
}

const categoryWiseLoadApiData = async(isSort) =>{
  const apiDataByCategory = await fetch(url);
  const dataByCategory = await apiDataByCategory.json();

  // console.log(dataByCategory);
  // SORT CODE
  if(isSort){
// console.log('sort')
dataByCategory.data.sort((a,b) => parseFloat(b.others.views)-parseFloat(a.others.views));
  }
    // console.log(dataByCategory);
  showApiDataByCategory(dataByCategory);
}
categoryWiseLoadApiData();
function showApiDataByCategory(dataByCategory){
  // console.log(dataByCategory.data);
  const hr=3600;
const datas = dataByCategory.data;
  const apiDataContainer = document.getElementById('api-data-container');
  apiDataContainer.textContent='';
// No data display handle
// console.log(datas.length);
const noData = document.getElementById("no-data");
noData.textContent='';
if(datas.length === 0){
  const div = document.createElement('div');
  div.innerHTML=`<div class="p-5">
  <img class="inline " src="icon.png" alt="">
<p class="font-bold text-2xl">Oops!! Sorry, There is no 
content here</p>
  </div>
  `;
  noData.appendChild(div);
  return;
}
  datas.forEach(data => {
    // console.log(data);

    // time conversion process code
    // console.log(data.others.posted_date);
    let timeAgo = '';
    const time=data.others.posted_date;
    if(time){
const hr = Math.floor(time/3600);
const min = Math.floor((time- hr*3600)/60);
// console.log(`${hr}hrs ${min}min ago`);
timeAgo = `${hr}hrs ${min}min ago`;
// console.log(timeAgo);
    }

    const div = document.createElement('div');
  
  div.innerHTML=`<div class="card bg-base-100 shadow-xl">
  <figure><img class="w-80 h-52 rounded-xl" src="${data.thumbnail}" />
  
  </figure>
  <div> ${time!== 0 ? 
`<div class="flex justify-end mr-9 -mt-9">
  <p class="bg-black text-white text-xs">${timeAgo}</p>
</div>` : ''} 
</div>
  <div class="card-body">
<div class="flex gap-3">
  <div>
    <img class="w-8 h-8 rounded-2xl" src="${data.authors[0].profile_picture}" alt="Author pic">
  </div>
  <div class="text-left">
    <h2 class="card-title">${data.title}</h2>
    <p>${data.authors[0].profile_name}
     ${data.authors[0].verified === true ? `<img class="w-4 inline" src="verified.svg" />` : ''}
    </p>
    <p>${data.others.views} views</p>
  </div>
</div>
  </div>`;

apiDataContainer.appendChild(div);
});

}

// sorting part
function sortItemsBtnClicked(){
categoryWiseLoadApiData(true);
}

