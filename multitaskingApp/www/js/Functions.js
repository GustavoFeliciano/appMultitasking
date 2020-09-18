


//Funcoes e variaveis para o login

var inscricaoB=false;
var validadeLogin=false;

function mudarTela(Tela, Verificacao){
    if(Tela=='#telaInicio'){
        if(validadeLogin){
            $(".Telas").removeClass("Ativa");
            $(Tela).addClass("Ativa");
        }
    }else{
        if(Tela=='#telaLogin' && Verificacao!="Comeco"){
            if(inscricaoB){
                $(".Telas").removeClass("Ativa");
                $(Tela).addClass("Ativa");
            }
        }else{
            $(".Telas").removeClass("Ativa");
            $(Tela).addClass("Ativa");
        }
    }
}


function limparCampos(Form, numerosCampos){

    if(Form=="#FormLogin"){
        var formPLimpar = document.forms["FormLogin"];
    }else{
        if(Form=="#FormInscricao"){
            var formPLimpar = document.forms["FormInscricao"];
        }
    }

    var i=0;

    for(i=0;i<=numerosCampos;i++){
        formPLimpar.elements[i].value = "";
    }
}

function mudarIntFloat(){

    var form = document.forms["FormCalculadora"];
    var n1 = parseFloat(form.elements[0].value);

    n1 += 25.5;

    alert(n1);
}



//FUNCOES DA CALCULADORA

var textoCal = "";
var ladoEsquerd;
var ladoEsquerdB = true;
var ladoDireit;
var ladoDireitB = false;
var funcArit;

function escreverDigito(Digito){
    
    document.getElementById("numerosCal").innerHTML += Digito;
}

function Apagar(){

    textoCal = "";
    document.getElementById("numerosCal").innerHTML = "";
    ladoEsquerdB = true;
    ladoDireitB = false;
}

function numeroPCal(Num){

    textoCal += Num;

    if(ladoEsquerdB){
      ladoEsquerd += parseFloat(Num);
    }else{
        ladoDireit = parseFloat("");
    }
}

function guardarEquacao(){
    if(ladoEsquerdB){
        ladoEsquerd = parseFloat(textoCal);
    }else{
        ladoDireit = parseFloat(textoCal);
    }
}

function funcoesAritmeticas(func){

    if(func=="."){
        textoCal += ".";
        return;
    }else{      
        guardarEquacao();
        Apagar();
        if(func=="="){
            Calcular();
        }else{
        if(func=="raiz"){
            Calcular();
            }else{
                if(func=="pot"){
                    Calcular();
            }
        }
    }    
        if(ladoEsquerdB){
        ladoEsquerdB = false;
        ladoDireitB = true;
     }else{
        ladoEsquerdB = true;
        ladoDireitB = false;
     }     
    funcArit=func; 
    }
}

function Calcular(){
    var resultado;

    if(funcArit=="/"){
        resultado = ladoEsquerd / ladoDireit;
    }else{
        if(funcArit=="*"){
            resultado = ladoEsquerd * ladoDireit;
        }else{
            if(funcArit=="-"){
                resultado = ladoEsquerd - ladoDireit;
            }else{
                if(funcArit=="+"){
                    resultado = ladoEsquerd + ladoDireit;
                }else{
                    if(funcArit=="pot"){
                        resultado = Math.pow(ladoEsquerd,2);
                    }else{
                        if(funcArit=="raiz"){
                            resultado = Math.sqrt(ladoEsquerd);
                    }else{
                        if(funcArit=="mod"){
                            resultado = ladoEsquerd % ladoDireit;
                        }
                    }
                }   
              }
            }
        }
    }
    document.getElementById("numerosCal").innerHTML = resultado;
}

//BANCO DE DADOS

var bd = window.openDatabase("multitaskingBD","1.0","myBase",4048);
bd.transaction(function(criar){
    criar.executeSql("CREATE TABLE Login(Senha TEXT PRYMARY KEY, Nome TEXT )");
});

function verificarLogin(){

    var formLogin = document.forms["FormLogin"];
    var User = formLogin.elements[0].value;
    var Password = formLogin.elements[1].value;

    bd.transaction(function(mostrarDados){
        mostrarDados.executeSql('SELECT * FROM Login', [], function(mostrarDados,resultado){
            var rows = resultado.rows;
            var tamanho = rows.length;
            var UserB = [tamanho];
            var PasswordB = [tamanho];

            for(i=0;i < rows.length;i++){
                UserB[i] = rows[i].Nome;
                PasswordB[i] = rows[i].Senha;
                
                if(UserB[i]==User){
                    if(PasswordB[i]==Password){
                        validadeLogin = true;
                        mudarTela("#telaInicio");
                        return;
                    }
                }
            }

            alert("Usuário ou senha incorretos!!");

        });

    });

}

function validarCadastro(){
    var formInscricao = document.forms["FormInscricao"];
    var User = formInscricao.elements[0].value;
    var Password = formInscricao.elements[1].value;
    var passwordConfirm = formInscricao.elements[2].value;
    var Valido = false;

    if(User==""||Password==""||passwordConfirm==""){
        alert("Campos obrigatórios estão em branco, por favor preencha!!");
        inscricaoB = false;
        return Valido = false;
    }
    if(Password === passwordConfirm){
        Valido = true;
    }else{
        alert("As senhas não são iguais, por favor digite novamente");
        Valido = false;
        inscricaoB = false;
    }
    if(Valido){
        bd.transaction(function(armazenar){
            armazenar.executeSql("INSERT INTO Login VALUES (?,?)",[Password,User]);
        })
        inscricaoB = true;
    }
}



//FUNCOES DE PERMISSÕES DO APP

var permissoes = cordova.plugin.permissions;

permissoes.checkPermission(permissoes.WRITE_CALENDAR,function(status){

    if(!status.hasPermission){
        permissoes.resquestPermissions(permissoes.WRITE_CALENDAR,function(status){
            alert("toper");
        },alert("Deu merda"));
    }
},alert("Deu merda"));
