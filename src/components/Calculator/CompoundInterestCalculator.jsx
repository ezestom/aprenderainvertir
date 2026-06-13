import React, { useState } from 'react';

export default function CompoundInterestCalculator() {
  const [initialCapital, setInitialCapital] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);

  const calculateData = () => {
    const r = annualRate / 100 / 12;
    const n = years * 12;

    // Capital Inicial compuesto
    const fvInitial = initialCapital * Math.pow(1 + r, n);

    // Contribuciones mensuales compuestas
    let fvMonthly = 0;
    if (r > 0) {
      fvMonthly = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
      fvMonthly = monthlyContribution * n;
    }

    const totalFutureValue = fvInitial + fvMonthly;
    const totalInvested = initialCapital + (monthlyContribution * n);
    const totalInterest = Math.max(0, totalFutureValue - totalInvested);

    // Simular crecimiento año a año para el gráfico
    const yearlyBreakdown = [];
    for (let y = 1; y <= years; y++) {
      const months = y * 12;
      const fvInitialY = initialCapital * Math.pow(1 + r, months);
      let fvMonthlyY = 0;
      if (r > 0) {
        fvMonthlyY = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      } else {
        fvMonthlyY = monthlyContribution * months;
      }
      const totalY = fvInitialY + fvMonthlyY;
      const investedY = initialCapital + (monthlyContribution * months);
      const interestY = Math.max(0, totalY - investedY);

      yearlyBreakdown.push({
        year: y,
        invested: Math.round(investedY),
        interest: Math.round(interestY),
        total: Math.round(totalY)
      });
    }

    return {
      totalFutureValue: Math.round(totalFutureValue),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      yearlyBreakdown
    };
  };

  const { totalFutureValue, totalInvested, totalInterest, yearlyBreakdown } = calculateData();

  // Encontrar el valor máximo para escalar el gráfico
  const maxVal = yearlyBreakdown.length > 0 ? yearlyBreakdown[yearlyBreakdown.length - 1].total : 1;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-[#20252c] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="text-center mb-6">
        <span className="text-3xl">📈</span>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-2 mb-1">
          Calculadora de Interés Compuesto
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Simula cómo se acumula tu capital a lo largo del tiempo gracias al interés compuesto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Controls Section */}
        <div className="col-span-1 md:col-span-5 space-y-6">
          {/* Initial Capital */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Capital Inicial
              </label>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(initialCapital)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Monthly Contribution */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Aporte Mensual
              </label>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(monthlyContribution)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Annual Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Tasa Anual Estimada
              </label>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {annualRate}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-tight">
              (Ref: Histórico S&P 500 ~10% anual; Fondos de Bonos ~4-6% anual).
            </p>
          </div>

          {/* Investment Period */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Plazo (Años)
              </label>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {years} años
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {/* Total Accumulation */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
              <div className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                Total Acumulado
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-black text-blue-900 dark:text-blue-200">
                {formatCurrency(totalFutureValue)}
              </div>
            </div>

            {/* Total Invested */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <div className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Tu Capital
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200">
                {formatCurrency(totalInvested)}
              </div>
            </div>

            {/* Interest Earned */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
              <div className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                Intereses Ganados
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-black text-emerald-700 dark:text-emerald-300">
                {formatCurrency(totalInterest)}
              </div>
            </div>
          </div>

          {/* Simple Custom Bar Chart */}
          <div className="flex-grow flex flex-col justify-end bg-gray-50 dark:bg-[#1a1f26] p-4 rounded-xl border border-gray-100 dark:border-gray-800 min-h-[200px]">
            <div className="flex items-end justify-between gap-1 w-full h-[150px] px-2">
              {yearlyBreakdown.filter((_, idx) => {
                // Filtrar barras para no sobrecargar el gráfico en plazos largos
                if (years <= 15) return true;
                if (years <= 30) return idx % 2 === 0;
                return idx % 3 === 0;
              }).map((item, idx) => {
                const investHeight = (item.invested / maxVal) * 100;
                const interestHeight = (item.interest / maxVal) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-[102%] opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] p-2 rounded shadow-lg pointer-events-none transition-opacity duration-200 z-10 whitespace-nowrap">
                      <div>Año {item.year}</div>
                      <div className="text-gray-300">Inversión: {formatCurrency(item.invested)}</div>
                      <div className="text-emerald-400">Interés: {formatCurrency(item.interest)}</div>
                      <div className="font-bold border-t border-gray-700 mt-1 pt-1">Total: {formatCurrency(item.total)}</div>
                    </div>

                    <div className="w-full flex flex-col-reverse justify-start rounded-t overflow-hidden h-full max-h-full">
                      {/* Invested part (Gray/Blue) */}
                      <div 
                        className="bg-blue-600 dark:bg-blue-700 transition-all duration-300"
                        style={{ height: `${investHeight}%` }}
                      ></div>
                      {/* Interest part (Green) */}
                      <div 
                        className="bg-emerald-500 dark:bg-emerald-600 transition-all duration-300"
                        style={{ height: `${interestHeight}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1">
                      A{item.year}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-3 border-t border-gray-200 dark:border-gray-800 pt-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-600 dark:bg-blue-700 rounded-sm"></span>
                <span className="text-gray-600 dark:text-gray-400">Capital Aportado</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-emerald-500 dark:bg-emerald-600 rounded-sm"></span>
                <span className="text-gray-600 dark:text-gray-400">Efecto Interés Compuesto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
