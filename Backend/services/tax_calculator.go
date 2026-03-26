package services

type TaxResult struct {
	GrossIncome       float64 `json:"gross_income"`
	ExpenseDeduction  float64 `json:"expense_deduction"`
	PersonalAllowance float64 `json:"personal_allowance"`
	NetIncome         float64 `json:"net_income"`
	TaxAmount         float64 `json:"tax_amount"`
	EffectiveRate     float64 `json:"effective_rate"`
}

type TaxBracket struct {
	Min  float64
	Max  float64
	Rate float64
}

var thaiBrackets = []TaxBracket{
	{Min: 0, Max: 150000, Rate: 0},
	{Min: 150000, Max: 300000, Rate: 0.05},
	{Min: 300000, Max: 500000, Rate: 0.10},
	{Min: 500000, Max: 750000, Rate: 0.15},
	{Min: 750000, Max: 1000000, Rate: 0.20},
	{Min: 1000000, Max: 2000000, Rate: 0.25},
	{Min: 2000000, Max: 5000000, Rate: 0.30},
	{Min: 5000000, Max: -1, Rate: 0.35}, // -1 = ไม่จำกัด
}

func CalculateThaiTax(grossIncome float64) TaxResult {
	expenseDeduction := grossIncome * 0.5
	if expenseDeduction > 100000 {
		expenseDeduction = 100000
	}

	personalAllowance := 60000.0

	netIncome := grossIncome - expenseDeduction - personalAllowance
	if netIncome < 0 {
		netIncome = 0
	}

	taxAmount := 0.0
	remaining := netIncome

	for _, bracket := range thaiBrackets {
		if remaining <= 0 {
			break
		}

		var taxableInBracket float64
		if bracket.Max == -1 {
			taxableInBracket = remaining
		} else {
			bracketSize := bracket.Max - bracket.Min

			if remaining > bracketSize {
				taxableInBracket = bracketSize
			} else {
				taxableInBracket = remaining
			}
		}

		taxAmount += taxableInBracket * bracket.Rate
		remaining -= taxableInBracket
	}

	effectiveRate := 0.0
	if grossIncome > 0 {
		effectiveRate = (taxAmount / grossIncome) * 100
	}

	return TaxResult{
		GrossIncome:       grossIncome,
		ExpenseDeduction:  expenseDeduction,
		PersonalAllowance: personalAllowance,
		NetIncome:         netIncome,
		TaxAmount:         taxAmount,
		EffectiveRate:     effectiveRate,
	}
}
