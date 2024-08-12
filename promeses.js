//- Promise.any:  Retorna una promesa que se resuelve cuando todas las promesas en el iterable se han resuelto, o se rechaza si una de las promesas en el iterable se rechaza. El resultado es un array con los resultados de cada promesa en el orden en que fueron pasadas.

// Ejemplo de Promise.any
console.log("Ejemplo de Promise.any");
const promesa_any = new Promise((resolve, reject) => {
    setTimeout(() => reject("Promesa_any rechazada"), 2000); // Se rechaza después de 2 segundoso del tiempo que desees colocar
});
const promesa_any2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promesa_any2 resuelta"), 1000); // Se resuelve después de 1 segundo o del tiempo que desees colocar
});

Promise.any([promesa_any, promesa_any2])
    .then(result => {
        console.log(result); // Imprimirá "promesa_any2 resuelta" ya que es la primera que se resuelve con éxito
    })
    .catch(error => {
        console.error(error); // No debería ejecutarse ya que hay al menos una promesa que se resuelve con éxito
    });




//Promise.allSettled: Retorna una promesa que se resuelve después de que todas las promesas en el iterable se hayan resuelto o rechazado, y proporciona un array de objetos que describen el resultado de cada promesa, ya sea que se haya resuelto o rechazado.

// Ejemplo de Promise.allSettled
console.log("Ejemplo de Promise.allSettled");
const promesa_A = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promesa A resuelta"), 1500); // Se resuelve después de 1.5 segundos
});
const promesa_B = new Promise((resolve, reject) => {
    setTimeout(() => reject("Promesa B rechazada"), 1000); // Se rechaza después de 1 segundo
});

Promise.allSettled([promesa_A, promesa_B])
    .then(results => {
        console.log(results); // Imprimirá un array con los estados de ambas promesas
        // Ejemplo de salida esperada: [
        //   { status: 'fulfilled', value: 'Promise 7 resuelta' },
        //   { status: 'rejected', reason: 'Promise 8 rechazada' }
        // ]
    })
    .catch(error => {
        console.error(error); // No debería ejecutarse ya que Promise.allSettled maneja todos los casos
    });