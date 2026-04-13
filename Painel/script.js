const ChaveBrasil = "36d587e805dced84909ea39bf79f6592"

function NomeCidade(dados){
    let nomeLimpo = dados.name.replace(/Estado d[a|o|e] /gi, "");

    const exigeNo = [
      "Rio de Janeiro",
      "Maranhão",
      "Amazonas",
      "Acre",
      "Paraná",
      "Ceará",
      "Piauí",
      "Rio Grande do Norte",
      "Rio Grande do Sul"
    ];

    const exigeNa = [
        "Bahia",
        "Paraíba"
    ];

    let preposicao = "em"

    if(exigeNo.includes(nomeLimpo)){
        preposicao = "no";
    }

    if(exigeNa.includes(nomeLimpo)){
        preposicao = "na";
    }


    document.querySelector(".cidade").innerHTML = `Tempo ${preposicao} ${nomeLimpo}`
    document.querySelector(".graus").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".nublado").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".imagem-preview").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
}

async function BuscarCidade(cidade){
    const Key = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${ChaveBrasil}&units=metric&lang=pt_br`)
    const dados = await Key.json()


    if(dados.cod == "404"){
        alert("Nenhuma Cidade Encontrada")
        return;
    }

    NomeCidade(dados)
    console.log(dados)
}

function buscar() {
    const cidade = document.querySelector(".buscar_cidade").value

    BuscarCidade(cidade)
}



function HorarioBrasil(){
    const relogio = document.getElementById("hour")
    const menssagem = document.getElementById("msg")
    const data = new Date()

    const HoraBrasil =
    new Intl.DateTimeFormat("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo'

    }).format(data);

    const hora = Number(HoraBrasil.split(":")[0]);
    relogio.innerHTML = HoraBrasil

    if(hora >= 0 && hora < 6){
        document.body.style.backgroundImage = "url(img/madruga.jpg)"
        menssagem.innerHTML = 'Boa madrugada'
    }

    else if(hora >=6 && hora < 12){
        document.body.style.backgroundImage = "url(img/manha.jpg)"
        menssagem.innerHTML = 'Bom dia'
    }

    else if(hora >= 12 && hora < 18){
        document.body.style.backgroundImage = "url(img/tarde.jpg)"
        menssagem.innerHTML = 'Boa tarde'
    }

    else{
        document.body.style.backgroundImage = "url(img/noite.jpg)"
        menssagem.innerHTML = 'Boa noite'
    }
}
setInterval(HorarioBrasil, 1000);