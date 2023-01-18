const parOuImpar = process.argv[2]
const value = Number(process.argv[3])

function numeroAleatorio(min,max){
    return Math.floor(Math.random()* (max - min +1)) + min
}

const numeroSorteio = numeroAleatorio(0,10)

const total = numeroSorteio + value
const testeValor = total %2

if (!value || !parOuImpar){
    console.log("digite um numero entre 0 e 10");
} else {
    if(testeValor === 0 && parOuImpar === "par"){
        console.log(`Você venceu, seu número foi ${value} e Você escolheu par, o pc escolheu impar com número ${numeroSorteio}, o valor total foi ${total}`);
    } else if (testeValor === 0 && parOuImpar ==="impar"){
        console.log(`Você perdeu, seu número foi ${value} e Você escolheu impar, o pc escolheu par com número ${numeroSorteio}, o valor total foi ${total}`);
    }else if(testeValor === 1 && parOuImpar === "impar"){
        console.log(`Você perdeu, seu número foi ${value} e Você escolheu par, o pc escolheu impar com número ${numeroSorteio},  o valor total foi ${total}`)
    }else if (testeValor === 1 && parOuImpar ==="impar"){
        console.log(`Você venceu, seu número foi ${value} e Você escolheu impar, o pc escolheu par com número ${numeroSorteio},  o valor total foi ${total}` );
    }
}

console.log("o programa iniciou =D");