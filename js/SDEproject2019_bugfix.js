  var vp
  var i
  var o
  var e
  var t
  var wkv
  var g
  var y
  var d = 0.005
  var cor
  var bas
  var dak
  var kwhn = [];
  var kwhz = [];
  var v = [];
  var s = [];
  var x = [];
  var to = [];
  var ok = [];
  var nks = [];
  var cks = [];
  var pos = [];
  var cumu = 0
  var tvt = 0
  var ttr = 0
  var ttv = 0
  var tts = 0
  var ttrv = 0
  var m2
  var e
  var u
  var alib = "U heeft een te klein vermogen om SDE+ aan te vragen. Uw installatie moet minimaal 15kWp aan vermogen hebben."

$("#buca").click(function(){
    $("#portfolio").toggle();
    $("#bucashow").toggle();
    $("#bucashow")[0].scrollIntoView();
    tiny();
    rwz();
    zyn();
    ga('send', {
    hitType: 'event',
    eventCategory: 'business_case',
    eventAction: 'click',
    });
    ga('send', 'event', 'bereken_knop','click','Bizcase berekend2');
});

function tiny(){
  m2 = Number(document.querySelector("#vierkant").value.replace(/,/g, "."));
  e = Number(document.querySelector("#enp").value.replace(/,/g, "."));
  u = Number(document.querySelector("#verbruik").value.replace(/,/g, "."));
  dak =  document.querySelector('input[name=radiodak]:checked').value;
  vp = Math.round(m2 * 0.15)

  if(vp < 15){
      $("#myModal").toggle();
      setTimeout(function () {
          alert(alib);
        }, 2000);
  } else if(vp < 1000){ // kleiner dan 1MW
    bas = 0.101
    corz = 0.069
    console.log("Dit is een opstelling van een installatie KLEINER dan 1MW met een basisbedrag van €" + bas + "/kWh")
  } else if(dak == 'true') { // groter dan 1MW && dakopstelling
    bas = 0.095 //dak
    corz = 0.06
    console.log("Dit is een dakopstelling van een installatie groter dan 1MW met een basisbedrag van €" + bas + "/kWh")
  } else { // groter dan 1MW && veldopstelling
    bas = 0.93 //veld
    corz = 0.06
    console.log("Dit is een veldopstelling van een installatie groter dan 1MW met een basisbedrag van €" + bas + "/kWh")
    }

  i = Math.round(vp * 1050)
  o = Math.round(i *.00454)
  t = e * .5
  vlu = 950 //vollasturen
  // g = .5 * (u/(vp * vlu))
  wkv = .5 * (u/(vp * vlu))
    if (wkv > 1){
      g = 1
    } else if(wkv < 0){
      g = 0
    } else {
      g = wkv
    }
  y = 0.01;
  cumu = i * (-1)
  corn = 0.041
}

function rwz(){
  for (q = 0; q < 15; q++) {
    kwhz.push(Math.round(g * (vp * 190000*d * Math.pow((1-d), q))));
    kwhn.push(Math.round((1-g) * (vp * 190000*d * Math.pow((1-d), q))));
    v.push(Math.round(kwhz[q] * e * Math.pow((1+y), q)));
    x.push(Math.round(kwhn[q] * t * Math.pow((1+y), q)));
    var s1 = Math.round(kwhn[q]*(bas-corn));
    var s2 = Math.round(kwhz[q]*(bas-corz));
    s.push(s1 + s2);
    to.push(v[q] + x[q] + s[q]);
    ok.push(Math.round(o*Math.pow((1+y), q)));
    nks.push(Math.round(to[q] - ok[q]));
    cumu += Math.round(nks[q]);
    cks.push(cumu);
    if(cks[q] > 0){
      pos.push(q);
    }
    ttr += x[q];
    ttv += v[q];
    tts += s[q];
    ttrv += nks[q];
  }
  tvt = pos[0]+1;
}

function zyn(){
  if(tvt){
    $("#terugverd").replaceWith('<td id="terugverd" class="talright">' + tvt + " jaar ");
    } else {
      $("#terugverd").replaceWith('<td id="terugverd" class="talright"</strong> <span style="color: red">langer dan 15 jaar</span></td>');
    }
    $("#vrmg").replaceWith('<td class="talright">' + vp + " kWp</td>");
    $("#eprd").replaceWith('<td class="talright">' + vp*190000*d + " kWh/jaar</td>");
    $("#bsbdr").replaceWith('<td class="talright">€ ' + bas + "/kWh</td>");
    $("#cbev").replaceWith('<td class="talright">€ ' + corz + " /kWh</td>");
    $("#cbnl").replaceWith('<td class="talright">€ ' + corn + " /kWh</td>");

    $("#bsek").replaceWith('<td class="talright">€ ' + ttv + "</td>");
    $("#tso").replaceWith('<td class="talright">€ ' + tts + "</td>");
    $("#ttlo").replaceWith('<td class="talright">€ ' + ttr + "</td>");


    $("#roi").replaceWith('<td id="roi" class="talright">' + Math.round(((ttrv-i)/i)*100) + "%</td>");


    sch();
    shb();
  }

$("#excelmail").click(function(){
  var mail = document.querySelector("#email").value
  var tel = document.querySelector("#tel").value
  if(mail.length > 5 && tel.length > 8){
      $("#flash").replaceWith('<div class="alert alert-success" role="alert">Email verzonden!</div>')
  }
});


  function sch(){
      var gda = {
        labels : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        datasets : [
          {
            fillColor : "rgba(172,194,132, 0.0)",
            strokeColor : "#3498db",
            pointColor : "#fff",
            pointStrokeColor : "#3498db",
            data : cks
          }
        ]
      }
      var gfi = document.getElementById("grafiek").getContext('2d');
      var nigr = new Chart(gfi)
      var nigr_instance = nigr.Line(gda);
  }

  function shb(){
    var barData = {
    	labels : ["besparing", "subsidie", "teruglevering"],
    	datasets : [
    		{
          fillColor: ["rgba(52, 152, 219, 0.2)"],
    			strokeColor : ["#48A4D1"],
    			data : [ttv, tts, ttr]
    		},
    	]
    }
    var income = document.getElementById("staaf").getContext("2d");
    new Chart(income).Bar(barData);
  }

$('#popover1').popover({
  trigger: 'focus'
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})

console.log("SDEtool.nl was developed by Corné van Straten");
