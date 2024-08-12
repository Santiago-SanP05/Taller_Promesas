
//:Nombre de los intregrantes:
//1. Santiago Santacruz Pinzon----
//2. Kevin Steve Romero Rincon----

//--Promice.race--//
// Creamos dos promesas la cual automaticamente rotornen un 'resolve()'
// con la palabra Primera, Segunda... Segun su posicion para tener un orden
// y con el setTimeout les colocamos distintos tiempos de espera

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Primera"), 500);
  });
  
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Segunda"), 200);
  });
  
  // AHORA--  utilizamos la funcion de 'Promise.race()'
  // a los cuales les pasamos las promesas 1 y 2, y colocamos las posivilidades donde se resuelve y donde no
  // aunque nos vamos a enfocar en la de resolucion
  
  Promise.race([promise1, promise2])
    .then((value) => console.log(value))
    .catch((error) => console.log(error));
  
  // ahora como tenemos que las dos promesas solo pueden ejecutar un 'resolve()' el gracias al 'Promise.race()'
  // .then ejecutará aquella de las promesas que se ejecuten primero.
  // En este caso, Promise.race() se resuelve con el valor de la promise2 porque se resuelve primero
  // a pesar de que promise1 se resolverá más tarde.
  /*
  Se usa comúnmente en situaciones donde te interesa obtener el resultado de la primera promesa que se 
  complete, por ejemplo, en escenarios de competencia entre varias fuentes de datos o para implementar 
  tiempos de espera (timeouts) en tus promesas.
  */
  
  //volvemos a declarar 3 nuevas promesas de las cuales cada uno tiene un tiempo diferente
  
  const promiseA = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Primera"), 1000);
  });
  
  const promiseB = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Segunda"), 2000);
  });
  
  const promiseC = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Tercera"), 1500);
  });
  // Ahora utilizamos la funcion 'Promise.all()' y dentro le pasamos todas las promesas declaradas
  Promise.all([promiseA, promiseB, promiseC])
    .then((results) => {
      console.log(results); // el resultado de ejecucion de este progama es = ['Primera', 'Segunda', 'Tercera']
    })
    .catch((error) => {
      console.error("Una de las promesas falló:", error);
    });
  
  // La funcion.all espera que todas as promesas se cumplan para poder dar un resultado
  // en caso de que alguna de las promesas no se resuelvan se ejecutara el .catch donde se mostrara que una de las promesas falló
  
  //Ejemplo de fallo//
  
  /*
  const promiseA = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Primera'), 1000);
    });
    
    const promiseB = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Segunda'), 2000);
    });
    
    const promiseC = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Tercera'), 1500);
    });
    Promise.all([promiseA, promiseB, promiseC])
      .then(results => {
        console.log(results);
      })
      .catch(error => {
        console.error('Una de las promesas falló:', error);// esta vez se ejecutara esta función
      });
  */
  
  //Casos comunes//
  /*
  Cargar datos simultáneamente: Cuando necesitas cargar datos de múltiples fuentes al mismo tiempo y proceder solo cuando todos los datos estén disponibles.
  Ejecución paralela de tareas: Para ejecutar varias tareas en paralelo y esperar a que todas finalicen.
  Sincronización de resultados: Para asegurar que todas las tareas asincrónicas se completen antes de realizar alguna acción que dependa de sus resultados.
  */

  
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