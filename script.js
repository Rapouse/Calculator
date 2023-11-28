class Calculator {
   constructor(){
      // PROPRIEDADE QUE RECEBE OS VALORES DIGITADOS
      this.displayValue = ""; 
   }
   // MÉTODO QUE ADICIONA VALORES A PROPRIDADE displayValue
   appendToDisplay(value){
      this.displayValue += value;
      this.updateDisplay();
   }
   // ESTE MÉTODO ATUALIZA O VISOR (INPUT) COM OS VALORES QUE O USUÁRIO DIGITOU
   updateDisplay(){
      document.getElementById("displayContent").value = this.displayValue; 
   }
   // ESTE MÉTODO LIMPA OS VALORES DO displayValue (INPUT) E CHAMA O MÉTODO DO updateDisplay PARA ATUALIZAR O VISOR (INPUT)
   clearDisplay(){
      this.displayValue = "";
      this.updateDisplay();
   }

   calculate(){
      try {
         const result = eval(this.displayValue);
         this.displayValue = result; 
         this.updateDisplay();
      } catch (error) {
         this.displayValue = "Error";
         this.updateDisplay();
      }
   }

   // MÉTODO PARA CALCULAR O SENO
   sin(){
      try{
         const result = Math.sin(eval(this.displayValue));
         this.displayValue = result.toString();
         this.updateDisplay();
      } catch (error) {
         this.displayValue = "Error";
         this.updateDisplay();
      }
   }

   // MÉTODO PARA CALCULAR O COSSENO
   cos() {
      try {
          const result = Math.cos(eval(this.displayValue));
          this.displayValue = result.toString();
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA CALCULAR A FUNÇÃO EXPONENCIAL
  exp() {
      try {
          const result = Math.exp(eval(this.displayValue));
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA OBTENÇÃO DO VALOR DE PI
  pi() {
      this.displayValue += Math.PI.toString();
      this.updateDisplay();
  }

  // MÉTODO PARA CALCULAR O LOGARITMO NATURAL (LN)
  ln() {
      try {
          const result = Math.log(eval(this.displayValue));
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA CALCULAR O LOGARITMO NA BASE 10 (LOG10)
  log() {
      try {
          const result = Math.log10(eval(this.displayValue));
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA CALCULAR A TANGENTE
  tan() {
      try {
          const result = Math.tan(eval(this.displayValue));
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA CALCULAR A RAIZ QUADRADA (SQRT)
  sqrt() {
      try {
          const result = Math.sqrt(eval(this.displayValue));
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA CALCULAR O FATORIAL
  fact() {
      try {
          const num = parseInt(eval(this.displayValue));
          if (num < 0) {
              throw new Error("Número negativo não possui fatorial definido.");
          }
          let result = 1;
          for (let i = 2; i <= num; i++) {
              result *= i;
          }
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }

  // MÉTODO PARA CALCULAR A POTÊNCIA
  pow() {
      try {
          const result = Math.pow(...eval(this.displayValue.split('^').map(Number)));
          this.displayValue = result.toString(); 
          this.updateDisplay();
      } catch (error) {
          this.displayValue = "Error";
          this.updateDisplay();
      }
  }
}

// INSTÂNCIANDO O OBJETO
const calc = new Calculator();