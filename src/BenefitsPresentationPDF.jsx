import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight, Calculator, Presentation } from 'lucide-react';

export default function BenefitsPresentationPDF() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [employeeCount, setEmployeeCount] = useState('');
  const [currentPlanMonthlyCost, setCurrentPlanMonthlyCost] = useState('');
  const [currentPlanEmployerPayPercentage, setCurrentPlanEmployerPayPercentage] = useState('');
  const [employerPayPercentage, setEmployerPayPercentage] = useState('');
  
  const [currentPlanBenefits, setCurrentPlanBenefits] = useState({
    disability: false,
    criticalIllness: false,
    extendedHealth: false,
    addD: false,
    lifeInsurance: false
  });
  
  const [ourPlanBenefits, setOurPlanBenefits] = useState({
    disability: { enabled: false, amount: '', name: 'Disability - On and Off the Job' },
    criticalIllness: { enabled: false, amount: '', name: 'Critical Illness - Lifetime Coverage' },
    hsa: { enabled: false, amount: '', name: 'Health Spending Account', utilization: '' },
    addD: { enabled: false, amount: '', name: 'AD&D' },
    lifeInsurance: { enabled: false, amount: '', name: 'Life Insurance' }
  });

  const generatePDF = () => {
    window.print();
  };

  const slides = [
    {
      title: "Group Benefits Solution",
      subtitle: "HSA Portal with 24/7 Disability & Critical Illness Insurance",
      bullets: [
        "Flexible Health Spending Accounts",
        "24/7 Disability Coverage",
        "Critical Illness with Return of Premium",
        "Predictable Costs for Employers"
      ],
      color: "from-blue-600 to-indigo-700"
    },
    {
      title: "Key Benefits Overview",
      bullets: [
        "Health Spending Account - Tax-advantaged, flexible coverage",
        "Disability Insurance - On and off the job protection",
        "Critical Illness - Lump-sum payouts + 100% premium return",
        "AD&D & Life Insurance - Comprehensive protection",
        "User-friendly portal with 24/7 support"
      ],
      color: "from-purple-600 to-indigo-700"
    },
    {
      title: "Employer Advantages",
      bullets: [
        "Predictable budgeting - No surprise premium spikes",
        "Cost control - Fund HSAs as needed",
        "Employee retention - Premium refunds as loyalty bonuses",
        "Flexible surplus allocation - Bonuses, RRSPs, wages, team trips",
        "Tax advantages for both employer and employees"
      ],
      color: "from-emerald-600 to-teal-700"
    },
    {
      title: "Your Custom Plan Comparison",
      subtitle: "Let's build your solution",
      showCalculatorPrompt: true,
      color: "from-orange-600 to-red-600"
    }
  ];

  const toggleOurBenefit = (key) => {
    setOurPlanBenefits(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const toggleCurrentBenefit = (key) => {
    setCurrentPlanBenefits(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateBenefitAmount = (key, value) => {
    setOurPlanBenefits(prev => ({
      ...prev,
      [key]: { ...prev[key], amount: value === '' ? '' : parseFloat(value) || 0 }
    }));
  };

  const updateHsaUtilization = (value) => {
    setOurPlanBenefits(prev => ({
      ...prev,
      hsa: { ...prev.hsa, utilization: value === '' ? '' : parseFloat(value) || 0 }
    }));
  };

  const ourPlanTotal = Object.entries(ourPlanBenefits)
    .filter(([_, b]) => b.enabled)
    .reduce((sum, [key, b]) => {
      const amount = typeof b.amount === 'string' ? 0 : b.amount;
      if (key === 'hsa' && b.utilization !== undefined) {
        const util = typeof b.utilization === 'string' ? 0 : b.utilization;
        return sum + (amount * (util / 100));
      }
      return sum + amount;
    }, 0);
  
  const empCount = typeof employeeCount === 'string' ? 0 : employeeCount;
  const currCost = typeof currentPlanMonthlyCost === 'string' ? 0 : currentPlanMonthlyCost;
  const employerPct = typeof employerPayPercentage === 'string' ? 0 : employerPayPercentage;
  const employeePct = 100 - employerPct;
  
  const currentPlanEmployerPct = typeof currentPlanEmployerPayPercentage === 'string' ? 0 : currentPlanEmployerPayPercentage;
  const currentPlanEmployeePct = 100 - currentPlanEmployerPct;
  
  const hasOurPlanValues = Object.values(ourPlanBenefits).some(b => 
    b.enabled && (typeof b.amount === 'number' ? b.amount > 0 : b.amount !== '')
  );
  
  const ourPlanAnnual = ourPlanTotal * empCount * 12;
  const currentPlanAnnual = currCost * empCount * 12;
  const savings = currentPlanAnnual - ourPlanAnnual;
  const savingsPercentage = currentPlanAnnual > 0 ? ((savings / currentPlanAnnual) * 100).toFixed(1) : 0;
  
  const currentPlanEmployerCostMonthly = currCost * (currentPlanEmployerPct / 100);
  const currentPlanEmployeeCostMonthly = currCost * (currentPlanEmployeePct / 100);
  const currentPlanEmployerCostAnnual = currentPlanEmployerCostMonthly * empCount * 12;
  const currentPlanEmployeeCostAnnual = currentPlanEmployeeCostMonthly * empCount * 12;
  
  const employerCostMonthly = ourPlanTotal * (employerPct / 100);
  const employeeCostMonthly = ourPlanTotal * (employeePct / 100);
  const employerCostAnnual = employerCostMonthly * empCount * 12;
  const employeeCostAnnual = employeeCostMonthly * empCount * 12;
  
  const criticalIllnessAmount = typeof ourPlanBenefits.criticalIllness.amount === 'string' ? 0 : ourPlanBenefits.criticalIllness.amount;
  const criticalIllnessRetentionValue = ourPlanBenefits.criticalIllness.enabled 
    ? criticalIllnessAmount * empCount * 12
    : 0;

  const comparisonData = [
    { name: 'Current Plan', cost: currentPlanAnnual },
    { name: 'Our Plan', cost: ourPlanAnnual }
  ];

  const breakdownData = Object.entries(ourPlanBenefits)
    .filter(([_, benefit]) => benefit.enabled)
    .map(([key, benefit]) => {
      const amount = typeof benefit.amount === 'string' ? 0 : benefit.amount;
      const effectiveAmount = key === 'hsa' && benefit.utilization !== undefined
        ? amount * ((typeof benefit.utilization === 'string' ? 0 : benefit.utilization) / 100)
        : amount;
      
      return {
        name: benefit.name,
        value: effectiveAmount * empCount * 12
      };
    });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const currentSlideData = slides[currentSlide];

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="h-screen bg-gray-900 flex flex-col overflow-hidden no-print">
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-white font-semibold">Group Benefits Presentation</h1>
            <span className="text-gray-400 text-sm">Slide {currentSlide + 1} of {slides.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            {showCalculator && (
              <button
                onClick={generatePDF}
                className="px-4 py-2 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700"
              >
                📄 Generate PDF
              </button>
            )}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showCalculator 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {showCalculator ? <Presentation className="inline w-4 h-4 mr-2" /> : <Calculator className="inline w-4 h-4 mr-2" />}
              {showCalculator ? 'Show Presentation' : 'Show Calculator'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {showCalculator ? (
            <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex">
              <div className="w-96 bg-white shadow-xl overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Cost Calculator</h2>
                  <p className="text-sm text-gray-600 mb-6">Interactive Plan Comparison</p>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Employees</label>
                    <input
                      type="number"
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg font-semibold"
                    />
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Current Plan</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Cost/Individual</label>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">$</span>
                        <input
                          type="number"
                          value={currentPlanMonthlyCost}
                          onChange={(e) => setCurrentPlanMonthlyCost(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg font-semibold"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Cost Split</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-20">Employer:</span>
                          <input
                            type="number"
                            value={currentPlanEmployerPayPercentage}
                            onChange={(e) => setCurrentPlanEmployerPayPercentage(e.target.value === '' ? '' : Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                            min="0"
                            max="100"
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <span className="ml-1 text-xs text-gray-500">%</span>
                          <span className="ml-3 text-sm font-semibold text-gray-700">${currentPlanEmployerCostMonthly.toFixed(2)}/mo</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-20">Employee:</span>
                          <span className="w-16 px-2 py-1 text-sm text-gray-700">{currentPlanEmployeePct.toFixed(0)}</span>
                          <span className="ml-1 text-xs text-gray-500">%</span>
                          <span className="ml-3 text-sm font-semibold text-gray-700">${currentPlanEmployeeCostMonthly.toFixed(2)}/mo</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Coverage Includes:</label>
                      <div className="space-y-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPlanBenefits.disability}
                            onChange={() => toggleCurrentBenefit('disability')}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Disability</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPlanBenefits.criticalIllness}
                            onChange={() => toggleCurrentBenefit('criticalIllness')}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Critical Illness</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPlanBenefits.extendedHealth}
                            onChange={() => toggleCurrentBenefit('extendedHealth')}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Extended Health</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPlanBenefits.addD}
                            onChange={() => toggleCurrentBenefit('addD')}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">AD&D</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPlanBenefits.lifeInsurance}
                            onChange={() => toggleCurrentBenefit('lifeInsurance')}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Life Insurance</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Our Recommended Plan</h3>
                    <div className="space-y-3">
                      {Object.entries(ourPlanBenefits).map(([key, benefit]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-3">
                          <label className="flex items-center cursor-pointer mb-2">
                            <input
                              type="checkbox"
                              checked={benefit.enabled}
                              onChange={() => toggleOurBenefit(key)}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">{benefit.name}</span>
                          </label>
                          <div className="flex items-center ml-6">
                            <span className="text-gray-500 text-sm mr-1">$</span>
                            <input
                              type="number"
                              value={benefit.amount}
                              onChange={(e) => updateBenefitAmount(key, e.target.value)}
                              disabled={!benefit.enabled}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded disabled:bg-gray-200"
                            />
                            <span className="ml-2 text-xs text-gray-500">/month</span>
                          </div>
                          {key === 'hsa' && benefit.enabled && (
                            <div className="flex items-center ml-6 mt-2">
                              <span className="text-xs text-gray-600 mr-2">Avg. Utilization:</span>
                              <input
                                type="number"
                                value={benefit.utilization}
                                onChange={(e) => updateHsaUtilization(e.target.value)}
                                min="0"
                                max="100"
                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                              <span className="ml-1 text-xs text-gray-500">%</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-blue-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-gray-700">Monthly/Employee</span>
                        <span className="text-xl font-bold text-blue-600">${(ourPlanTotal || 0).toFixed(2)}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Cost Split</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-600 w-20">Employer:</span>
                            <input
                              type="number"
                              value={employerPayPercentage}
                              onChange={(e) => setEmployerPayPercentage(e.target.value === '' ? '' : Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                              min="0"
                              max="100"
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <span className="ml-1 text-xs text-gray-500">%</span>
                            <span className="ml-3 text-sm font-semibold text-gray-700">${employerCostMonthly.toFixed(2)}/mo</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-600 w-20">Employee:</span>
                            <span className="w-16 px-2 py-1 text-sm text-gray-700">{employeePct.toFixed(0)}</span>
                            <span className="ml-1 text-xs text-gray-500">%</span>
                            <span className="ml-3 text-sm font-semibold text-gray-700">${employeeCostMonthly.toFixed(2)}/mo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Current Plan</div>
                    <div className="text-3xl font-bold text-gray-800">${currentPlanAnnual.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Annual Cost</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Our Plan</div>
                    <div className="text-3xl font-bold text-blue-600">${ourPlanAnnual.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Annual Cost</div>
                  </div>
                  {hasOurPlanValues ? (
                    <div className={`bg-white rounded-lg shadow-lg p-6 ${savings >= 0 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Savings</div>
                      <div className={`text-3xl font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(savings).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{savingsPercentage}% {savings >= 0 ? 'reduction' : 'increase'}</div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-300">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Savings</div>
                      <div className="text-2xl font-bold text-gray-400">—</div>
                      <div className="text-xs text-gray-400 mt-1">Configure plan to calculate</div>
                    </div>
                  )}
                </div>

                {hasOurPlanValues && employerPayPercentage !== '' && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-600 uppercase mb-3">Our Recommended Plan - Cost Split</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="text-xs font-semibold uppercase mb-1 opacity-90">Employer Pays ({employerPct.toFixed(0)}%)</div>
                        <div className="text-3xl font-bold">${employerCostAnnual.toLocaleString()}</div>
                        <div className="text-xs mt-1 opacity-90">Annual | ${employerCostMonthly.toFixed(2)}/employee/month</div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                        <div className="text-xs font-semibold uppercase mb-1 opacity-90">Employee Pays ({employeePct.toFixed(0)}%)</div>
                        <div className="text-3xl font-bold">${employeeCostAnnual.toLocaleString()}</div>
                        <div className="text-xs mt-1 opacity-90">Annual | ${employeeCostMonthly.toFixed(2)}/employee/month</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentPlanMonthlyCost !== '' && currentPlanEmployerPayPercentage !== '' && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-600 uppercase mb-3">Current Plan - Cost Split</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg shadow-lg p-6 text-white">
                        <div className="text-xs font-semibold uppercase mb-1 opacity-90">Employer Pays ({currentPlanEmployerPct.toFixed(0)}%)</div>
                        <div className="text-3xl font-bold">${currentPlanEmployerCostAnnual.toLocaleString()}</div>
                        <div className="text-xs mt-1 opacity-90">Annual | ${currentPlanEmployerCostMonthly.toFixed(2)}/employee/month</div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg shadow-lg p-6 text-white">
                        <div className="text-xs font-semibold uppercase mb-1 opacity-90">Employee Pays ({currentPlanEmployeePct.toFixed(0)}%)</div>
                        <div className="text-3xl font-bold">${currentPlanEmployeeCostAnnual.toLocaleString()}</div>
                        <div className="text-xs mt-1 opacity-90">Annual | ${currentPlanEmployeeCostMonthly.toFixed(2)}/employee/month</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Annual Cost Comparison</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Bar dataKey="cost" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Our Plan - Cost Breakdown</h3>
                    {breakdownData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={breakdownData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {breakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-gray-400">
                        Select benefits to see breakdown
                      </div>
                    )}
                  </div>
                </div>

                {hasOurPlanValues && (
                  savings >= 0 ? (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1">💰 Potential Annual Savings</h3>
                          <p className="text-sm opacity-90">Save ${empCount > 0 ? (savings / empCount).toFixed(2) : '0.00'} per employee per year</p>
                        </div>
                        <div className="text-right">
                          <div className="text-5xl font-bold">${savings.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1">⚠️ Cost Increase</h3>
                          <p className="text-sm opacity-90">Additional ${empCount > 0 ? Math.abs(savings / empCount).toFixed(2) : '0.00'} per employee per year</p>
                        </div>
                        <div className="text-right">
                          <div className="text-5xl font-bold">${Math.abs(savings).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {ourPlanBenefits.criticalIllness.enabled && criticalIllnessRetentionValue > 0 && (
                  <div className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1">🎁 Employee Retention Value</h3>
                        <p className="text-sm opacity-90">Critical Illness premiums accumulating annually (100% return)</p>
                        <p className="text-xs opacity-80 mt-1">${empCount > 0 ? (criticalIllnessRetentionValue / empCount).toFixed(2) : '0.00'} per employee per year</p>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-bold">${criticalIllnessRetentionValue.toLocaleString()}</div>
                        <div className="text-sm opacity-90 mt-1">Loyalty Bonus</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`h-full bg-gradient-to-br ${currentSlideData.color} p-12 flex flex-col justify-center items-center text-white relative`}>
              <div className="max-w-4xl w-full">
                <h1 className="text-6xl font-bold mb-6">{currentSlideData.title}</h1>
                {currentSlideData.subtitle && (
                  <p className="text-3xl opacity-90 mb-12">{currentSlideData.subtitle}</p>
                )}
                
                {currentSlideData.bullets && (
                  <div className="space-y-6">
                    {currentSlideData.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-3xl mr-6">•</span>
                        <p className="text-3xl leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>
                )}

                {currentSlideData.showCalculatorPrompt && (
                  <div className="mt-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-10">
                    <div className="text-center">
                      <p className="text-2xl mb-6">Click below to build your custom solution</p>
                      <button
                        onClick={() => setShowCalculator(true)}
                        className="bg-white text-gray-900 px-12 py-5 rounded-xl text-2xl font-bold hover:bg-gray-100 transition-colors shadow-2xl"
                      >
                        Open Calculator
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {!showCalculator && (
          <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>
            
            <div className="flex space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-8' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Print-only version */}
      <div className="print-only p-8 bg-white text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">Group Benefits Comparison Report</h1>
        <p className="text-center text-gray-600 mb-8">Generated: {new Date().toLocaleDateString()}</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Employee Count</h2>
          <p className="text-lg">Number of Employees: <strong>{empCount}</strong></p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Current Plan</h2>
          <p>Monthly Cost per Employee: <strong>${currCost.toFixed(2)}</strong></p>
          <p>Annual Total Cost: <strong>${currentPlanAnnual.toLocaleString()}</strong></p>
          {currentPlanEmployerPayPercentage !== '' && (
            <>
              <p className="mt-2">Cost Split:</p>
              <ul className="ml-6">
                <li>Employer Pays ({currentPlanEmployerPct.toFixed(0)}%): <strong>${currentPlanEmployerCostAnnual.toLocaleString()}/year</strong></li>
                <li>Employee Pays ({currentPlanEmployeePct.toFixed(0)}%): <strong>${currentPlanEmployeeCostAnnual.toLocaleString()}/year</strong></li>
              </ul>
            </>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Our Recommended Plan</h2>
          <p>Monthly Cost per Employee: <strong>${ourPlanTotal.toFixed(2)}</strong></p>
          <p>Annual Total Cost: <strong>${ourPlanAnnual.toLocaleString()}</strong></p>
          {employerPayPercentage !== '' && (
            <>
              <p className="mt-2">Cost Split:</p>
              <ul className="ml-6">
                <li>Employer Pays ({employerPct.toFixed(0)}%): <strong>${employerCostAnnual.toLocaleString()}/year</strong></li>
                <li>Employee Pays ({employeePct.toFixed(0)}%): <strong>${employeeCostAnnual.toLocaleString()}/year</strong></li>
              </ul>
            </>
          )}
          <p className="mt-4">Benefits Included:</p>
          <ul className="ml-6">
            {Object.entries(ourPlanBenefits).filter(([_, b]) => b.enabled).map(([key, benefit]) => {
              const amount = typeof benefit.amount === 'string' ? 0 : benefit.amount;
              return (
                <li key={key}>
                  {benefit.name}: <strong>${amount.toFixed(2)}/month</strong>
                  {key === 'hsa' && benefit.utilization && ` (${benefit.utilization}% utilization)`}
                </li>
              );
            })}
          </ul>
        </div>

        {hasOurPlanValues && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Savings Analysis</h2>
            <p className="text-2xl font-bold" style={{color: savings >= 0 ? 'green' : 'red'}}>
              {savings >= 0 ? 'Annual Savings' : 'Annual Cost Increase'}: ${Math.abs(savings).toLocaleString()}
            </p>
            <p>Per Employee: ${empCount > 0 ? (savings / empCount).toFixed(2) : '0.00'}/year</p>
            <p>Percentage Difference: {savingsPercentage}% {savings >= 0 ? 'reduction' : 'increase'}</p>
          </div>
        )}

        {ourPlanBenefits.criticalIllness.enabled && criticalIllnessRetentionValue > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Employee Retention Value</h2>
            <p className="text-2xl font-bold" style={{color: 'purple'}}>
              Critical Illness Premium Return: ${criticalIllnessRetentionValue.toLocaleString()}
            </p>
            <p>Per Employee: ${empCount > 0 ? (criticalIllnessRetentionValue / empCount).toFixed(2) : '0.00'}/year</p>
            <p className="text-sm text-gray-600 mt-2">Note: 100% of Critical Illness premiums returned as loyalty bonuses</p>
          </div>
        )}
      </div>
    </>
  );
}