var xi=-1,yi=-1;

function f(){
    setInterval(g,1000);
    document.getElementById("adresaMea").innerHTML=location.href;
    
    let language = window.navigator.language;
    document.getElementById("limbaBrowser").innerHTML = "Browser language: " + language;
}

function g(){
    let elem=document.getElementById("timpCurent");
    elem.innerHTML="Timpul curent este "+(new Date());
}

function deseneaza(e){
    let xf=e.offsetX;
    let yf=e.offsetY;

    if(xi==-1 || yi==-1){
        xi=xf;
        yi=yf;
    }else{
        let c = document.getElementById("desen");
        let ctx = c.getContext("2d");
        let colorFillInput = document.getElementById("color1").value;
        let colorBorderInput = document.getElementById("color2").value;

        ctx.beginPath();

        ctx.lineWidth = 2;
        ctx.setstrokeStyle = colorBorderInput;
        ctx.fillStyle = colorFillInput;

        if(xi<xf){
            if(yi<yf){
                ctx.fillRect(xi,yi,Math.abs(xf-xi),Math.abs(yf-yi));
                ctx.strokeRect(xi,yi,Math.abs(xf-xi),Math.abs(yf-yi));
            }else if(yi>yf){
                ctx.fillRect(xi,yi,Math.abs(xf-xi),-Math.abs(yf-yi));
                ctx.strokeRect(xi,yi,Math.abs(xf-xi),-Math.abs(yf-yi));
            }
        }else if(xi>xf){
            if(yi<yf){
                ctx.fillRect(xi,yi,-Math.abs(xf-xi),Math.abs(yf-yi));
                ctx.strokeRect(xi,yi,-Math.abs(xf-xi),Math.abs(yf-yi));
            }else if(yi>yf){
                ctx.fillRect(xi,yi,-Math.abs(xf-xi),-Math.abs(yf-yi));
                ctx.strokeRect(xi,yi,-Math.abs(xf-xi),-Math.abs(yf-yi));
            }
        }

        xi=-1;
        yi=-1;
    }
}

function addRows(){ 
	var table = document.getElementById('emptbl');
	var rowCount = table.rows.length;
	var cellCount = table.rows[0].cells.length; 
	var row = table.insertRow(rowCount);
	for(var i =0; i <= cellCount; i++){
		var cell = 'cell'+i;
		cell = row.insertCell(i);
		var copycel = document.getElementById('col'+i).innerHTML;
		cell.innerHTML=copycel;
		if(i == 3){ 
			var radioinput = document.getElementById('col3').getElementsByTagName('input'); 
			for(var j = 0; j <= radioinput.length; j++) { 
				if(radioinput[j].type == 'radio') { 
					var rownum = rowCount;
					radioinput[j].name = 'gender['+rownum+']';
				}
			}
		}
	}
}
function deleteRows(){
	var table = document.getElementById('emptbl');
	var rowCount = table.rows.length;
	if(rowCount > '2'){
		var row = table.deleteRow(rowCount-1);
		rowCount--;
	}
	else{
		alert('There should be atleast one row');
	}
}

function schimbaContinut(resource, jsFisier, jsFunctie){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("continut").innerHTML = this.responseText;

        if (jsFisier) {
            var elementScript = document.createElement('script');
            elementScript.onload = function () {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            };
            elementScript.src = jsFisier;
            document.head.appendChild(elementScript);
        } else {
            if (jsFunctie) {
                window[jsFunctie]();
            }
        }
    }
    xhttp.open("GET", resource, true);
    xhttp.send();
}

function verificare(){
    var user = document.getElementById('utilizator').value;
    var password = document.getElementById('parola').value;
    var cnt=0;

    fetch('resurse/utilizatori.json', { 
        method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
        //json este deja vector de obiecte
        //console.log(typeof json[1])

        for(var i=0;i<json.length;i++){
            if(json[i].utilizator==user && json[i].parola==password){
                console.log(user);
                console.log(password);
                console.log(json[i].utilizator);
                console.log(json[i].parola);
                document.getElementById("rezultat_verificare").innerHTML = "Utilizator gasit!";
                cnt=1;
            }
        }
        if(cnt==0){
            document.getElementById("rezultat_verificare").innerHTML = "Utilizator nu a fost gasit!";
        }
    });
}

function adaugaUtilizator(){
    fetch("resurse/utilizatori.json", {
        method: "POST",
        body: JSON.stringify({
            userId: 1,
            title: "Fix my bugs",
            completed: false
        }),
    });
}

function saveCalendar(){    	
    const location = document.getElementById('locatie');
    const date = document.getElementById('data');
    const type = document.getElementById('tip');
    
    let data = 
        '\r Locație: ' + location.value + ' \t ' + 
        'Data: ' +date.value + ' \t ' + 
        'Type: ' + type.value + ' \r\n ';

    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'calendar.txt';	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click(); 
}

function saveForm(){    
    const username = document.getElementById('nume_utilizator');	
    const lastname = document.getElementById('nume');
    const firstname = document.getElementById('prenume');
    const password = document.getElementById('parola');
    const email = document.getElementById('email');
    const phone = document.getElementById('numar_telefon');
    const age = document.getElementById('vârstă');
    const birthday = document.getElementById('birthday');
    const birthhour = document.getElementById('birthhour');
    const sex = document.getElementById('sex');
    const teams = document.getElementById('teams');
    const color = document.getElementById('favcolor');
    const info = document.getElementById('AdditionalInfo');

    
    let data = 
        'Nume_utilizator: ' + username.value + ' ' + 
        'Nume: ' +lastname.value + ' ' + 
        'Prenume: ' + firstname.value + ' ' +
        'Parola: ' +password.value + ' ' + 
        'E-mail: ' +email.value + ' ' + 
        'Telefon: ' +phone.value + ' ' + 
        'Vârstă: ' +age.value + ' ' + 
        'Zi de naștere: ' +birthday.value + ' ' + 
        'Ora nașterii: ' +birthhour.value + ' ' + 
        'Sex: ' +sex.value + ' ' +
        'Echipa preferată: ' +teams.value + ' ' + 
        'Culoarea preferată: ' +color.value + ' ' +
        'Informații suplimentare: ' +info.value + '\n';

    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click(); 
}

function acordaNota(){
    window.alert("Vă mulțumim!");
}