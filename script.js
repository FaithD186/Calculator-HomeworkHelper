const equal = document.getElementById("equal")
const num = document.querySelectorAll(".num")
const display = document.getElementById("display")
const clear = document.getElementById("clear")
const operator = document.querySelectorAll(".operator")
const paper = document.getElementById("paper")

var operatorClick = false
var equaled = false
var line_counter = 0
var expression_list = []

num.forEach(function(number){
    number.addEventListener("click", function(){

        if (!(equaled)){
            display.innerHTML += number.innerHTML
        }else{
            equaled = false
            display.innerHTML = number.innerHTML
        }
        operatorClick = false
    })
})
operator.forEach(function(op){
    op.addEventListener("click", function(){
        if (!(equaled) && !(operatorClick)){
            display.innerHTML += op.innerHTML
            operatorClick = true
        }

    })
})

equal.addEventListener("click", function(){
    paper.innerHTML += display.innerHTML
    let prev_num = false
    let operators = "+/*-"
    for(var i=0; i < display.innerHTML.length; i++)
    {
        // if previous was a number AND current is a number, APPEND to the prev one
        // if previous was an operator or is first, add to the list (new item)
        if (!expression_list || !prev_num || operators.includes(display.innerHTML[i])){
            expression_list.push(display.innerHTML[i])

        }
        else if (prev_num && !(operators.includes(display.innerHTML[i]))){
            //previous index.
            expression_list[expression_list.length - 1] += display.innerHTML[i]

        }
        prev_num = !(operators.includes(display.innerHTML[i]));
    }

    console.log("full expression,", expression_list)
    for (var j=0; j <= expression_list.length; j++){
        if (expression_list[j] === "*"){
            rslt = multiply(parseInt(expression_list[j-1]), parseInt(expression_list[j+1]))
            expression_list[j] = rslt
            expression_list.splice(j-1, 1)
            expression_list.splice(j, 1)
            console.log(expression_list)
        }
        else if (expression_list[j] === "/"){
            rslt = divide(parseInt(expression_list[j-1]), parseInt(expression_list[j+1]))
            expression_list[j] = rslt
            expression_list.splice(j-1, 1)
            expression_list.splice(j, 1)
        }

    }
    for (var l = 0; l <= expression_list.length; l++){
        for (var k = 0; k <= expression_list.length; k++){
            if (expression_list[k] === "+"){
                rslt = add(parseInt(expression_list[k-1]), parseInt(expression_list[k+1]))
                expression_list[k] = rslt
                expression_list.splice(k-1, 1)
                expression_list.splice(k, 1)
                console.log(expression_list)
            }
            else if (expression_list[k] === "-"){
                rslt = subtract(parseInt(expression_list[k-1]), parseInt(expression_list[k+1]))
                expression_list[k] = rslt
                expression_list.splice(k-1, 1)
                expression_list.splice(k, 1)
                console.log(expression_list)
            }
        }

    }

    if (line_counter === 15){
         paper.innerHTML = "Grade 1 Math Homework" + "<br />" + "<br />"
         line_counter = 0
    }
    paper.innerHTML += " = "
    display.innerHTML = expression_list[0]
    paper.innerHTML += rslt + "<br />"
    line_counter += 1
    equaled = true
    expression_list = []

})

clear.addEventListener("click", function(){
    display.innerHTML = ""
    operatorClick = false

})


function add (a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a*b
}

function divide(a, b){
    return a / b
}
