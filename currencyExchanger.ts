
import inquirer from "inquirer";

const currencies = ["USD", "EUR","PKR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY","SEK",
 "NZD", "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "RUB", "INR"];


 const fetchExchangeRates = async (baseCurrency:string):  Promise<{ [key: string]: number }> =>{
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
        throw new Error("Error fetching exchange rates from API");
    }
    const data = await response.json()
    return data.rates
  } catch (error) {
           throw new Error("Error fetching exchange rates from API");
    }

 }

    const exchangeCurrency =async () => {
    const answer = await inquirer.prompt([
           {
            type: "input",
            name: "amount",
            message: "Enter the amount to convert:"
           },
           {
            type: "list",
            name: "fromCurrency",
            message: "Select the currency to convert from:",
            choices: currencies 
           },
           {
            type: "list",
            name: "toCurrency",
            message: "Select the currency to convert to:",
            choices: currencies 
           }

          ])
          const amount =parseFloat(answer.amount)
          const fromCurrency = answer.fromCurrency
          const toCurrency = answer.toCurrency

          const exchangeRates = await fetchExchangeRates (fromCurrency)
          const convertedAmount = amount * exchangeRates[toCurrency];

        
          console.log(`${amount} ${fromCurrency} equale ${convertedAmount.toFixed(2)} ${toCurrency}`)
         }
         exchangeCurrency()


