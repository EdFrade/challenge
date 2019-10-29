"use strict";

var facts = [
    ['gabriel', 'endereço', 'av rio branco, 109', true],
    ['joão', 'endereço', 'rua alice, 10', true],
    ['joão', 'endereço', 'rua jonas, 88', true],
    ['joão', 'endereço', 'rua bob, 88', true],
    ['joão', 'telefone', '234-5678', true],
    ['joão', 'telefone', '91234-5555', true],
    ['joão', 'telefone', '234-5678', false],
    ['gabriel', 'telefone', '98888-1111', true],
    ['gabriel', 'telefone', '56789-1010', true],
  ];

  var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many'],
    ['cpf', 'cardinality', 'many'],
];

function clearFacts(facts) {
    let falseFacts = facts.filter(x =>{
        return x[3] != true;
    })
    let cleanFacts = [];
    for (let i = 0; i < facts.length; i++) {
        for (let j = 0; j < falseFacts.length; j++) {
           if(!(facts[i][0] == falseFacts[j][0] && facts[i][1] == falseFacts[j][1] && facts[i][2] == falseFacts[j][2])){
               cleanFacts.push(facts[i]);
           }
        }
    }
    return cleanFacts;
}


function activeFacts(schema, facts) {
    let objectSchema = {};
    let finalFacts = [];
    let aux = true;
    for (let i = 0; i < schema.length; i++) {
        objectSchema[schema[i][0]] = schema[i][2];
    } 
    for (let i = 0; i < facts.length; i++) {
        if (objectSchema[facts[i][1]] == 'one') {
            if(finalFacts.length <=0){
                finalFacts.push(facts[i]);
                
            }else{
                for (let j = 0; j < finalFacts.length; j++) {
                    if (facts[i][0] == finalFacts[j][0] && facts[i][1] == finalFacts[j][1]) {
                        finalFacts[j] = facts[i];
                        aux = false;
                    }
                }
                if (aux) {
                    finalFacts.push(facts[i]);
                }
            }
        }else{
            finalFacts.push(facts[i]);
        }
        
    }
   return finalFacts;
}
console.log(activeFacts(schema,clearFacts(facts)));


