import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customCurrency'
})

export class CustomCurrency implements PipeTransform{

    transform(value:number):any{
        var currencySymbol = 'INR ';
        var negative_sign = '';
        var resultcount = []
        var result = value.toString().split('.');
        
        if (result[0] < '0'){var negative_sign = '- ';}
        var changeValue = (result[0].replace(/\D+/g, ""))
        resultcount.push(changeValue);
        
        var lastThree = resultcount[0].substring(resultcount[0].length - 3);
        var otherNumbers = resultcount[0].substring(0, resultcount[0].length - 3);
        if (otherNumbers != ''){lastThree = ',' + lastThree;}
            
        var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            
        if (result.length > 1) {
            output += "." + result[1];
        }
        return negative_sign + currencySymbol + output;
    }
}