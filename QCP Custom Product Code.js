export function onInit(lines) {
    if (lines != null) {
        lines.forEach(function (line) {
            line.record["MyPackagedProductCode"] = '';
        });
    }
    return Promise.resolve();
};

export function onAfterCalculate(quoteModel, quoteLines) {
    console.log("starting process");
    var myPackagedProductCode = 'HEEYYYY';
    var packagedProductCodeCalculated = '';
    var parentQuantity = 0;
    var numChildLength = 0;
    var strChildLength = '';
    var numChildWidth = 0;
    var strChildWidth = '';
    var material = '';
    var heatTreat = '';
    if (quoteLines != null) {
        quoteLines.forEach(function (line) {
            if (line.record["SBQQ__ProductCode__c"] == 'Pallet-CUS') {
                //line.record["MyPackagedProductCode__c"] = myPackagedProductCode;
                packagedProductCodeCalculated = line.record["SBQQ__PackageProductCode__c"];
                parentQuantity = line.record["SBQQ__Quantity__c"];
            }
            console.log("old code: " + packagedProductCodeCalculated);
            if (line.record["SBQQ__ProductCode__c"] == 'CLength') {
                numChildLength = line.record["SBQQ__Quantity__c"]/parentQuantity;
                console.log("Child Length: " + numChildLength);
            }
            if (line.record["SBQQ__ProductCode__c"] == 'CWidth') {
                numChildWidth = line.record["SBQQ__Quantity__c"]/parentQuantity;
                console.log("Child Width: " + numChildWidth);
            }
            if (line.record["SBQQ__ProductCode__c"] == 'Wood') {
                material = '-N';
                console.log("Material: " + material);
            }
            if (line.record["SBQQ__ProductCode__c"] == 'Plastic') {
                material = '-P';
                console.log("Material: " + material);
            }
            if (line.record["SBQQ__ProductCode__c"] == 'Block') {
                material = '-B';
                console.log("Material: " + material);
            }
            if (line.record["SBQQ__ProductCode__c"] == 'Reconditioned') {
                material = '-R';
                console.log("Material: " + material);
            }
            if (line.record["SBQQ__ProductCode__c"] == 'HeatTreat') {
                heatTreat = '-HT';
                console.log("Heat Treat: " + heatTreat);
            }
        });
    }
    strChildLength = numChildLength.toString();
    strChildWidth = numChildWidth.toString();

    myPackagedProductCode = 'LT-Pallet-' + strChildLength + strChildWidth + material + heatTreat;
    console.log("myPackagedProductCode: " + myPackagedProductCode);

    if (quoteLines != null) {
        quoteLines.forEach(function (line2) {
            //var parent = line.parentItem;
            if (line2.record["SBQQ__ProductCode__c"] == 'Pallet-CUS') {
                line2.record["MyPackagedProductCode__c"] = myPackagedProductCode;
                console.log('written into memory: '+ line2.record["SBQQ__ProductCode__c"]);
            }
        });
    }
    return Promise.resolve();
};