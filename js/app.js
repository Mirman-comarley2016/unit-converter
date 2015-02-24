//Main App Code

function clearOutSelect(){
    var startHTML = "<option>Select Unit</option>";
    $("#out-unit").html(startHTML);
}

function flip(){
    $("#in-val").val($("#out-val").val());
    $("#in-unit").val($("#out-unit").val());
}

$(document).ready(function(){
    uc = new UnitConverter();
    uc.init(units,families);
    var optHTML = "";
    for(var c in uc.unitClans){
        var clan = uc.unitClans[c];
        optHTML+="<optgroup label=\""+clan.name +"\">" ;
            for(var f in clan.families){
                var fam = clan.families[f];
                    for(var u in fam.children){
                        var unit = fam.children[u];
                        optHTML+="<option value=\""+unit.symbol +
                                "\">" + unit.name + "</option>";
                    }
            }
        optHTML+="</optgroup>";
    }
    $("#in-unit").append(optHTML);
    $("#in-unit").on("change",function(){
        var inUnit = uc.unitTypes[$("#in-unit").val()]; 
        var inFam = uc.unitFamilies[inUnit.family];
        var inClan = uc.unitClans[inFam.clan];
        clearOutSelect();
        var optHTML = "";
        for(var f in inClan.families){
            var fam = inClan.families[f];
            for(var u in fam.children){
                var unit = uc.unitTypes[u];
                optHTML+="<option value=\""+unit.symbol +
                        "\">"+unit.name+"</option>";
            }
        }
        $("#out-unit").append(optHTML);        
    });
    $("#convert").click(function(){
        if(uc.validate($("#in-val").val())){
            var inVal = new UnitValue($("#in-val").val(), $("#in-unit").val());
            var outType = $("#out-unit").val();
            var result = uc.convert(inVal,outType);
            if(result){
                $("#out-val").val(result.val);
            }            
        } else {
            alert("Please use a number");
        }
    });
    $("#flip").click(flip);
});