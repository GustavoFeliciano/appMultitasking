


//Funcoes e variaveis para o login

var inscricaoB=false;
var validadeLogin=false;
var UserB;
var PasswordB;

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

function verificarLogin(){

    var formLogin = document.forms["FormLogin"];
    var User = formLogin.elements[0].value;
    var Password = formLogin.elements[1].value;
    
    if(User!=UserB){
        alert("Login ou senha inválidos!!");
        validadeLogin = false;
        return;
    }else{
        if(Password!=PasswordB){
            alert("Login ou senha inválidos!!");
            validadeLogin = false;
            return;
        }else{
            validadeLogin = true;
        }
    }
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
        UserB = User;
        PasswordB = Password;
        inscricaoB = true;
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