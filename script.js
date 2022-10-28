const isPrime = (num) =>{
    num = parseInt(num);
    if(num === 1) return false;
    if(num === 2) return true;
    if(num % 2 === 0) return false;
    for(let i = 3; i < num; i+=2){
        if(num % i === 0) return false;
    }
    return true;
}

const gcd = (a, b) => {
    if(a == 0 || b == 0){
        return 0;
    }
    if(a == b){
        return a;
    }
    if(a > b){
        return gcd(a-b, b);
    }
    return gcd(a, b-a);
}

const isCoprime = (a, b) => {
    if(gcd(a, b) == 1){
        return true;
    }
    return false;
}



let q = undefined;
let p = undefined;
let n = undefined;
let e = undefined;
let d = undefined;
let publickey = {}
let privatekey = {}
let count = 1;

let dvalues = [];

let fn = undefined;

let error1 = false;
let error2 = false;

$(document).ready(function() {
    // p and q are the two prime numbers
    $("#pnumber").keyup(function() {
        if($("#pnumber").val() == "") {
            $(".errormessage1").hide();
            $("#fnnumber").val("p va q sonlar kiritilishi kerak!");
            error1 = true;
            p = undefined;
        }
        else if(isPrime($("#pnumber").val())){
            $(".errormessage1").hide();
            error1 = false;
            p = parseInt($("#pnumber").val());

            $("#enumber").val("");
            $("#dvalue").empty();
            $("#dvalue").append("<option value=''>Tanlang</option>");
            e = undefined;
            d = undefined;
            n = undefined;

            if($("#qnumber").val() == ""){
                error1 = true;
                $(".errormessage1").show();
                $("#error1").text("q ga ham qiymat berish shart!");
            }
            else if($("#qnumber").val() == $("#pnumber").val()){
                error1 = true;
                $(".errormessage1").show();
                $("#error1").text("p va q bir xil bo'lishi mumkin emas!");
            }
        }
        else {
            error1 = true;
            $(".errormessage1").show();
            $("#error1").text("Siz kiritgan sonlardan biri tub son emas!");
            p = undefined;
        }
        if(!error1){
            n = p * q;
            fn = (p - 1) * (q - 1);
            $("#nnumber").val(n);
            $("#fnnumber").val(fn);
        }
        else{
            $("#nnumber").val("p va q sonlari kiritilishi kerak!");
            $("#fnnumber").val("p va q sonlar kiritilishi kerak!");
            n = undefined;
            fn = undefined;
        }
    });
    $("#qnumber").keyup(function() {
        if($("#qnumber").val() == "") {
            $(".errormessage1").hide();
            $("#fnnumber").val("p va q sonlar kiritilishi kerak!");
            error1 = true;
            q = undefined;
        }
        else if(isPrime($("#qnumber").val())){
            $(".errormessage1").hide();
            error1 = false;
            q = parseInt($("#qnumber").val());

            $("#enumber").val("");
            $("#dvalue").empty();
            $("#dvalue").append("<option value=''>Tanlang</option>");
            e = undefined;
            d = undefined;
            n = undefined;



            if($("#pnumber").val() == ""){
                error1 = true;
                $(".errormessage1").show();
                $("#error1").text("p ga ham qiymat berish shart!");
            }
            else if($("#qnumber").val() == $("#pnumber").val()){
                error1 = true;
                $(".errormessage1").show();
                $("#error1").text("p va q bir xil bo'lishi mumkin emas!");
            }
        }
        else {
            error1 = true;
            $(".errormessage1").show();
            $("#error1").text("Siz kiritgan sonlardan biri tub son emas!");
            q = undefined;
        }
        if(!error1){
            n = p * q;
            fn = (p - 1) * (q - 1);
            $("#nnumber").val(n);
            $("#fnnumber").val(fn);
        }
        else{
            $("#nnumber").val("p va q sonlari kiritilishi kerak!");
            $("#fnnumber").val("p va q sonlar kiritilishi kerak!");
            n = undefined;
            fn = undefined;
        }
    });
    // e is the public key
    $("#enumber").keyup(function() {
        if(q || p){
            if($("#enumber").val() > 1 && $("#enumber").val() < fn){
                if($("#enumber").val() == "") {
                    $(".errormessage2").hide();
                    e = undefined;
                    error2 = true;
                }
                else if(isCoprime($("#enumber").val(), (p-1)*(q-1))){
                    $(".errormessage2").hide();
                    e = parseInt($("#enumber").val());
                    error2 = false;


                    
                    $("#dvalue").empty();
                    $("#dvalue").append("<option value=''>Tanlang</option>");
                    for(let i = 1; i < fn; i++){
                        if((i * e) % fn == 1){
                            if(!dvalues.includes(i)){
                                dvalues.push(i);
                            }
                        }
                    }
                    
                    if(dvalues.length > 0){
                        for(let i = 0; i < dvalues.length; i++){
                            $("#dvalue").append(`<option value="${dvalues[i]}">${dvalues[i]}</option>`);
                        }
                        
                        $(".errormessage3").show();
                        $("#error3").text("d ni tanlang!");
                    }
                    else{
                        $(".errormessage3").show();
                        $("#error3").text("Afsuski tanlash uchun d qiymat mavjud emas! Boshqa e ni tanlang!");
                    }
                    

                }
                else {
                    $(".errormessage2").show();
                    $("#error2").text("e va fn o'zaro tub sonlar bo'lishi kerak!");
                    e = undefined;
                    error2 = true;
                }
            }
            else{
                $(".errormessage2").show();
                $("#error2").text("1<e<fn  bo'lishi kerak!");
                e = undefined;
                error2 = true;
            }
        }
        else{
            $(".errormessage2").show();
            $("#error2").text("p va q sonlari kiritilishi kerak!");
            $("#enumber").val("");
            e = undefined;
            error2 = true;
        }
    });
    // d is the private key
    $("#dvalue").on("change", function() {
        console.log("d changed");
        d = parseInt($("#dvalue").val());
        console.log(d);

        if(d && e && fn && n){
            $(".errormessage3").hide();
            error3 = false;
            $("#generate").prop("disabled", false);
        }
    })
    // generate the keys
    $("#generate").click(function() {
        if(!error1 && !error2 && !error3){
            $("#publickey").val(`(${e}, ${n})`);
            $("#privatekey").val(`(${d}, ${n})`);
            $("#generate").prop("disabled", true);
        }
        else{
            $(".errormessage3").show();
            $("#error3").text("Nimadir xato ketdi, iltimos tekshirib qaytadan urinib ko'ring!");
            $("#generate").prop("disabled", true);
        }
    })
    // plus button
    $("#add").click(function() {
        count++;
        $("#boxelement").append(
            `
            <div class="row mt-2">
                        <div class="col-4">
                            <input type="text" class="form-control en" id="${count}e" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Soningiz" onkeyup="encrypt(this)">  
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled value="encrypt=>">
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control ${count}e" aria-label="Small" aria-describedby="inputGroup-sizing-sm" disabled>
                        </div>
            </div>
            `
        )
    })
    // function
   
})

function encrypt(th) {
    let number1 = parseInt(th.value);
    let id = th.id;
    if(isNaN(number1)){
        console.log("not a number");
        return;
    }
    let encrypted = (number1 ** e) % n;
    console.log(encrypted);
    $(`.${id}`).val(encrypted);
}