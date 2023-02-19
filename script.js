const equal = document.getElementById("equal")
const num = document.querySelectorAll(".num")
const display = document.getElementById("display")
const clear = document.getElementById("clear")
const operator = document.querySelectorAll(".operator")
const paper = document.getElementById("paper")

let operator_clicked = false
let equal_clicked = false
let line_counter = 0
let expression_list = []
let num_clicked = false
let is_first_input = true

num.forEach(function(number){
    number.addEventListener("click", function(){
        num_clicked = true

        if (!(equal_clicked)){
            display.innerHTML += number.innerHTML
        }else{
            equal_clicked = false
            display.innerHTML = number.innerHTML
        }
        operator_clicked = false
    })
})
operator.forEach(function(op){
    op.addEventListener("click", function(){
        if (!(equal_clicked) && !(operator_clicked) && num_clicked){
            display.innerHTML += op.innerHTML
            num_clicked = false
        }else if (!num_clicked && equal_clicked){
            display.innerHTML += op.innerHTML
            equal_clicked = false
        }
        operator_clicked = true
        is_first_input = false

    })
})

equal.addEventListener("click", function(){
    if (!num_clicked){
        return
    }
    if (equal_clicked && !operator_clicked){
        return
    }
    if (is_first_input && !operator_clicked){
        return
    }
    if (line_counter === 15){
        paper.innerHTML = "Grade 1 Math Homework" + "<br />" + "<br />"
        line_counter = 0
    }
    paper.innerHTML += display.innerHTML
    let prev_num = false
    let operators = "+/*-"
    for(var i=0; i < display.innerHTML.length; i++) {
        // if previous was a number AND current is a number, APPEND to the prev one
        // if previous was an operator or is first, add to the list (new item)
        if (!expression_list || !prev_num || operators.includes(display.innerHTML[i])){
            expression_list.push(display.innerHTML[i])

        }
        else if (prev_num && !(operators.includes(display.innerHTML[i]))){
            expression_list[expression_list.length - 1] += display.innerHTML[i]

        }
        prev_num = !(operators.includes(display.innerHTML[i]));
    }

    for (var j=0; j <= expression_list.length; j++){
        if (expression_list[j] === "*"){
            rslt = multiply(parseInt(expression_list[j-1]), parseInt(expression_list[j+1]))
            expression_list[j] = rslt
            expression_list.splice(j-1, 1)
            expression_list.splice(j, 1)
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
            }
            else if (expression_list[k] === "-"){
                rslt = subtract(parseInt(expression_list[k-1]), parseInt(expression_list[k+1]))
                expression_list[k] = rslt
                expression_list.splice(k-1, 1)
                expression_list.splice(k, 1)
            }
        }

    }

    paper.innerHTML += " = "
    display.innerHTML = expression_list[0]
    paper.innerHTML += rslt + "<br />"
    line_counter += 1
    equal_clicked = true
    num_clicked = false
    expression_list = []
    is_first_input = true

})

clear.addEventListener("click", function(){
    display.innerHTML = ""
    operator_clicked = false

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
