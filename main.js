let ws;
let data;
let url="";
let pur="";
let lastP=0;
let currentP=0;
let lastState;
const coinsObj = {
    ethereum: ["eth", "ethereum.png"],
    shibainu: ["shib", "shibainu.png"],
    bitcoin: ["btc","bitcoinn.png"],
    arbitrum: ["arb", "arbitrum.png"],
    terraclassic: ["lunc","terra.png"],
    floki: ["floki", "floki.png"],
    pancakeswap: ["cake","pancakes.jfif"],
    kadena: ["kda", "kadena.jpg"],
    babydogecoin: ["babydoge","babye.png"],
    tether: ["usdt","tether.jfif"],
    bnb: ["bnb","bnb.png"],
    usdcoin: ["usdc","usdcoin.png"],
    xrp: ["xrp","xrp.png"],
    cardano: ["ada", "cardano.png"],
    dogecoin: ["doge","dogey.png"],
    polygon: ["matic", "poly.png"],
    solana: ["sol","solana.jfif"],
    polkadot: ["dot","polkaa.png"],
    litecoin: ["ltc","lite.png"],
    tron: ["trx","tronn.png"],
    binanceusd: ["busd","busd.png"]
}
//ethusdt@trade/bnbusdt@tradebtcusdt@trade
function onMessage(){
    ws.onmessage = (event)=> {
        console.log("Successful conn establshed. Data fetching begins........")
        let raw_res = event.data;
        data = JSON.parse(raw_res)
        console.log(data.p*80);
        currentP=data.p*80
        if(lastP===currentP){
            $("h3").text("₹ " + parseFloat(data.p*80).toFixed(2))
        } else if(lastP>currentP){
            $("h3").text("₹ " + parseFloat(data.p*80).toFixed(2))
            $("h3").css("color","red")
        }else{
            $("h3").text("₹ " + parseFloat(data.p*80).toFixed(2))
            $("h3").css("color","green")
        }
        lastP=currentP;
        
    }
}
// function func(){
//     ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");
//     console.log(ws)
//     onMessage()
// }

const endCon = ()=>{
    if(ws){
        currentP=0
        lastP=0
        ws.close()
        $("h3").text("₹ " + 0)
        $("h3").css("color","blue")
    }else{
        try{
            ws.close();
        } catch(err){
            console.log("No conn to close.")
        }
    }

}

const establishCon = (durl)=>{
    if(ws){
        ws.close();
        console.log("closed", lastState)
    }
    ws = new WebSocket("wss://stream.binance.com:9443/ws/"+durl+"usdt"+"@trade");
    lastState = durl
    onMessage();
}

$("#arrow-icon").click(function(){
    url=url?url.toLowerCase():""
    if(coinsObj[url]){
        //$("#search-text-inp").prop("disabled", true);
        let durl=coinsObj[url]
        $("#icon-img").attr("src","./pics/"+durl[1])
        $("#icon-up").attr("src", "./pics/"+durl[1])
        establishCon(durl[0])
    }else{
        alert("Please enter correct name")
        location.reload(true)
    }
})

$(".search-div2").keydown(function(event){
        if((event.keyCode>=48 && event.keyCode<=57)){
            pur = pur+event.key
            $(".search-div3").val(""+parseFloat(Number(pur?pur:"0")/Number(parseFloat(data?data.p*80>1?data.p*80:"1":"1").toFixed(2))).toFixed(2))
        } else if(event.key=="Backspace"){
            if(pur.length!==0){
                pur=pur.substring(0,pur.length-1);
                $(".search-div3").val(""+parseFloat(Number(pur?pur:0)/Number(parseFloat(data?data.p*80>1?data.p*80:"1":"1").toFixed(2))).toFixed(2))
            }else{
                $(".search-div3").val(""+0)
            }
        }
})

$("#search-text-inp").keydown(function(event){
    if(event.key==="Backspace"){
        url=url.substring(0, url.length-1)
        endCon();
        if(url.length===0){
            location.reload(true)
        }
    }else if((event.keyCode>=65 && event.keyCode<=91) || (event.keyCode>=97 && event.keyCode<=122)){
        url+=event.key;
    }
    if(url){
        url=url.toLowerCase();
        console.log(url)
    }
})
