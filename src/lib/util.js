import expect from 'expect';


function noCar(purchasePrice, cashDown, taxRate){
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

export function totalInterest(pmt, payments, amount){
    const totalInterest = (pmt * payments ) - amount 
    return Number(totalInterest.toFixed(2))
}



export function loanAmount(none, tradeInValue, privateSale, purchasePrice, cashDown, taxRate, payoff){
    if (none!==''){
        return noCar(purchasePrice, cashDown, taxRate)
    }
    else if (tradeInValue!==''){
        return tradeIn(tradeInValue, purchasePrice, cashDown, taxRate, payoff)
    } 
    else if (privateSale!==''){
        return privateSell(privateSale, purchasePrice, cashDown, taxRate, payoff)
    } 
} 

export function loanPayment(amount, payments, interest){
    const pmt = amount/((Math.pow((1+(interest/100/12)), payments)-1)/(interest/100/12*Math.pow((1+(interest/100/12)), payments)))
    
    return Number(pmt.toFixed(2));
}

expect(
    noCar('30000','5000','6.85')
).toEqual(27055)

expect(
    tradeIn(25000, 30000, 0, 6.85, 20000)
).toEqual(25342.50)

expect(
    privateSell(25000, 30000, 0, 6.85, 20000)
).toEqual(27055.00)

expect(
    loanAmount('',25000,'',30000,0,6.85,20000)
).toEqual(25342.50)

expect(
    loanAmount(0,'','',30000,5000,6.85,0)
).toEqual(27055)

expect(
    loanAmount('','',25000,30000,0,6.85,20000)
).toEqual(27055.00)


expect(
    loanPayment(25342.50,60,3.99)
).toEqual(466.61)

expect(
    loanPayment(100000,360,6)
).toEqual(599.55)

expect(
    totalInterest( 289.50, 60, 15000)
).toEqual(2370.00)

console.log('All tests passing!')