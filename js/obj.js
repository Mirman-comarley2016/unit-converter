/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var UnitClan = function(name){
    this.name = name;
    this.families = {};
    
    this.addFamily = function(family){
//        TODO: Add error checking
        this.families[family.name] = family;
    };
};

var UnitFamily = function(data){
    this.name = data.name;
    this.clan = data.clan;
    this.rootConversions = data.rootConversions;
    this.children = {};
    
    this.addChild = function(child){
//        TODO: Add error checking
        this.children[child.symbol] = child;
    };
};

var UnitType = function(data){
    this.name = data.name;
    this.symbol = data.symbol;
    this.family = data.family;
    this.rootCoeff = data.rootCoeff;
};

var UnitValue = function(val,type){
    this.val = val;
    this.type = type;
    
};

var UnitConverter = function(){
    var self = this; //Keep access to function in sub-functions
    
    this.unitClans = {};
    this.unitFamilies = {};
    this.unitTypes = {};
    

    
    this.buildFamilies = function(families){
        console.log("Building families/clans...");
        for (var f in families){
            var fam = families[f];
            var newFam = new UnitFamily({
                name: fam.name,
                clan: fam.clan,
                rootConversions: fam.rootConversions
            });
//            If the clan doesn't already exist, make it
            if (!self.unitClans[newFam.clan]){
               var newClan = new UnitClan(newFam.clan);
               self.unitClans[newClan.name] = newClan;
            }
//            Otherwise, just proceed and add the family
            self.unitClans[newFam.clan].addFamily(newFam);
//            Also add it to the families array for the UC Object
            self.unitFamilies[newFam.name] = newFam;
        }        
    };
    
    this.buildItems = function(units){
        console.log("Building types");
        for(var u in units){
            var unit = units[u];
            var newUnit = new UnitType({
                name: unit.name,
                symbol: unit.symbol,
                family: unit.family,
                rootCoeff: unit.rootCoeff
            });
//            Attach the Item to a family
            self.unitFamilies[newUnit.family].addChild(newUnit);
//            Attach to the unitTypes array as well
            self.unitTypes[newUnit.symbol] = newUnit;
        };
    };
        
    this.init = function(units,families){
        console.log("Creating system...");
        this.buildFamilies(families);
        this.buildItems(units); 
//        Add toRoot to the UnitValue
        UnitValue.prototype.toRoot = function(){
          return this.val / self.unitTypes[this.type].rootCoeff;  
        };
    };
    
    this.validate = function(val){
        if(val == ""){
            console.log("Validation Failed");
            return false;
        } else {
            console.log("Validation Passed");
            return true;
        }
    };
    
    this.convert = function(inVal, outSymbol){
        var outType = self.unitTypes[outSymbol];
        var inType = self.unitTypes[inVal.type];
        var inFam = self.unitFamilies[inType.family];
        var outFam = self.unitFamilies[outType.family];
        var inClan = self.unitClans[inFam.clan];
        console.log(outFam);
        var newUnit = new UnitValue(inVal.toRoot(), outType);
//        Check in family first
        if(outType.symbol in inFam.children){
            console.log("Match in family found!");
            newUnit.val *= outType.rootCoeff;
        } else if(outFam.clan == inClan.name){ 
//            With no luck there, we search in the clan
            console.log("Match in clan found!");
            console.log(outFam.name);
            newUnit.val = inFam.rootConversions[outFam.name](newUnit.val);
            newUnit.val *= outType.rootCoeff;
        } else{
            console.log("No match found");
            return -1;
        };
        
        return newUnit;
        
    };
};