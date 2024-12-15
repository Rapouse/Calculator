const
    // Elementos do DOM necessários para a funcionalidade da calculadora.
    displayBox = document.querySelector('.display'),
    displayInput = document.querySelector('.display-input'),
    displayResult = document.querySelector('.display-result'),
    buttons = document.querySelectorAll('button'),
    operators = ['%', '÷', '×', '-', '+']; // Operadores suportados.

let
    input = '',
    result = '',
    lastCalculation = false;

// Função principal para lidar com a lógica da calculadora.
const calculate = btnValue => {

    // Variáveis de controle.
    const
        lastChar = input.slice(-1), // Pega o último caractere da string.
        secondLastChar = input.slice(-2, -1), // Pega o penúltimo caractere da string.
        withoutLastChar = input.slice(0, -1), // Pega a string sem o último caractere.
        isLastCharOperator = operators.includes(lastChar), // Verifica se o último caractere é um operador.
        isInvalidResult = ['Erro', 'Infinity', 'NaN'].includes(result);

    let { openBracketsCount, closeBracketsCount } = countBrackets(input); // Contagem de parênteses.


    // Ação para o botão "=".
    if (btnValue === '=') {

        if (
            input === '' ||
            lastChar === '.' ||
            lastChar === '(' ||
            isLastCharOperator && lastChar !== '%' ||
            lastCalculation
        ) return;

        // Fecha parênteses abertos automaticamente.
        while (openBracketsCount > closeBracketsCount) {
            input += ')';
            closeBracketsCount++;
        }

        const formattedInput = replaceOperators(input); // Substitui operadores para o formato JS.
        try {
            const calculatedValue = input.includes('%') ? calculatePercentage(input) : evaluate(formattedInput);
            result = parseFloat(calculatedValue.toFixed(10)).toString();
        } catch (error) {
            result = 'Erro';
        }

        input += btnValue;
        lastCalculation = true;
        displayBox.classList.add('active');
    }

    // Ação para o botão 'AC'.
    else if (btnValue === 'AC') {
        resetCalculator('');
    }

    // Ação para o botão 'backspace'.
    else if (btnValue === '') {
        if (lastCalculation) {
            if (isInvalidResult) resetCalculator('');
            resetCalculator(result.slice(0, -1));
        } else input = withoutLastChar;
    }

    // Ação para os botões de operador.
    else if (operators.includes(btnValue)) {
        if (lastCalculation) {
            if (isInvalidResult) return;
            resetCalculator(result + btnValue);
        } else if (
            (input === '' || lastChar === '(') && btnValue !== '-' ||
            input === '-' ||
            lastChar === '.' ||
            secondLastChar === '(' && lastChar === '-' ||
            (secondLastChar === '%' || lastChar === '%') && btnValue === '%'
        ) return;
        else if (lastChar === '%') input += btnValue;
        else if (isLastCharOperator) input = withoutLastChar + btnValue;
        else input += btnValue;
    }

    // Ação para o botão '.'.
    else if (btnValue === '.') {
        const decimalValue = '0.';
        if (lastCalculation) resetCalculator(decimalValue);
        else if (lastChar === ')' || lastChar === "%") input += '×' + decimalValue;
        else if (input === '' || isLastCharOperator || lastChar === '(') input += decimalValue;
        else {
            let lastOperatorIndex = -1;
            for (const operator of operators) {
                const index = input.lastIndexOf(operator);
                if (index > lastOperatorIndex) lastOperatorIndex = index;
            } if (!input.slice(lastOperatorIndex + 1).includes('.')) input += btnValue;
        }
    }

    // Ação para o botão '()'.
    else if (btnValue === '( )') {
        if (lastCalculation) {
            if (isInvalidResult) resetCalculator('(');
            else resetCalculator(result + '×(');
        }
        else if (lastChar === '(' || lastChar === '.') return;
        else if (input === '' || isLastCharOperator && lastChar !== '%') input += '(';
        else if (openBracketsCount > closeBracketsCount) input += ')';
        else input += '×(';
    }

    // Ação para o botão de número.
    else {
        if (lastCalculation) resetCalculator(btnValue);
        else if (input === '0') input = btnValue;
        else if ((operators.includes(secondLastChar) || secondLastChar === '(') && lastChar === '0') input = withoutLastChar + btnValue;
        else if (lastChar === ')' || lastChar === '%') input += '×' + btnValue;
        else input += btnValue;
    }

    // Atualiza o display.
    displayInput.value = input;
    displayResult.value = result;

    // Auto-scroll.
    displayInput.scrollLeft = displayInput.scrollWidth;
};

// Função para substituir os símbolos de divisão e multiplicação por operadores compatíveis com JavaScript.
const replaceOperators = input => input.replaceAll('÷', '/').replaceAll('×', '*');

// Função para redefinir o estado da calculadora com um novo valor de entrada.
const resetCalculator = newInput => {
    input = newInput;
    result = '';
    lastCalculation = false;
    displayBox.classList.remove('active');
};

// Função para contar os parênteses na entrada.
const countBrackets = input => {
    let
        openBracketsCount = 0,
        closeBracketsCount = 0;
    for (const char of input) {
        if (char === '(') openBracketsCount++;
        else if (char === ')') closeBracketsCount++;
    }
    return { openBracketsCount, closeBracketsCount };
}

// Função para lidar com cálculos de porcentagem.
const calculatePercentage = input => {
    let
        processedInput = '',
        numberBuffer = '';

    const bracketsState = [];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (!isNaN(char) || char === '.') numberBuffer += char;
        else if (char === '%') {
            const
                percentValue = parseFloat(numberBuffer) / 100;
            prevOperator = i > 0 ? input[i - numberBuffer.length - 1] : '',
                nextOperator = i + 1 < input.length && operators.includes(input[i + 1]) ? input[i + 1] : '';

            if (!prevOperator || prevOperator === '÷' || prevOperator === '×' || prevOperator === '(') processedInput += percentValue;
            else if (prevOperator === '-' || prevOperator === '+') {
                if (nextOperator === '÷' || nextOperator === '×')
                    processedInput += percentValue;
                else processedInput += '(' + processedInput.slice(0, -1) + ')*' + percentValue;
            }
            numberBuffer = '';
        }
        else if (operators.includes(char) || char === '(' || char === ')') {
            if (numberBuffer) {
                processedInput += numberBuffer;
                numberBuffer = '';
            }

            if (operators.includes(char)) processedInput += char;
            else if (char === '(') {
                processedInput += '(';
                bracketsState.push(processedInput);
                processedInput = '';
            } else {
                processedInput += ')';
                processedInput = bracketsState.pop() + processedInput;
            }
        }
    }

    if (numberBuffer) processedInput += numberBuffer;

    return evaluate(replaceOperators(processedInput));
}

// Função para avaliar expressões matemáticas de forma segura.
const evaluate = expression => {
    try {
        // Validação básica para evitar strings maliciosas.
        const sanitizedExpression = expression.replace(/[^0-9+\-*/(). ]/g, '');
        return new Function(`return (${sanitizedExpression})`)();
    } catch (error) {
        throw new Error('Erro ao avaliar a expressão.');
    }
};

// Adiciona eventos de clique a todos os botões.
buttons.forEach(button =>
    button.addEventListener('click', e => calculate(e.target.textContent))
);
