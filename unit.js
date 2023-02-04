let buffer = '0';
let runningTotal = 0;
let pOp = null; 
const screen = document.querySelector('.screen');


function buttonClick(value){
 if (isNaN(parseInt(value))){
    handleSymbol(value);
 } else{
    handleNumber(value);
 }
 rerender();
}


function handleMath(value){
  if(buffer === 0){
    return;
  }


  const intBuffer = parseInt(buffer);
  if(runningTotal === 0){
    runningTotal = intBuffer;

  } else{
    flushOperation(intBuffer);
  }
   pOp = value;
   buffer = '0';
   console.log(runningTotal);
}

function flushOperation(intBuffer){
    if(pOp === '+'){
        runningTotal += intBuffer;
    } else if(pOp === '-'){
        runningTotal -= intBuffer;
    }else if(pOp === '×'){
        runningTotal *= intBuffer;
    }else if (pOp === '÷'){
        runningTotal /= intBuffer;
    }

}

function handleSymbol(symbol){
  switch(symbol){
    case 'C':
        buffer = '0';
        break;
    case '=':
        if (pOp === null){
            return;
        }
        flushOperation(parseInt(buffer));

        pOp = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
    case '←':
        if(buffer.length === 1){
            buffer = '0';
        } else{
            buffer = buffer.substring(0,buffer.length - 1);
        }
    case '-':
    case '+':
    case '×':
    case '÷':
        handleMath(symbol);
        break;            
  }
}

function handleNumber(number){
 if (buffer === '0'){
    buffer = number;
 }else{
    buffer += number;
 }
}



function ez(){
    document.querySelector('.calc-buttons').addEventListener("click",function(event){
        buttonClick(event.target.innerText);
    });
}


function rerender(){
    screen.innerText = buffer;
}

ez();