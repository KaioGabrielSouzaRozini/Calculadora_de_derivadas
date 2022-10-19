var answear = ``;
var multiplication = true;
var division = true;
var b2;

var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");

pincel.fillStyle = "lightgrey";
pincel.fillRect(0, 0, 1200, 800);
pincel.moveTo(600, 800);
pincel.lineTo(600, -800);
pincel.stroke();
pincel.moveTo(1200, 400);
pincel.lineTo(-1200, 400);
pincel.stroke();

function showAnswer() {
  answear = ``;
  var answearDerivative = document.getElementById("input-derivative").value;
  identifiesDerivative(answearDerivative);
  const ul = document.getElementById("derivate-list");
  const li = document.createElement("li");
  li.innerText = `A derivada de ${answearDerivative} é : ${answear}`;
  ul.appendChild(li);
  document.getElementById("input-derivative").value = "";
}
function identifiesDerivative(number) {
  if (number != "?") {
    var number1;
    var numberRest;
    var indexSubtraction = number.indexOf("-");
    var indexAddition = number.indexOf("+");

    if (indexSubtraction < indexAddition) {
      if (indexSubtraction == -1) {
        number1 = number.slice(0, indexAddition);
        numberRest = number.slice(indexAddition + 2);
        answear += derivative(number1);
        answear += "+ ";
      } else {
        number1 = number.slice(0, indexSubtraction);
        numberRest = number.slice(indexSubtraction + 2);
        answear += derivative(number1);
        answear += "- ";
      }
    } else {
      if (indexAddition == -1) {
        if (indexSubtraction != -1) {
          number1 = number.slice(0, indexSubtraction);
          numberRest = number.slice(indexSubtraction + 2);
          answear += derivative(number1);
          answear += "- ";
        } else {
          number1 = number.slice(0);
          numberRest = "?";
          answear += derivative(number1);
          answear += "";
        }
      } else {
        number1 = number.slice(0, indexAddition);
        numberRest = number.slice(indexAddition + 2);
        answear += derivative(number1);
        answear += "+ ";
      }
    }
    if (number != "") {
      identifiesDerivative(numberRest);
    } else {
      stop;
    }
  }
}

function derivative(number) {
  //indentifica os elementos que não são numeros na derivada
  var indexA = number.indexOf("x");
  var indexB = number.indexOf("^");
  var indexMultiplication = number.indexOf("*");
  var indexBar1 = number.indexOf("(");
  var indexBar2 = number.indexOf(")");
  var indexDivision = number.indexOf("/");
  var indexSpace = number.indexOf(" ");
  var a; //numero que multiplica o X
  var b; //X elevado a este numero
  var c; //B - 1
  var aDivision; //numero que multiplica o X só q da divisão
  var a2; //numero que multiplica o segundo X da equação
  var b2; //numero que eleva o segundo X da equação

  if (indexSpace != -1) {
    if (indexB != -1) {
      b = number.slice(indexB + 1, indexSpace);
      c = b - 1;
    } else {
      b = 1;
    }
  } else {
    if (indexB != -1) {
      b = number.slice(indexB + 1);
      c = b - 1;
    } else {
      b = 1;
    }
  }
  if (indexA != -1) {
    if (indexMultiplication != -1) {
      a = number.slice(indexBar1 + 1, indexA);

      var number1 = number.slice(indexBar1 + 1, indexMultiplication);
      var number2 = number.slice(indexMultiplication + 2, indexBar2);

      var indexBnumber2 = number2.indexOf("^");
      var indexAnumber2 = number2.indexOf("x");

      var indexXnumber1 = number1.indexOf("x");
      var indexXnumber2 = number2.indexOf("x");

      var derivadanumber1 = derivative(number1);
      var derivadanumber2 = derivative(number2);

      if (indexXnumber1 != -1 && indexXnumber2 != -1) {
        a2 = number2.slice(0, indexXnumber2);
        if (indexBnumber2 != -1) {
          b2 = number2.slice(indexB);
          b2 = parseInt(b2);
        } else {
          b2 = 1;
        }
        multiplication = false;
      }
    }
    if (indexDivision != -1) {
      a = number.slice(indexBar1 + 1, indexA);

      var number1 = number.slice(indexBar1 + 1, indexDivision);
      var number2 = number.slice(indexDivision + 2, indexBar2);

      var indexBnumber2 = number2.indexOf("^");
      var indexAnumber2 = number2.indexOf("x");

      var indexXnumber1 = number1.indexOf("x");
      var indexXnumber2 = number2.indexOf("x");

      var derivadanumber1 = derivative(number1);
      var derivadanumber2 = derivative(number2);

      if (indexAnumber2 == -1) {
        aDivision = number2;
      }

      if (indexXnumber1 != -1 && indexXnumber2 != -1) {
        a2 = number2.slice(0, indexAnumber2);
        if (indexBnumber2 != -1) {
          b2 = number2.slice(indexB);
          b2 = parseInt(b2);
        } else {
          b2 = 1;
        }

        division = false;
      }
    }
    if (division) {
      if (multiplication) {
        if (number[0] != "x") {
          a = number.slice(indexBar1 + 1, indexA);

          if (indexB == -1) {
            graph(a);
            return `${a} `;
          } else if (c != 0 && c != 1) {
            if (indexXnumber2 == -1) {
              graph(a, b, aDivision);
              return `${a / aDivision}x^${b - 1}`;
            } else {
              graph(a, b);
              return `${a * b}x^${b - 1} `;
            }
          } else if (c == 1) {
            graph(a, b);
            return `${a * b}x `;
          } else {
            graph(a);
            return `${a}x `;
          }
        } else if (indexB == -1) {
          graph(0);
          return `1 `;
        } else if (b.includes("x")) {
          b2 = derivative(b);
          if (b2 == 0) {
            b2 = 1;
          }
          graph(1, b2, 1, b);
          return `${1 * b2}x^${b} ln x`;
        } else {
          graph(1, b);
          return `${b}x^${b - 1} `;
        }
      } else {
        multiplication = true;
        graph(a * a2, b + b2);

        return `( ${derivadanumber1}* ${number2} + ${number1}* ${derivadanumber2}) `;
      }
    } else {
      division = true;
      graph(a / a2, b - b2);

      return `( ${derivadanumber1}* ${number2} - ${number1} * ${derivadanumber2} / (${number2})^2) `;
    }
  } else {
    graph(0);
    return `0 `;
  }
}

function graph(numberX = 1, eleveteX = 1, divisionX = 1, eleveteX2 = 1) {
  pincel.fillStyle = "lightgrey";
  pincel.fillRect(0, 0, 1200, 800);
  pincel.moveTo(600, 800);
  pincel.lineTo(600, -800);
  pincel.stroke();
  pincel.moveTo(1200, 400);
  pincel.lineTo(-1200, 400);
  pincel.stroke();
  for (var i = -1000; i < 1000; i++) {
    numberX = numberX / divisionX;
    var numeroElevado = Math.pow(i, eleveteX);
    if (eleveteX2 != 1) {
      numeroElevado = Math.pow(i, i * b2);
    }
    var y = (numeroElevado * numberX) / 10;
    var x = i * 6;
    pincel.fillStyle = "#05B548";
    pincel.fillRect(600 + x, 400, 5, -y);
  }
}

function showExemple() {
  const ul = document.getElementById("derivate-list");
  const li2 = document.createElement("li");
  li2.innerText = `As derivadas devem ser escritas da seguinte forma:
  2x^2 onde ^ = elevado a, e quando for fazer uma divisão
  ou multiplicação utilize das barras. ex: (2x^2 / 2x) ou (3x * 4x)`;
  ul.appendChild(li2);
}
