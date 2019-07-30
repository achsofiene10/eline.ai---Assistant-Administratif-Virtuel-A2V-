var chrono = require('chrono-node');
var results = chrono.parse('I have an appointment tomorrow from 10 to 11 AM');
var results1 = chrono.parse('text: LEFTY\n36 RUE VIVIENNE\n75002 PARIS\nSIRET : 753 152 487\nTABLE\n3\n1 COUVERT RESPONSABLE\n1 JUS DORANGE\n1 LAMBERGER\n1 LEFTY BURGER\n1 CHEESECAKE\n4.50\n18.00\n15.00\n9.00\n----\nTTC\n46.50\n- - - - -\nTUA 107.\nHT\n42.27\nTUA\n4.23\n-\n-\n-\n-\n-\n-\n-\n-\nTOTAL\n46.50\nMARDI 08-04-2014 20:03:51\nCle 4-Serv.: 4-CAISSE 1-\nMERCI DE VOTRE VISITE\nA BIENTOT\n ');
var results2 = chrono.parse( '"text": "FACTURE\nRestaurant McDonalds Versailles\n10. Av du General de Gaulle\n78000 VERSAILLES\nTel : 01.39.02.36.03\nSIRET 420 466 708 00013 - APE 553 B\nTVA INTRA FR11420466708\nNO\n00\n.\nCaissier # 166\nRestaurant 188\n#CDE 152 -CSE 04- 27/04/2015 13:22:14\nQTE PRODUIT\nUNIT TOTAL\n1 The Glace Bestof\n0.00 0.00\n1 BO Big Mac\n6.80 6.80\n1 Filet\n4.00\n1 Chicken 20 Nugge\n9.20 9.20\n1 Frite Best Of\n0.00 0.00\nTotal Sur Place (TVA INCL)\n20.00\n50.00\nRendu\n30.00\n02 20.00 TVA A 10.00% INCL. = 1.82\nMerci de votre visite\nA bientot\nBiere soumise a TVA de 20.00%\n€\nCode Porte Toilettes :\nFor the washing room:\nA7836B\n');
var results3 =chrono.parse('"description": "Joanna Binet\nFACTURE\n48 Coubertin\n31400 Paris\nFacturé à\nCendrillon Ayot\n69 rue Nations\n22000 Paris\nEnvoyé à\nCendrillon Ayot\n46 Rue St Ferréol\n92300 lle-de-France\nFacturo nº\nDate\nCommande nº\nEchéance\nFR-001\n29/01/2019\n1630/2019\n24/05/2019\nQTÉ\nDÉSIGNATION\nGrand brun escargot pour manger\nPetit marinière uniforme en bleu\nMONTANT HT\n100.00\n30.00\nFacile à jouer accordéon\nPRIX UNIT. HT\n100.00\n15.00\n5.00\nTotal HT\nTVA 20.0%\nTOTAL\n15.00\n145.00\n29.00\n174.00 €\nConditions et modalités de paiement\nLe paiement est do dans 15 jours\nCaisse dEpargne\nIBAN: FR12 1234 5678\nSWIFT/BIC: ABCDFRP1XXX\n",');
console.log(results2[0].text);
console.log(results3[0].text);
console.log(results[0].text); 
