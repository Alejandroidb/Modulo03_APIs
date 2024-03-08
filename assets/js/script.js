// declaramos constantes a utilizar en nuestras funciones
const resultado = document.querySelector("#resultado");
const calculador = document.querySelector("#calcular");
let myChart
// funcion que nos convertira los montos del input dependiendo de las opciones
async function convertirMoneda() {
  try {
    const montoPesos = +document.querySelector("#monto").value; //monto ingresado por usuario
    const monedaSelect = document.querySelector("#moneda").value;//moneda por el cual se hara el cambio 
    const mindicadorUrl = `https://mindicador.cl/api/${monedaSelect}`;//API de donde se tomaran los datos para el cambio 
    const res = await fetch(mindicadorUrl); //traemos los datos de la api
    const data = await res.json();//transformamos los datos a json

    const tasaCambio = data.serie[0].valor; //datos que consideramos de la API
    const cambioDone = montoPesos / tasaCambio;//resultado del cambio entre el monto y la moneda

    resultado.textContent = `${cambioDone.toFixed(2)}`;// resultado se mostrara en html y solo se mostraran dos decimales

    destroyChart(); //eliminamos el grafico con datos de la ultima consulta
    getChart();// mostramos el grafico de la consulta actual

  } catch (error) { //en caso de no funcionar la api se maneja con una alerta al usuario
    alert(error.message);
  }
}

calculador.addEventListener("click", convertirMoneda);//evento que nos hara la conversion y nos traera el grafico dependiendo del input y select

function destroyChart() { //funcion que elimina el grafico consultado en caso de haber
  
  if (myChart) {
    myChart.destroy();
  }
}

async function getChartdata() {// funcion que nos aisla los datos que mostraremos en el grafico
  const monedaSelect = document.querySelector("#moneda").value;
  const mindicadorUrl = `https://mindicador.cl/api/${monedaSelect}`;
  const res = await fetch(mindicadorUrl);
  const data = await res.json();

  const primerFecha = data.serie.slice(0, 10); // obtenemosr solo los primeros 10 elementos
  const labels = primerFecha.map((data) => {  //datos a mostrar en eje x
    return data.fecha;
  });
  const datos = primerFecha.map((data) => { //datos a mostrar en eje y
    return Number(data.valor);
  });

  const datasets = [ //set de datos a mostrar en graficos
    {
      label: `${monedaSelect}`,
      borderColor: "rgb(255, 99, 132)",
      data: datos,
    }
  ];
  return { labels, datasets };
}

async function getChart() { //funcion que crea el grafico
  const data = await getChartdata();
  const config = {
    type: "line",
    data,
    options: {
      scales: {
        x: {
          type: 'category',
          labels: data.labels,
          ticks: {
            autoSkip: false,
            color: 'black'
          },
        },
        y: {
          beginAtZero: false,
        }
      }
    }
  };

  myChart = new Chart(document.getElementById("myChart"), config); //variable global que se utilizara
}
