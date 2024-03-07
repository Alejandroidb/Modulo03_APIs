const montoPesos = document.querySelector("#monto").value
const monedaSelect = document.querySelector("#moneda").value
const mindicadorUrl = `https://mindicador.cl/api/${monedaSelect}`
const resultado = document.querySelector("#resultado")
const calculador = document.querySelector("#calcular")

async function convertirMoneda() {
  try{
    const res = await fetch(mindicadorUrl);
    const data = await res.json();
    console.log(data);

const tasaCambio = data.serie[0].valor
const cambioDone = montoPesos / tasaCambio

resultado.textContent = `${cambioDone.toFixed(2)}`

  } catch (error) {
alert(error.message)
  }
}

calculador.addEventListener('click',convertirMoneda)