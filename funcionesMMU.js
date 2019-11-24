var anterior = -1;
var listaRAM = [0,0,0,0,0,0,0,0];

class Pagina{
    constructor(numeroPagina, bitPA, marcoPagina, R, M){
        this.numeroPagina = numeroPagina;
        this.bitPA = bitPA;
        this.marcoPagina = marcoPagina;
        this.R = R;
        this.M = M;
    }

    mostrarInformacio(){
        alert("Numero pagina: "+tablaPaginas[i].numeroPagina+" bitPA"+tablaPaginas[i].bitPA+" marcoPagina+"+tablaPaginas[i].marcoPagina
            +" R: "+tablaPaginas[i].R + " M: "+tablaPaginas[i].M );                
    }

    generarRM(){
        this.R = Math.floor(Math.random() * (2 - 0)) + 0;
        this.M = Math.floor(Math.random() * (2 - 0)) + 0;
    }

    desalojarRAM(){
        this.bitPA = 0;
        this.marcoPagina = "000";
        this.R = 0;
        this.M = 0;
    }
}

var tablaPaginas = [];

function mostrarInfoTabla(){
    for(var i = 0; i<16; i++){
        alert("Numero pagina: "+tablaPaginas[i].numeroPagina+" bitPA: "+tablaPaginas[i].bitPA+" marcoPagina: "+tablaPaginas[i].marcoPagina
            +" R: "+tablaPaginas[i].R + " M: "+tablaPaginas[i].M );
    }
}

function inicializarTabla() {
    var i = 0;
    var marcoAux, bitAux, rAux, mAux;
    //alert("Hola"+i);
    for (i = 0; i < 16; i++) {
        marcoAux = "marcoDir" + i;
        bitAux = "bitPA" + i;
        rAux = "r" + i;
        mAux = "m" + i;

        tablaPaginas.push( new Pagina(i, 0, "000", 0, 0) );

        //alert("marco: "+marcoAux);
        document.getElementById(marcoAux).innerHTML = "000";
        document.getElementById(bitAux).innerHTML = "0";
        document.getElementById(rAux).innerHTML = "0";
        document.getElementById(mAux).innerHTML = "0";

    }

    //mostrarInfoTabla();

}

function inicializarTablaRAM() {
    var i = 0;
    var marcoAux, bitAux;
    //alert("Hola"+i);
    for (i = 0; i < 8; i++) {
        marcoAux = "numMarco" + i;
        bitAux = "bitMarco" + i;
        //alert("marco: "+marcoAux);
        document.getElementById(marcoAux).innerHTML = i;
        document.getElementById(bitAux).innerHTML = "0";
    }
}

function incializar() {
    inicializarTabla();
    inicializarTablaRAM();
}

function enteroABinario(valInt, modo){

    var binarioAux = "", binario = "";
    var tamanioAux;

    while(valInt != 0){
        binarioAux += valInt % 2;
        valInt = parseInt(valInt/2);
    }

    for(let letra of binarioAux){
        binario = letra + binario;
    }

    if(modo == 0){
        tamanioAux = 3;
    }else if(modo == 1){
        tamanioAux = 4;
    }else{
        tamanioAux = 12;
    }

    while(binario.length != tamanioAux){
        binario = "0"+binario;
    }    

    return binario;
}

function binarioAEnteroOffset(valBinario){

    var resultado = 0;

    for(i=0;i<valBinario.length;i++){
        if(valBinario[i] == '1'){
            resultado+=(2**(11+valBinario.length-i));
        }
    }

    //alert("Binario: "+valBinario+" -> "+resultado);
    return resultado;

}

function buscarEspacio(pos) {
    for (var i = 0; i < 8; i++) {
        if (pos[i] == 0) {
            //alert("Marco Vacio");
            return i;
        }
    }
    return -1;
}

function generarRM() {
    var i;

    for (i = 0; i < 16; i++) {
        rAux = "r" + i;
        mAux = "m" + i;
    }
}

function imprimirTabla(idTabla, idDiv, pagina, marcoPagina, modo){

    //alert("Pagina: "+pagina+" Marco: "+marcoPagina);

    var codigoTabla = "<table id='"+idTabla+"' class='tablaConversionesAux'><tr><td>Dirección Virtual</td><td>Dirección Física</td></tr></table>";    
    document.getElementById(idDiv).innerHTML = codigoTabla;
    var referenciaTabla = document.getElementById(idTabla);
    var nuevaFila, celda0, celda1, direccionBinaria;

    if(modo == 0){
        for(i=0;i<4096;i++){
            nuevaFila = referenciaTabla.insertRow(referenciaTabla.length);
            
            celda0 = nuevaFila.insertCell(0);       
            celda1 = nuevaFila.insertCell(1);
    
            direccionBinaria = enteroABinario(i, 2);
    
            text0 = document.createTextNode(pagina+direccionBinaria);
            text1 = document.createTextNode(marcoPagina+direccionBinaria);
    
            celda0.appendChild(text0);
            celda1.appendChild(text1);
    
        }
    }else if(modo == 1){

        direccionVirtual = binarioAEnteroOffset(pagina);
        direccionFisica = binarioAEnteroOffset(marcoPagina);

        for(i=0;i<4096;i++){
            nuevaFila = referenciaTabla.insertRow(referenciaTabla.length);
            
            celda0 = nuevaFila.insertCell(0);       
            celda1 = nuevaFila.insertCell(1);
    
            text0 = document.createTextNode(direccionVirtual);
            text1 = document.createTextNode(direccionFisica);
    
            celda0.appendChild(text0);
            celda1.appendChild(text1);

            direccionVirtual++;
            direccionFisica++;
    
        }        
    }else{
        direccionVirtual = binarioAEnteroOffset(pagina);
        direccionFisica = binarioAEnteroOffset(marcoPagina);

        for(i=0;i<4096;i++){
            nuevaFila = referenciaTabla.insertRow(referenciaTabla.length);
            
            celda0 = nuevaFila.insertCell(0);       
            celda1 = nuevaFila.insertCell(1);
    
            text0 = document.createTextNode(direccionVirtual.toString(16));
            text1 = document.createTextNode(direccionFisica.toString(16));
    
            celda0.appendChild(text0);
            celda1.appendChild(text1);

            direccionVirtual++;
            direccionFisica++;     
        }
    }

    

}

function imprimirConversiones(pagina, marcoPagina){

    document.getElementById("bit15V").innerHTML = pagina[0];
    document.getElementById("bit14V").innerHTML = pagina[1];
    document.getElementById("bit13V").innerHTML = pagina[2];
    document.getElementById("bit12V").innerHTML = pagina[3];

    document.getElementById("bit14F").innerHTML = marcoPagina[0];
    document.getElementById("bit13F").innerHTML = marcoPagina[1];
    document.getElementById("bit12F").innerHTML = marcoPagina[2];

    imprimirTabla("tablaConversionesBinaria", "divConversionesBinarias", pagina, marcoPagina, 0);
    imprimirTabla("tablaConversionesHexa", "divConversionesHexadecimales", pagina, marcoPagina, 1);
    imprimirTabla("tablaConversionesDeci", "divConversionesDecimales", pagina, marcoPagina, 2);

}

function transformarDireccion(elemento) {
    
    var espacio;
    var bitAux, marcoPagina;
    var paginaSelec = elemento.value;

    if(tablaPaginas[paginaSelec].bitPA == 1){
        alert("Esta página ya se encuentra en RAM.");
        return;
    }

    espacio = buscarEspacio(listaRAM);
    //alert("Pagina: "+paginaSelec+" Vacio: "+buscarEspacio(listaRAM));
    
    if(espacio != -1){
        listaRAM[espacio] = 1;
        bitAux = "bitMarco"+espacio;
        document.getElementById(bitAux).innerHTML = "1";

        marcoPagina = enteroABinario(espacio, 0);

        tablaPaginas[paginaSelec].bitPA = 1;
        tablaPaginas[paginaSelec].marcoPagina = marcoPagina;

        //bitPAAux = "bitPA"+elemento.value;
        document.getElementById("bitPA"+elemento.value).innerHTML = tablaPaginas[paginaSelec].bitPA;
        //marcoAux = "marcoDir"+elemento.value;
        document.getElementById("marcoDir"+elemento.value).innerHTML = tablaPaginas[paginaSelec].marcoPagina;

    }else{

        var clase0=[], clase1=[], clase2=[], clase3=[];
        var paginaADesalojar;

        for(var i = 0; i<16; i++){
            if(tablaPaginas[i].bitPA == 1){

                if(tablaPaginas[i].R == 0 && tablaPaginas[i].M == 0){
                    clase0.push(tablaPaginas[i].numeroPagina);
                }

                if(tablaPaginas[i].R == 0 && tablaPaginas[i].M == 1){
                    clase1.push(tablaPaginas[i].numeroPagina);
                } 

                if(tablaPaginas[i].R == 1 && tablaPaginas[i].M == 0){
                    clase2.push(tablaPaginas[i].numeroPagina);
                }

                if(tablaPaginas[i].R == 1 && tablaPaginas[i].M == 1){
                    clase3.push(tablaPaginas[i].numeroPagina);
                }                        
            }
        }

        var auxInfo = "Clase 0: ";

        for(let elem of clase0){
            auxInfo+=" "+elem;
        }

        auxInfo+="<br>Clase 1: "
        for(let elem of clase1){
            auxInfo+=" "+elem;
        }

        auxInfo+="<br>Clase 2: "
        for(let elem of clase2){
            auxInfo+=" "+elem;
        }

        auxInfo+="<br>Clase 3: "
        for(let elem of clase3){
            auxInfo+=" "+elem;
        }

        document.getElementById("divImpresionesPrueba").innerHTML = auxInfo;

        if(clase0.length != 0){
            paginaADesalojar = clase0[0];
        }else if(clase1.length != 0){
            paginaADesalojar = clase1[0];
        }else if(clase2.length != 0){
            paginaADesalojar = clase2[0];
        }else{
            paginaADesalojar = clase3[0];
        }

        tablaPaginas[paginaSelec].bitPA = 1;
        tablaPaginas[paginaSelec].marcoPagina = tablaPaginas[paginaADesalojar].marcoPagina;
        tablaPaginas[paginaADesalojar].desalojarRAM();

        document.getElementById("bitPA"+paginaADesalojar).innerHTML = tablaPaginas[paginaADesalojar].bitPA;
        document.getElementById("marcoDir"+paginaADesalojar).innerHTML = tablaPaginas[paginaADesalojar].marcoPagina;

        document.getElementById("bitPA"+elemento.value).innerHTML = tablaPaginas[paginaSelec].bitPA;
        document.getElementById("marcoDir"+elemento.value).innerHTML = tablaPaginas[paginaSelec].marcoPagina;

        marcoPagina = tablaPaginas[paginaSelec].marcoPagina;

    }

    for(var i = 0; i<16; i++){
        if(tablaPaginas[i].bitPA == 1){
            tablaPaginas[i].generarRM();
            document.getElementById("r"+i).innerHTML = tablaPaginas[i].R;
            document.getElementById("m"+i).innerHTML = tablaPaginas[i].M;

            if(tablaPaginas[i].R == 0 && tablaPaginas[i].M == 0){
                document.getElementById("filaPagina"+i).className = "clase0RM";
            }

            if(tablaPaginas[i].R == 0 && tablaPaginas[i].M == 1){
                document.getElementById("filaPagina"+i).className = "clase1RM";
            } 

            if(tablaPaginas[i].R == 1 && tablaPaginas[i].M == 0){
                document.getElementById("filaPagina"+i).className = "clase2RM";
            }

            if(tablaPaginas[i].R == 1 && tablaPaginas[i].M == 1){
                document.getElementById("filaPagina"+i).className = "clase3RM";
            } 

        }else{
            document.getElementById("filaPagina"+i).className = "noRAM";
        }
    }

    //alert("Seleccionada: "+enteroABinario(elemento.value, 1)+" Marco: "+marcoPagina);
    imprimirConversiones(enteroABinario(elemento.value,1), marcoPagina)


}