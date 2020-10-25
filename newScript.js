$("#something").on("click",function (){

   let x = document.getElementById("quiz-container");
   if(x.style.display === "none"){
       x.style.display = "block";
   }else{
       x.style.display = "none";
   }
})