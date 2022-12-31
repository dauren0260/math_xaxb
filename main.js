window.onload = function(){
    var keyboard = document.getElementById("keyboard");
    var resetNum = document.getElementById("resetNum");
    var sendNum = document.getElementById("sendNum");
    var guessArea = document.getElementById("guessArea");
    var guessResult = document.getElementById("guessResult");
    var section = document.getElementsByClassName("section")[0];
    var refresh = document.getElementsByClassName("refresh")[0];
    var guessCombo = document.getElementById("guessCombo");

    var guessNum = ""; //玩家輸入的數字;
    var correctNum; //答案

    var arrNum = [0,1,2,3,4,5,6,7,8,9]

    function shuffle(arr) {
        const n = arr.length;

        for (let i = n - 1; i > 0; i -= 1) {
          const rand = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[rand]] = [arr[rand], arr[i]];
        }
    }

    shuffle(arrNum)
    console.log(arrNum)
    
    correctNum = arrNum[0].toString() + arrNum[1] + arrNum[2] + arrNum[3]
    console.log("answer: ", correctNum )

    keyboard.addEventListener("click",showup,false);

    resetNum.addEventListener("click",clearNumber,false);

    


    function clearNumber(mathA) {
        currentGuessNum = []
        console.log("clearNumber")
        console.log("mathA: ", mathA , typeof mathA)
        if(mathA == 4){
            guessResult.innerHTML = "<span>4A</span>";
            keyboard.removeEventListener("click",showup,false);

        }else{
            guessArea.innerHTML = "";
            guessResult.innerHTML = "";
        }
        guessNum = "";
        console.log("guessNum: " , guessNum)
        keyboard.addEventListener("click",showup,false);
        sendNum.removeEventListener("click",matchNumber,false);

    }


    function matchNumber() {
        let mathA = 0;
        let mathB = 0;

        console.log("matchNumber")

        for (let i = 0; i < correctNum.length; i++){
            var matching = guessNum.search(`${arrNum[i]}`)
            
            //數字對，位置不對
            if(matching >= 0 && matching != i){
                mathB++
            }else if(matching == i){
                mathA++
            }
            console.log("i ",i , "matching ",matching)
        }

        guessResult.innerHTML = `<span>${mathA}A${mathB}B</span>`

        if( mathA != 4 ){

            // 留下猜測的歷史紀錄，並新增到最前面
            var comboDiv = document.createElement("div")
            comboDiv.className = "combo";
    
            var areaDiv = document.createElement("div")
            areaDiv.className = "area";
    
            var oldGuessNum = [...guessNum]
    
            for (let j = 0; j < oldGuessNum.length; j++) {
                areaDiv.innerHTML += `<span>${oldGuessNum[j]}</span>`
            }
    
            var resultDiv = document.createElement("div")
            resultDiv.className = "result"
            resultDiv.innerHTML = `<span>${mathA}A${mathB}B</span>`
    
            comboDiv.appendChild(areaDiv)
            comboDiv.appendChild(resultDiv)
    
            section.insertBefore(comboDiv,guessCombo)
        }

        clearNumber(mathA)

        window.scrollTo(0,document.body.scrollHeight)
    }

    // 專門用來檢查重複輸入數字的行為
    var currentGuessNum = [];

    function showup(event){
        console.log("showup")
        var same = true;

        if(event.target.id == "resetNum" || event.target.id =="sendNum" || event.target.id == "keyboard"){
            return false
        }

        guessNum = guessArea.innerText
        
        currentGuessNum.push(event.target.innerHTML)
        console.log(currentGuessNum)
        console.log("guessNum.length: ",guessNum.length)

        if(currentGuessNum.length > 1){

            var currentValue= event.target.innerHTML;

            for (let i = 0; i < currentGuessNum.length-1; i++) {
                if(currentValue != currentGuessNum[i] && event.target.tagName == "SPAN"){
                    same = false
                }else{
                    same = true
                    break;
                }
            }

            if(same == false){
                guessArea.innerHTML += `<span>${event.target.innerHTML}</span>`
                same = true;
            }

        }else if(currentGuessNum.length <= 1 && guessArea.children.length < 4){
            guessArea.innerHTML += `<span>${event.target.innerHTML}</span>`

        }



        // if(event.target.tagName == "SPAN"){
        //     guessArea.innerHTML += `<span>${event.target.innerHTML}</span>`
        // }

        if(guessArea.children.length >= 4){
            guessNum = guessArea.innerText
            console.log("guessNum: " , guessNum,typeof guessNum)

            // 不再輸入數字
            keyboard.removeEventListener("click",showup,false);
            // 四個數字才綁定配對事件監聽
            sendNum.addEventListener("click",matchNumber,false);

            
        }


    }

    refresh.onclick = function() {
        location.reload(true)
    }
}


