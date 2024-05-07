const div_hora = document.querySelector('.hora');
const div_data = document.querySelector('.data');
const div_cronometro = document.querySelector('.cronometro');
const btn_start = document.querySelector('#iniciar');
const btn_stop = document.querySelector('#parar');
const btn_reset = document.querySelector('#resetar');
const botoesContainer = document.querySelector('.buttons_crono')
const botoes = document.querySelectorAll('.timer_options');

let hora_data;
let milissegundos = 0;
let segundos = 0;
let minutos = 0;
let horas = 0;
let interval = null;
let mostraHora = true

btn_start.addEventListener('click', startcron);
btn_stop.addEventListener('click', pauseCron);
btn_reset.addEventListener('click', resetCron)

function exibiHora() {
    clearInterval(interval)
    if (mostraHora === true) {
        
        interval = setInterval(() => {
            hora_data = new Date;
            const horaFormatada = hora_data.getHours().toString().padStart(2, '0');
            const minutosFormatados = hora_data.getMinutes().toString().padStart(2, '0');
            const segundosFormatados = hora_data.getSeconds().toString().padStart(2, '0');
    
            div_cronometro.innerText = `${horaFormatada}:${minutosFormatados}:${segundosFormatados}`;
        }, 1000);
    }    
}

function exibiData() {
    setInterval(() => {
        hora_data = new Date;
        const diaFormatado = hora_data.getDate().toString().padStart(2, '0');
        const mesFormatado = (hora_data.getMonth() + 1).toString().padStart(2, '0');
        const anoFormatado = hora_data.getFullYear().toString();

        div_data.innerText = `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
    }, 1000);
}

function startcron() {

    clearInterval(interval)
    div_cronometro.innerHTML = '00:00.0';

    if (interval === null) {
        interval = setInterval(() => {

            milissegundos++
            
            if (milissegundos === 100) {
                segundos++
                milissegundos = 0
            }

            if (segundos === 60) {
                segundos = 0;
                minutos++;
            }

            milissegundos = formataTempo(milissegundos);
            minutos = formataTempo(minutos);
            segundos = formataTempo(segundos);

            div_cronometro.innerHTML = `${minutos}:${segundos}.${milissegundos}`;

            // funcionou
            // const horasFormatadas = horas < 10 ? `0${horas}` : horas;
            // const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
            // const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;

            // div_cronometro.innerHTML = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
        }, 10);

    }


    btn_start.style.display = 'none'
    btn_stop.style.display = 'block'
}

function formataTempo(time) {
    // nao funcionou
    // return time < 10 && time !== 0 ? `0${time}` : time;

    return time.toString().padStart(2, '0');
}

function pauseCron() {

    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    btn_start.style.display = 'block'
    btn_stop.style.display = 'none'
}

function resetCron() {

    if (interval === null) {
        clearInterval(interval)
    
        milissegundos = 0;
        segundos = 0;
        minutos = 0;

        div_cronometro.innerHTML = '00:00.00'
    }

}


botoes.forEach(botao => {
    botao.addEventListener('click', () => {

        botoes.forEach(fundoBotao => {
            fundoBotao.classList.remove('botao_ativo');
        })

        if (botao.id === 'hora_option') {
            mostraHora = true
            botao.classList.add('botao_ativo')
            clearInterval(interval)
            botoesContainer.style.display = 'none'

            exibiHora()
        } 

        if (botao.id === 'crono_option') {
            mostraHora = false
            botao.classList.add('botao_ativo')
            clearInterval(interval)
            div_cronometro.innerHTML = '00:00.0';
            botoesContainer.style.display = 'flex'
        } 
    });
});

exibiHora()
exibiData();
