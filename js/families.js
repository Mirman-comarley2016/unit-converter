//Families definitions
var families = [
    {
        name:"imp_dist",
        clan: "dist",
        rootConversions: {
            met_dist: function(inVal){
                return inVal*1609.34;
            }
        }
    },
    {
        name:"met_dist",
        clan: "dist",
        rootConversions: {
            imp_dist: function(inVal){
                return inVal*0.0006214;
            }
        }
    },
    {
        name:"imp_mass",
        clan: "mass",
        rootConversions: {
            met_mass: function(inVal){
                return inVal*453.592;
            }
        }
    },
    {
        name:"met_mass",
        clan: "mass",
        rootConversions: {
            imp_mass: function(inVal){
                return inVal*0.002204;
            }
        }
    },
    {
        name:"cel_temp",
        clan: "temp",
        rootConversions: {
            imp_temp: function(inVal){
                return inVal*2+30;
            },
            met_temp: function(inVal){
                return inVal+273.15;
            }
        }
    },
    {
        name: "met_temp",
        clan: "temp",
        rootConversions: {
            cel_temp: function(inVal){
                return inVal-273.15;
            },
            imp_temp: function(inVal){
                return 1.8 *(inVal-273)+32;
            }
        }
    },
    {
        name: "imp_temp",
        clan: "temp",
        rootConversions: {
            cel_temp: function(inVal){
                return 0.5556*(inVal-32);
            },
            met_temp: function(inVal){
                return 0.5556*(inVal-32)+273;
            }
        }
    }    
];