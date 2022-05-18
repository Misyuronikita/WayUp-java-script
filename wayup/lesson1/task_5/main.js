//task 5
const randomNumber = Math.floor(Math.random() * 100);
console.log(randomNumber);
switch(true){
    case (randomNumber < 20):
        console.log("randomNumber меньше 20");
        break;
    case (randomNumber > 50):
        console.log("randomNumber больше 50");
        break;
    default:
        console.log("randomNumber больше 20, и меньше 50");
}

