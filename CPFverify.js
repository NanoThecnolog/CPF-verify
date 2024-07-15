const readline = require('readline');

function CPFvalidate(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Insira o CPF para verificação: ", (cpf) => {
    cpf = cpf.trim();
    cpf = cpf.replace(/\D/g, '');

    if (!isNaN(cpf) && cpf.length > 0 && cpf.length === 11) {
        const verify = CPFvalidate(cpf);

        if (verify) {
            console.log(`CPF válido.`);
        } else {
            console.log(`CPF inválido.`);
        }
    } else {
        console.log(`Por favor, insira um CPF válido.`);
    }
    rl.close();
});
