// =====================================================================
// Banco de preguntas
// Para modificar el cuestionario, edita este arreglo.
// "correcta" es el índice (0-3) de la opción correcta.
// =====================================================================
const preguntas = [
  {
    texto: "¿Qué es un agente de inteligencia artificial?",
    opciones: [
      "Un programa que solo ejecuta instrucciones fijas sin tomar decisiones",
      "Un sistema que percibe su entorno mediante sensores y actúa sobre él mediante actuadores para alcanzar objetivos",
      "Una base de datos que almacena información de usuarios",
      "Un dispositivo físico que siempre necesita un operador humano"
    ],
    correcta: 1,
    explicacion: "Un agente de IA percibe su entorno con sensores, procesa la información y actúa con actuadores para lograr sus objetivos, decidiendo por sí mismo qué hacer."
  },
  {
    texto: "¿Qué característica permite a un agente operar sin intervención humana constante?",
    opciones: ["Reactividad", "Capacidad social", "Autonomía", "Proactividad"],
    correcta: 2,
    explicacion: "La autonomía es la capacidad del agente de funcionar sin que una persona tenga que intervenir continuamente."
  },
  {
    texto: "¿Cuál es el orden correcto del ciclo de funcionamiento de un agente de IA?",
    opciones: [
      "Acción → Percepción → Razonamiento",
      "Razonamiento → Acción → Percepción",
      "Percepción → Acción → Razonamiento",
      "Percepción → Razonamiento → Acción"
    ],
    correcta: 3,
    explicacion: "El agente primero percibe el entorno, luego razona para decidir qué hacer y finalmente actúa; después el ciclo se repite."
  },
  {
    texto: "¿Qué componente permite a un agente ejecutar acciones sobre su entorno?",
    opciones: ["Actuadores", "Sensores", "Memoria", "Objetivos"],
    correcta: 0,
    explicacion: "Los actuadores (motores, pantallas, envío de mensajes, etc.) son los que ejecutan las acciones. Los sensores, en cambio, reciben información."
  },
  {
    texto: "¿Qué tipo de agente actúa solo según la percepción actual usando reglas condición–acción y sin memoria?",
    opciones: [
      "Agente basado en objetivos",
      "Agente reactivo simple",
      "Agente de aprendizaje",
      "Agente basado en modelos"
    ],
    correcta: 1,
    explicacion: "El agente reactivo simple responde únicamente a lo que percibe en ese momento con reglas condición–acción, como un termostato."
  },
  {
    texto: "¿Qué tipo de agente elige la acción que maximiza una función de utilidad?",
    opciones: [
      "Agente reactivo simple",
      "Agente basado en modelos",
      "Agente basado en utilidad",
      "Agente basado en objetivos"
    ],
    correcta: 2,
    explicacion: "El agente basado en utilidad busca el mejor resultado posible, no solo uno aceptable, maximizando su función de utilidad."
  },
  {
    texto: "¿Qué significa que un agente sea proactivo?",
    opciones: [
      "Que solo responde cuando ocurre un cambio en el entorno",
      "Que se comunica con otros agentes",
      "Que almacena experiencias pasadas",
      "Que toma la iniciativa para cumplir sus objetivos"
    ],
    correcta: 3,
    explicacion: "La proactividad implica tomar la iniciativa para alcanzar sus metas, no limitarse a reaccionar (eso sería reactividad)."
  },
  {
    texto: "¿Cuál de los siguientes es un ejemplo real de agente de IA que funciona en el hogar de forma autónoma?",
    opciones: [
      "Una aspiradora robot como Roomba",
      "Una calculadora de bolsillo",
      "Un interruptor de luz manual",
      "Una hoja de cálculo vacía"
    ],
    correcta: 0,
    explicacion: "La aspiradora robot detecta obstáculos y recorre el hogar limpiando de forma autónoma, por lo que es un agente de IA."
  },
  {
    texto: "¿Cuál de las siguientes es una desventaja de los agentes de IA?",
    opciones: [
      "Pueden trabajar 24/7 sin cansancio",
      "Procesan grandes volúmenes de datos con rapidez",
      "Dependen de la calidad de los datos y pueden tomar decisiones sesgadas",
      "Automatizan tareas repetitivas"
    ],
    correcta: 2,
    explicacion: "Si los datos con los que trabaja un agente están sesgados, sus decisiones también lo estarán. Las demás opciones son ventajas."
  },
  {
    texto: "¿Qué tipo de agente mejora su rendimiento con el tiempo a partir de la experiencia y la retroalimentación?",
    opciones: [
      "Agente reactivo simple",
      "Agente de aprendizaje",
      "Agente basado en utilidad",
      "Agente basado en modelos"
    ],
    correcta: 1,
    explicacion: "El agente de aprendizaje utiliza la experiencia y la retroalimentación para mejorar su desempeño con el tiempo."
  }
];

// =====================================================================
// Referencias al DOM
// =====================================================================
const contenedorPreguntas = document.getElementById("preguntas");
const formulario = document.getElementById("formulario");
const aviso = document.getElementById("aviso");
const seccionResultados = document.getElementById("resultados");
const puntuacion = document.getElementById("puntuacion");
const detalle = document.getElementById("detalle");
const botonReintentar = document.getElementById("reintentar");

// =====================================================================
// Mostrar preguntas
// =====================================================================
function mostrarPreguntas() {
  contenedorPreguntas.innerHTML = preguntas.map((p, i) => `
    <fieldset class="pregunta">
      <legend>${i + 1}. ${p.texto}</legend>
      ${p.opciones.map((op, j) => `
        <label class="opcion">
          <input type="radio" name="p${i}" value="${j}">
          <span>${op}</span>
        </label>
      `).join("")}
    </fieldset>
  `).join("");
}

// =====================================================================
// Calificar
// =====================================================================
function obtenerRespuesta(i) {
  const marcada = formulario.querySelector(`input[name="p${i}"]:checked`);
  return marcada ? Number(marcada.value) : null;
}

function calificar(evento) {
  evento.preventDefault();

  const respuestas = preguntas.map((_, i) => obtenerRespuesta(i));
  const sinResponder = respuestas.filter(r => r === null).length;

  if (sinResponder > 0) {
    aviso.textContent = `Te falta responder ${sinResponder} pregunta(s).`;
    aviso.hidden = false;
    return;
  }
  aviso.hidden = true;

  let aciertos = 0;
  detalle.innerHTML = preguntas.map((p, i) => {
    const esCorrecta = respuestas[i] === p.correcta;
    if (esCorrecta) aciertos++;
    return `
      <div class="resultado ${esCorrecta ? "bien" : "mal"}">
        <h4>${esCorrecta ? "✔" : "✘"} ${i + 1}. ${p.texto}</h4>
        <p><strong>Tu respuesta:</strong> ${p.opciones[respuestas[i]]}</p>
        ${esCorrecta ? "" : `<p><strong>Respuesta correcta:</strong> ${p.opciones[p.correcta]}</p>`}
        <p class="explicacion">${p.explicacion}</p>
      </div>
    `;
  }).join("");

  const total = preguntas.length;
  const porcentaje = Math.round((aciertos / total) * 100);
  puntuacion.innerHTML = `
    <p class="nota">${aciertos} / ${total}</p>
    <p>${porcentaje}% de aciertos</p>
    <p>Correctas: ${aciertos} · Incorrectas: ${total - aciertos}</p>
    <p><strong>${mensajeFinal(porcentaje)}</strong></p>
  `;

  formulario.querySelectorAll("input").forEach(input => input.disabled = true);
  seccionResultados.hidden = false;
  seccionResultados.scrollIntoView({ behavior: "smooth" });
}

function mensajeFinal(porcentaje) {
  if (porcentaje === 100) return "¡Excelente! Dominas el tema.";
  if (porcentaje >= 70) return "¡Muy bien! Tienes buen conocimiento.";
  if (porcentaje >= 50) return "Bien, pero puedes repasar algunos temas.";
  return "Te recomendamos volver a leer la investigación.";
}

// =====================================================================
// Reintentar
// =====================================================================
function reiniciar() {
  formulario.reset();
  formulario.querySelectorAll("input").forEach(input => input.disabled = false);
  seccionResultados.hidden = true;
  document.getElementById("cuestionario").scrollIntoView({ behavior: "smooth" });
}

// =====================================================================
// Inicio
// =====================================================================
formulario.addEventListener("submit", calificar);
botonReintentar.addEventListener("click", reiniciar);
mostrarPreguntas();
