const equal = document.getElementById("equal")
const num = document.querySelectorAll(".num")
const display = document.getElementById("display")
const clear = document.getElementById("clear")
const operator = document.querySelectorAll(".operator")
const paper = document.getElementById("paper")
var num1 = 0
var num2 = 0
var operatorClick = false
var foundnum1 = false
var foundnum2 = false
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
        // if (!(operatorClick)){
        //     if (equaled === true){
        //         display.innerHTML = number.innerHTML
        //         equaled = false
        //     } else{
        //         display.innerHTML += number.innerHTML
        //     }
        // }
        // else if (operatorClick){
        //     display.innerHTML = number.innerHTML
        //     operatorClick = false
        // }
        //
        // if (!(foundnum1)){
        //     num1 += number.innerHTML
        // }
        // else{
        //     num2 += number.innerHTML
        // }
        // console.log("num1", num1)
        // console.log("num2", num2)
    })
})
operator.forEach(function(op){
    op.addEventListener("click", function(){
        if (!(equaled) && !(operatorClick)){
            display.innerHTML += op.innerHTML
            operatorClick = true
        }
        // if (!(display.innerHTML.trim() === "")){
        //     operatorClick = true
        //     if (!foundnum1){
        //         foundnum1 = true
        //         operatorClick = true
        //         sign = op.innerHTML
        //     }
        //     else if (foundnum1){
        //         console.log("found first two numbers")
        //         var rslt = calculate()
        //         foundnum1 = true
        //         foundnum2 = false
        //         num1 = rslt
        //         num2 = 0
        //         sign = op.innerHTML
        //     }
        // }
        // console.log(sign)

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
        if (!(operators.includes(display.innerHTML[i]))){
            prev_num = true
        }else{
            prev_num = false
        }
        // expression_list.push(display.innerHTML[i])
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
    console.log(expression_list)
    paper.innerHTML += " = "
    display.innerHTML = expression_list[0]
    paper.innerHTML += rslt + "<br />"
    equaled = true
    expression_list = []

})

// function calculate(){
//     console.log("num1", num1)
//     console.log("num2", num2)
//     if (line_counter === 15){
//         paper.innerHTML = "Grade 1 Math Homework" + "<br />" + "<br />"
//         line_counter = 0
//     }
//     if (sign === "+"){
//         paper.innerHTML += num1
//         paper.innerHTML += " + "
//         paper.innerHTML += num2
//         console.log("calculating", num1, "+", num2)
//         rslt = add(parseInt(num1), parseInt(num2))
//         paper.innerHTML += " = "
//         paper.innerHTML += rslt + "<br />"
//         display.innerHTML = rslt
//         line_counter += 1
//         return rslt
//     }
//     else if (sign === "-"){
//         paper.innerHTML += num1
//         paper.innerHTML += " - "
//         paper.innerHTML += num2
//         console.log("calculating", num1, "-", num2)
//         rslt = subtract(parseInt(num1), parseInt(num2))
//         paper.innerHTML += " = "
//         paper.innerHTML += rslt + "<br />"
//         display.innerHTML = rslt
//         line_counter += 1
//         return rslt
//     }
//     else if (sign === "*"){
//         paper.innerHTML += num1
//         paper.innerHTML += " * "
//         paper.innerHTML += num2
//         console.log("calculating", num1, "*", num2)
//         rslt = multiply(parseInt(num1), parseInt(num2))
//         paper.innerHTML += " = "
//         paper.innerHTML += rslt + "<br />"
//         display.innerHTML = rslt
//         line_counter += 1
//         return rslt
//     }
//     else if (sign === "/"){
//         paper.innerHTML += num1
//         paper.innerHTML += " / "
//         paper.innerHTML += num2
//         console.log("calculating", num1, "/", num2)
//         rslt = divide(parseInt(num1), parseInt(num2))
//         paper.innerHTML += " = "
//         paper.innerHTML += rslt + "<br />"
//         display.innerHTML = rslt
//         line_counter += 1
//         return rslt
//     }
//
// }

clear.addEventListener("click", function(){
    display.innerHTML = ""
    foundnum1 = false
    foundnum2 = false
    operatorClick = false
    num1 = 0
    num2 = 0

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

function operate(operator, a, b){
    if (operator === "+"){
        return add(a, b)
    }
    else if (operator === "-"){
        return subtract(a, b)
    }
    else if (operator === "*"){
        return multiply(a, b)
    }
    else if (operator === "/"){
        return divide(a, b)
    }
}

//
//
// console.log(add(1, 2))
// console.log(subtract(3, 2))
// console.log(multiply(2, 4))
// console.log(divide(6, 2))