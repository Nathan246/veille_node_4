const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));

const transforme_entableau = (collection) => {
	let chaine = '<header><meta charset="UTF-8"></header><table><tr><th>Prénom</th><th>Nom</th><th>Téléphone</th><th>Courriel</th></tr>'
	for(elm of collection){
		chaine += "<tr><td>";
		for(p in elm){
			chaine += elm[p] + "</td><td>";
		}
		chaine += "</td></tr>";
	}
	chaine += "</table>"
	return chaine
}

///////////////////////////////////////////////////////////// Route /html/01_form.htm

app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "01_form.htm" );
})

///////////////////////////////////////////////////////////// Route /

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

///////////////////////////////////////////////////////////// Route /traiter_get
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
let = reponseString = ",";
let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };
console.log(reponse);
reponseString += JSON.stringify(reponse);
fs.appendFile(__dirname + "/public/data/" + "membres.txt", reponseString, function (err) {
  if (err) throw err;
  console.log('Sauvegardé');
});
 res.end(JSON.stringify(reponse));
})

//////////////////////////////////////////////////////////// Route : membres

app.get('/membres', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "membres.txt", 'utf8', function (err, data) {
 console.log( data );

 let collection = JSON.parse('[' + data + ']');

 res.end(transforme_entableau(collection))

/* let html = "<table><tr><th>Prénom</th><th>Nom</th><th>Téléphone</th><th>Courriel</th></tr>"
 let liste = JSON.parse(data);
 for (let i in liste){
 	html += "<tr><td>" + liste["prenom"] + "</td><td>" + liste["nom"] + "</td><td>" + liste["telephone"] + "</td><td>" + liste["courriel"] + "</td></tr>" 
 }

 html += "</table>"

 res.end( html );*/
 });
})

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})