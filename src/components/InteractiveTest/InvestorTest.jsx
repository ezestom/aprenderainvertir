import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: "Planeo iniciar el retiro de fondos de mi cartera dentro de:",
    options: [
      { text: "Menos de 3 años", points: 1 },
      { text: "Entre 3 y 5 años", points: 3 },
      { text: "Entre 6 y 10 años", points: 5 },
      { text: "Dentro de 11 o más años", points: 8 }
    ]
  },
  {
    id: 2,
    question: "A partir del momento en que decida empezar a retirar mis fondos, planeo retirarlos en:",
    options: [
      { text: "Menos de 2 años", points: 1 },
      { text: "Entre 2 y 5 años", points: 3 },
      { text: "Entre 6 y 10 años", points: 5 },
      { text: "Dentro de 11 o más años", points: 8 }
    ]
  },
  {
    id: 3,
    question: "Describiría mis conocimientos sobre inversiones como:",
    options: [
      { text: "Nulos", points: 1 },
      { text: "Limitados", points: 3 },
      { text: "Buenos", points: 6 },
      { text: "Muy buenos", points: 8 }
    ]
  },
  {
    id: 4,
    question: "Cuando invierto mi dinero, estoy:",
    options: [
      { text: "Mayormente preocupado por las pérdidas de valor", points: 1 },
      { text: "Preocupado por las pérdidas y ganancias", points: 4 },
      { text: "Mayormente preocupado por las ganancias", points: 8 }
    ]
  },
  {
    id: 5,
    question: "¿Qué tipo de inversiones realizas o has realizado con mayor frecuencia?",
    options: [
      { text: "Cajas de ahorro o plazo fijo", points: 1 },
      { text: "Bonos nacionales o fondos de bonos", points: 3 },
      { text: "Acciones o fondos de acciones", points: 6 },
      { text: "Acciones y/o bonos internacionales o fondos de inversión internacional", points: 8 }
    ]
  },
  {
    id: 6,
    question: "Si el mercado de acciones pierde el 25% de su valor y una acción que poseías también pierde el mismo porcentaje, ¿qué harías?",
    options: [
      { text: "Vender todas mis acciones para no perder más", points: 1 },
      { text: "Vender parte de mis acciones", points: 3 },
      { text: "No hacer nada y esperar que se recupere", points: 5 },
      { text: "Comprar más acciones aprovechando que están baratas", points: 8 }
    ]
  },
  {
    id: 7,
    question: "Considera la siguiente tabla de rentabilidades hipotéticas, ¿cuál elegirías?",
    options: [
      { text: "Inversión A: Rendimiento Promedio 7.2%, Mejor Caso 16.3%, Peor Caso -5.6%", points: 1 },
      { text: "Inversión B: Rendimiento Promedio 9.0%, Mejor Caso 25.0%, Peor Caso -12.1%", points: 3 },
      { text: "Inversión C: Rendimiento Promedio 10.4%, Mejor Caso 33.6%, Peor Caso -18.2%", points: 5 },
      { text: "Inversión D: Rendimiento Promedio 11.7%, Mejor Caso 42.8%, Peor Caso -24.0%", points: 7 },
      { text: "Inversión E: Rendimiento Promedio 12.5%, Mejor Caso 50.0%, Peor Caso -28.2%", points: 9 }
    ]
  }
];

export default function InvestorTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const handleSelectOption = (points) => {
    const newAnswers = { ...answers, [currentStep]: points };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setFinished(false);
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  };

  const getProfile = (score) => {
    if (score <= 18) {
      return {
        name: "Conservador",
        description: "Tu prioridad principal es preservar tu capital y minimizar el riesgo de pérdidas. Prefieres la estabilidad de rendimientos predecibles, aunque esto signifique aceptar menores ganancias a largo plazo.",
        allocation: [
          { name: "Cauciones Bursátiles / Plazo Fijo", percentage: 60, color: "bg-emerald-500" },
          { name: "Fondos de Renta Fija (Bonos Cortos)", percentage: 30, color: "bg-blue-500" },
          { name: "CEDEARs / Acciones Líderes", percentage: 10, color: "bg-amber-500" }
        ]
      };
    } else if (score <= 38) {
      return {
        name: "Moderado",
        description: "Buscas un equilibrio entre el crecimiento del capital y la preservación del mismo. Estás dispuesto a tolerar fluctuaciones moderadas de precios a corto plazo a cambio de mejores rendimientos potenciales en el mediano/largo plazo.",
        allocation: [
          { name: "CEDEARs (S&P 500, Dividendos)", percentage: 40, color: "bg-amber-500" },
          { name: "Obligaciones Negociables (ONs en USD)", percentage: 30, color: "bg-blue-500" },
          { name: "Cauciones y FCI de Liquidez", percentage: 30, color: "bg-emerald-500" }
        ]
      };
    } else {
      return {
        name: "Agresivo / Crecimiento",
        description: "Tu objetivo es maximizar el crecimiento del capital a largo plazo. Toleras una alta volatilidad y fluctuaciones severas del mercado de valores, entendiendo que el riesgo es necesario para batir a la inflación y generar retornos sustanciales.",
        allocation: [
          { name: "CEDEARs de Crecimiento y ETFs (SPY/QQQ)", percentage: 75, color: "bg-amber-500" },
          { name: "Cauciones o ONs (Liquidez Oportuna)", percentage: 15, color: "bg-blue-500" },
          { name: "Criptomonedas / Activos de Alta Volatilidad", percentage: 10, color: "bg-purple-500" }
        ]
      };
    }
  };

  const totalScore = calculateTotalScore();
  const profile = finished ? getProfile(totalScore) : null;
  const progressPercent = Math.round(((currentStep + (finished ? 1 : 0)) / QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 bg-white dark:bg-[#20252c] rounded-2xl shadow-xl transition-colors duration-300 border border-gray-100 dark:border-gray-800">
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {!finished ? (
        <div>
          {/* Question Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Pregunta {currentStep + 1} de {QUESTIONS.length}
            </span>
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                ← Atrás
              </button>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {QUESTIONS[currentStep].question}
          </h2>

          {/* Options Grid */}
          <div className="space-y-3">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.points)}
                className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-[#1a1f26] hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-gray-800 dark:text-gray-200 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="inline-flex p-3 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-4 text-3xl">
            📊
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Tu Perfil es: <span className="text-blue-600 dark:text-blue-400">{profile.name}</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Puntuación total: {totalScore} puntos
          </p>

          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            {profile.description}
          </p>

          {/* Asset Allocation Display */}
          <div className="mb-8 max-w-md mx-auto text-left">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
              Distribución de Cartera Recomendada:
            </h3>

            {/* Visual allocation bar */}
            <div className="w-full h-8 rounded-xl overflow-hidden flex mb-6 shadow-inner">
              {profile.allocation.map((asset, idx) => (
                <div
                  key={idx}
                  className={`${asset.color} h-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold transition-all duration-500`}
                  style={{ width: `${asset.percentage}%` }}
                  title={`${asset.name}: ${asset.percentage}%`}
                >
                  {asset.percentage}%
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {profile.allocation.map((asset, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${asset.color}`}></span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{asset.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{asset.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Repetir Test
            </button>
            <a
              href="/comenzar-a-invertir"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-lg shadow-blue-500/20 text-center w-full sm:w-auto"
            >
              Aprender cómo empezar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
