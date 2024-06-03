const Currency_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json"

const dropDownSelect=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#msg");

for (let select of dropDownSelect){
    for(codes in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=codes;
        newOption.value=codes;
        if(select.name === "from" && codes === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && codes === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        flag(evt.target);
    })
}

const flag = (element) =>  {
    let codes=element.value;
    let countrycode=countryList[codes];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let flagImg=element.parentElement.querySelector("img");
    flagImg.src=newSrc;
}


button.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<0)
    {
        amountVal=1;
        amount.value=1;
    }

    const Currency_URL=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response=await fetch(Currency_URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    
    let finalAmt=amountVal*rate;

    msg.innerText=`1 ${fromCurr.value} = ${rate} ${toCurr.value} 
    Converted amount from ${amountVal} ${fromCurr.value} is equal to ${finalAmt} ${toCurr.value}`
});