function incarcaPersoane() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        document.getElementById("continut").innerHTML = this.responseText;
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", "resurse/persoane.xml", true);
    xmlhttp.send();
}
  
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<table id=\"tabel\"><tr><th>Nume</th><th>Prenume</th><th>Vârstă</th><th>Sex</th><th>Facultate</th><th>Limbi Cunosucte</th><th>Adresă</th></tr>";
    var x = xmlDoc.getElementsByTagName("persoana");
    for (i = 0; i <x.length; i++) {
      table += "<tr><td>" +
      x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +"</td><td>" +
      x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue + "</td><td>" + 
      x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue + "</td><td>" + 
      x[i].getElementsByTagName("sex")[0].childNodes[0].nodeValue + "</td><td>" + 
      x[i].getElementsByTagName("facultate")[0].childNodes[0].nodeValue + "</td><td>" + 
      x[i].getElementsByTagName("limba1")[0].childNodes[0].nodeValue + ", " + x[i].getElementsByTagName("limba2")[0].childNodes[0].nodeValue + "</td><td>" + 
      "strada " + x[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue +  ", " + 
      "nr. " +x[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue + ", "  +
      x[i].getElementsByTagName("codPostal")[0].childNodes[0].nodeValue + ", "  + 
      x[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue + ", "  + 
      x[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue  + ", "  + 
      x[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue +"</td></tr>";
    }
    table=table+"</table>"
    document.getElementById("continut").innerHTML = table;
  }