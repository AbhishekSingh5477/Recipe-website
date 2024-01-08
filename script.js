let sbutton=document.getElementById("search");
let result=document.getElementById("result");
let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
sbutton.addEventListener("click",()=>{
     let input=document.getElementById("type").value;
     if(input.length==0){
         result.innerHTML="<h3>Please Enter Dish First!</h3>"
     }
     else{
      fetch(url + input)
      .then((response) => response.json())
      .then((data) => {
        let myMeal=data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count=1; let ingredients=[];
        for(i in myMeal){
            let ingredient="";
            let measure="";
            if(i.startsWith("strIngredient")&&myMeal[i]){
                ingredient=myMeal[i];
                measure=myMeal["strMeasure"+count];
                count++;
                ingredients.push(`${measure} ${ingredient}`)
            }
        }
        console.log(ingredients);
        result.innerHTML=`
        <img src=${myMeal.strMealThumb}>
        <div id="details">
           <h2>${myMeal.strMeal}</h2>
           <h4>${myMeal.strArea}</h4>
          </div>
          <div id="ingredients-con"></div>
            <div id="recipe">
               <button id="hide-recipe">X</button>
               <pre id="instructions">${myMeal.strInstructions}</pre>
            </div>  
            <button id="show-recipe">View Recipe</button>
        `;
        let ingredientCon=document.getElementById("ingredients-con");
        let parent=document.createElement("ul");
        let recipe=document.getElementById("recipe");
        let showrecipe=document.getElementById("show-recipe");
        let hiderecipe=document.getElementById("hide-recipe");
        ingredients.forEach((i)=>{
          let child=document.createElement("li");
          child.innerText=i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        })
        showrecipe.addEventListener("click",()=>{
                 recipe.style.display="block";
        })
        hiderecipe.addEventListener("click",()=>{
          recipe.style.display="none";
    })
      }).catch(()=>{
        result.innerHTML="<h3>Sorry!Can't find any dish</h3>"
      })
     }

   })
