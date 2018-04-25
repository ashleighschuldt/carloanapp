import expect from 'expect';

// function tradeIn(purchasePrice, cashDown, tradeInValue, taxRate, payoff){
//     return purchasePrice - cashDown + ((purchasePrice-tradeInValue)*taxRate/100)-(tradeInValue - payoff)
// }

// function loanPay(amount, payments, interest){
//     return amount/((Math.pow((1+(interest/100/12)), payments)-1)/(interest/100/12*Math.pow((1+(interest/100/12)), payments)))
// }
// function interest(interest){
//     return interest/100/12
// }

// console.log(interest(6))

// function discount(interest, payments){
//     return (Math.pow((1+(interest/100/12)), payments)-1)/(interest/100/12*Math.pow((1+(interest/100/12)), payments))
// }

// console.log(tradeIn(30000, 0, 25000, 6.85, 20000));

// console.log(loanPay(100000, 360, 6))

// console.log(discount(6,360))

function noCar(none, purchasePrice, cashDown, taxRate){
    const amount = purchasePrice - cashDown + (purchasePrice*taxRate/100)
    return Number(amount.toFixed(2))
}

function tradeIn(tradeInValue, purchasePrice, cashDown, taxRate, payoff){
    const amount = purchasePrice - cashDown + ((purchasePrice-tradeInValue)*taxRate/100)-(tradeInValue - payoff)
    return Number(amount.toFixed(2))
}
function privateSell(privateSale, purchasePrice, cashDown, taxRate, payoff){
    const amount = purchasePrice - cashDown +(purchasePrice*taxRate/100)-(privateSale - payoff)
    return Number(amount.toFixed(2))
}


export function loanAmount(none, tradeInValue, privateSale, purchasePrice, cashDown, taxRate, payoff){
    
    if (none!=='' || 0){
        return noCar(none, purchasePrice, cashDown, taxRate)
    }
    else if (tradeInValue!=='' || 0){
        return tradeIn(tradeInValue, purchasePrice, cashDown, taxRate, payoff)
    } 
    else if (privateSale!==''|| 0){
        return privateSell(privateSale, purchasePrice, cashDown, taxRate, payoff)
    } 
} 

export function loanPayment(amount, payments, interest){
    const pmt = amount/((Math.pow((1+(interest/100/12)), payments)-1)/(interest/100/12*Math.pow((1+(interest/100/12)), payments)))
    
    return Number(pmt.toFixed(2));
}

expect(
    noCar(1,30000,5000,6.85)
).toEqual(27055)

expect(
    tradeIn(25000, 30000, 0, 6.85, 20000)
).toEqual(25342.50)


expect(
    loanAmount(1,25000,1,30000,0,6.85,20000)
).toEqual(25342.50)


expect(
    loanPayment(25342.50,60,3.99)
).toEqual(466.61)

expect(
    loanPayment(100000,360,6)
).toEqual(599.55)

console.log('All tests passing!')