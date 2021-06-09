function display(val){
    document.getElementById("result").value+=val;
}

function solve(){
    try{
        var a = document.getElementById("result").value;
        var b = eval(a);
        document.getElementById("result").value = b;
    }
    catch(err){
        document.getElementById("result").value = "Syntax Error";
    }
}

function clr(){
    document.getElementById("result").value = "";
}