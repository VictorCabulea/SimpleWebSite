class Produs {
    constructor(name, quantity, price) {
      this.name = name;
      this.quantity = quantity;
      this.price=price;
    }
}

function cumpara(bilet, pret){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("continut").innerHTML = this.responseText;
        popup.classList.toggle("show");
    }
    xhttp.open("GET", resource, true);
    xhttp.send();
}

function apasaCumpara(bilet, pret){
    document.getElementById('numeProdus').value = bilet;
    document.getElementById('pretProdus').value = pret;
}

function adaugaProdus(){
    let numeP=document.getElementById("numeProdus").value;
    let pretP=document.getElementById('pretProdus').value;
    let cantP=document.getElementById("cantitateProdus").value;
    let produse=localStorage.getItem("produse");

    if(produse==null){
        //daca nu am produse trb sa il creez
        produse=[];
    }else{
        produse=JSON.parse(produse);
        //convertesc de la sir de caracctere la vector

    }
    let p=new Produs(numeP,cantP,pretP);

    console.log(p);
    produse.push(p);

    localStorage.setItem("produse",JSON.stringify(produse));

    document.getElementById('mesaj').value = "Succes! Comanda a fost înregistrată! Prețul total: "+cantP*pretP + "$";

}
