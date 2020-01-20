//Declareren globale input variabelen
  var vermogenPV
  var investeringsprijs
  var onderhoud
  var energieprijs
  var terugleverprijs
  var gelijktijdigheid
  var inflatie
  var degeneratie = 0.005
  var cor //correctiebedrag
  var bas //basisbedrag

//Declareren array (reken)variabelen
  var productiekWhNet = [];
  var productiekWhZelf = [];
  var vermedenkosten = [];
  var subsidieopbrengsten = [];
  var terugleveropbrengsten = [];
  var totaleOpbrengsten = [];
  var onderhoudskosten = [];
  var nettoKasStromen = [];
  var cummulatieveKasStromen = [];
  var pos = [];   //kasstromen positief in jaar x

//Declareren rekenvariabelen
  var cumu = 0
  var terugverdientijd = 0
  var totalter = 0
  var totalverm = 0
  var totalsubs = 0
  var totalrev = 0
  var m2
  var energieprijs
  var verbruik

//BEREKENEN
//Als de knop "bereken business case" wordt ingedrukt
$("#buca").click(function(){
    $("#portfolio").toggle();
    $("#bucashow").toggle();
    $("#bucashow")[0].scrollIntoView();
    init();
    calc();
    show();
    ga('send', {
    hitType: 'event',
    eventCategory: 'business_case',
    eventAction: 'click',
    });
    ga('send', 'event', 'bereken_knop','click','Bizcase berekend2');
});




//Inputs uit velden halen en aan variabelen toewijzen
function init(){
  //m2 uit formulier halen #vierkant
  m2 = Number(document.querySelector("#vierkant").value.replace(/,/g, "."));
  //energieprijs uit formulier halen #enp --overnemen
  energieprijs = Number(document.querySelector("#enp").value.replace(/,/g, "."));
  //jaarlijkse stroomverbruik uit formulier halen #verbruik
  verbruik = Number(document.querySelector("#verbruik").value.replace(/,/g, "."));
  //vermogen
  vermogenPV = Math.round(m2 * 0.142)
  //Investeringskosten
  investeringsprijs = Math.round(m2 * 0.142 * 1050)
  //Onderhoudskosten
  onderhoud = Math.round(investeringsprijs *.00454)
  //terugleverprijs
  terugleverprijs = energieprijs * .5
  //gelijktijdigheid
  gelijktijdigheid = .5 * (verbruik/(vermogenPV*950))
  //inflatie
  inflatie = 0.01;
  //SDE+ basisbedrag
  bas = 0.105
      //rekenvariabele kasstromen
      cumu = investeringsprijs * (-1)
      //Correctiebedragen corNet en corZelf
      corNet = 0.038
      if(vermogenPV < 15){
          $("#myModal").toggle();
          setTimeout(function () {
              alert("U heeft een te klein vermogen om SDE+ aan te vragen. Uw installatie moet minimaal 15kWp aan vermogen hebben.");
            }, 2000);
      } else if(vermogenPV < 1000){
        corZelf = 0.063
      } else {
        corZelf = 0.055
      }
}


//Calc function() berekenen arrays (loopen en arrays vullen)
function calc(){
  for (i = 0; i < 15; i++) {
    //PRODUCTIE
    //bereken de zelfgebruikte productie in jaar i en voeg toe aan array
    productiekWhZelf.push(Math.round(gelijktijdigheid * (vermogenPV * 950 * Math.pow((1-degeneratie), i))));
    //bereken de netlevering productie in jaar i en voeg toe aan array
    productiekWhNet.push(Math.round((1-gelijktijdigheid) * (vermogenPV * 950 * Math.pow((1-degeneratie), i))));

    //OPBRENGSTEN
    //bereken de vermeden kosten in jaar i en voeg toe aan array
    vermedenkosten.push(Math.round(productiekWhZelf[i] * energieprijs * Math.pow((1+inflatie), i)));
    //bereken de terugleveropbrengsten in jaar i en voeg toe aan array
    terugleveropbrengsten.push(Math.round(productiekWhNet[i] * terugleverprijs * Math.pow((1+inflatie), i)));
    //bereken de subsidieopbrengsten in jaar i voeg toe aan subsidieopbrengsten
    var subs1 = Math.round(productiekWhNet[i]*(bas-corNet));
    var subs2 = Math.round(productiekWhZelf[i]*(bas-corZelf));
    subsidieopbrengsten.push(subs1 + subs2);
    //bereken de totale opbrengsten in jaar i en voeg toe aan array
    totaleOpbrengsten.push(vermedenkosten[i] + terugleveropbrengsten[i] + subsidieopbrengsten[i]);

    //KOSTEN
    //bereken de onderhoudskosten in jaar i en voeg toe aan array
    onderhoudskosten.push(Math.round(onderhoud*Math.pow((1+inflatie), i)));

    //NETTO
    //bereken de netto kasstromen in jaar i en voeg toe aan array
    nettoKasStromen.push(Math.round(totaleOpbrengsten[i] - onderhoudskosten[i]));
    //bereken de cummulatieve kasstromen in jaar i en voeg toe aan array
    cumu += Math.round(nettoKasStromen[i]);
    cummulatieveKasStromen.push(cumu);

    if(cummulatieveKasStromen[i] > 0){
      pos.push(i);
    }

    //ARRAYS OPTELLEN voor totalen
    totalter += terugleveropbrengsten[i];
    totalverm += vermedenkosten[i];
    totalsubs += subsidieopbrengsten[i];
    totalrev += nettoKasStromen[i];
  }
  terugverdientijd = pos[0]+1;

}


function show(){
  //Weergeven terugverdientijd
  if(terugverdientijd){
    $("#terugverd").replaceWith('<td id="terugverd" class="talright">' + terugverdientijd + " jaar ");
    } else {
      $("#terugverd").replaceWith('<td id="terugverd" class="talright"</strong> <span style="color: red">langer dan 15 jaar</span></td>');
    }
    //Weergeven kerngegevens
    $("#vrmg").replaceWith('<td class="talright">' + vermogenPV + " kWp</td>");
    $("#eprd").replaceWith('<td class="talright">' + vermogenPV*950 + " kWh/jaar</td>");
    $("#bsbdr").replaceWith('<td class="talright">€ ' + bas + "/kWh</td>");
    $("#cbev").replaceWith('<td class="talright">€ ' + corZelf + " /kWh</td>");
    $("#cbnl").replaceWith('<td class="talright">€ ' + corNet + " /kWh</td>");

    $("#bsek").replaceWith('<td class="talright">€ ' + totalverm + "</td>");
    $("#tso").replaceWith('<td class="talright">€ ' + totalsubs + "</td>");
    $("#ttlo").replaceWith('<td class="talright">€ ' + totalter + "</td>");


    $("#roi").replaceWith('<td id="roi" class="talright">' + Math.round(((totalrev-investeringsprijs)/investeringsprijs)*100) + "%</td>");


    showChart();
    showBar();
  }


$("#excelmail").click(function(){
  var mail = document.querySelector("#email").value
  var tel = document.querySelector("#tel").value
  if(mail.length > 5 && tel.length > 8){
      $("#flash").replaceWith('<div class="alert alert-success" role="alert">Email verzonden!</div>')
  }
});




  function showChart(){
      var grafiekData = {
        labels : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        datasets : [
          {
            fillColor : "rgba(172,194,132, 0.0)",
            strokeColor : "#3498db",
            pointColor : "#fff",
            pointStrokeColor : "#3498db",
            data : cummulatieveKasStromen
          }
        ]
      }
      var grafiek = document.getElementById("grafiek").getContext('2d');
      var nieuweGraf = new Chart(grafiek)
      var nieuweGraf_instance = nieuweGraf.Line(grafiekData);
  }

  // //Vermeden kosten; subsidieopbrengsten en terugleveropbrengsten
  function showBar(){
    var barData = {
    	labels : ["besparing", "subsidie", "teruglevering"],
    	datasets : [
    		{
    			// fillColor : ["rgba(73,188,170,0.4)"],
          fillColor: ["rgba(52, 152, 219, 0.2)"],
    			strokeColor : ["#48A4D1"],
    			data : [totalverm, totalsubs, totalter]
    		},
    	]
    }
    var income = document.getElementById("staaf").getContext("2d");
    new Chart(income).Bar(barData);
  }

//Popovers

$('#popover1').popover({
  trigger: 'focus'
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})




console.log("SDEtool.nl was developed by Corné van Straten");
