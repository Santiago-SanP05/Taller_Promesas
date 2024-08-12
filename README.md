
# Documentación de Promesas en JavaScript

## Integrantes

1. Santiago Santacruz Pinzón
2. Kevin Steve Romero Rincón

## Descripción

En este proyecto, exploramos varias funciones de promesas en JavaScript: `Promise.race()`, `Promise.all()`, `Promise.any()`, y `Promise.allSettled()`. A continuación se presentan ejemplos y explicaciones para cada una de estas funciones.

### `Promise.race()`

La función `Promise.race()` toma un iterable de promesas y devuelve una nueva promesa que se resuelve o se rechaza tan pronto como la primera promesa en el iterable se resuelve o se rechaza.

#### Ejemplo

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Primera"), 500);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Segunda"), 200);
});

Promise.race([promise1, promise2])
  .then((value) => console.log(value)) // Imprimirá "Segunda" ya que se resuelve primero
  .catch((error) => console.log(error));
```

En este ejemplo, `Promise.race()` se resuelve con el valor de `promise2` porque se resuelve primero.

### `Promise.all()`

La función `Promise.all()` toma un iterable de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas en el iterable se resuelven, o se rechaza si alguna de las promesas se rechaza.

#### Ejemplo

```javascript
const promiseA = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Primera"), 1000);
});

const promiseB = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Segunda"), 2000);
});

const promiseC = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Tercera"), 1500);
});

Promise.all([promiseA, promiseB, promiseC])
  .then((results) => {
    console.log(results); // Imprimirá ["Primera", "Segunda", "Tercera"]
  })
  .catch((error) => {
    console.error("Una de las promesas falló:", error);
  });
```

En este ejemplo, `Promise.all()` espera a que todas las promesas se resuelvan antes de proporcionar un array con los resultados.

#### Ejemplo de fallo

```javascript
const promiseA = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Primera'), 1000);
});

const promiseB = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Segunda'), 2000);
});

const promiseC = new Promise((resolve, reject) => {
  setTimeout(() => reject('Tercera fallida'), 1500);
});

Promise.all([promiseA, promiseB, promiseC])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error('Una de las promesas falló:', error); // Esta línea se ejecutará
  });
```

En este caso, `Promise.all()` se rechaza debido a que `promiseC` falla.

### `Promise.any()`

La función `Promise.any()` toma un iterable de promesas y devuelve una nueva promesa que se resuelve con el valor de la primera promesa que se resuelve exitosamente. Si todas las promesas en el iterable se rechazan, se rechaza con un `AggregateError`.

#### Ejemplo

```javascript
console.log("Ejemplo de Promise.any");

const promesa_any = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promesa_any rechazada"), 2000);
});

const promesa_any2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promesa_any2 resuelta"), 1000);
});

Promise.any([promesa_any, promesa_any2])
  .then(result => {
    console.log(result); // Imprimirá "Promesa_any2 resuelta"
  })
  .catch(error => {
    console.error(error); // No debería ejecutarse
  });
```

En este ejemplo, `Promise.any()` se resuelve con el valor de `promesa_any2` ya que es la primera que se resuelve con éxito.

### `Promise.allSettled()`

La función `Promise.allSettled()` toma un iterable de promesas y devuelve una nueva promesa que se resuelve después de que todas las promesas se hayan resuelto o rechazado. Proporciona un array de objetos que describen el resultado de cada promesa, ya sea que se haya resuelto o rechazado.

#### Ejemplo

```javascript
console.log("Ejemplo de Promise.allSettled");

const promesa_A = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promesa A resuelta"), 1500);
});

const promesa_B = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promesa B rechazada"), 1000);
});

Promise.allSettled([promesa_A, promesa_B])
  .then(results => {
    console.log(results); // Imprimirá el estado de ambas promesas
    // Ejemplo de salida esperada:
    // [
    //   { status: 'fulfilled', value: 'Promesa A resuelta' },
    //   { status: 'rejected', reason: 'Promesa B rechazada' }
    // ]
  })
  .catch(error => {
    console.error(error); // No debería ejecutarse ya que Promise.allSettled maneja todos los casos
  });
```

En este ejemplo, `Promise.allSettled()` proporciona el estado de ambas promesas, sin importar si se resolvieron o rechazaron.
