# Rensenjs

**Rensenjs** is a reactive system for JavaScript. It creates values that update automatically when their dependencies change.

## Usage

Example of defining and reacting to reactive values:

```javascript
// Define reactive values
const a = R(() => 1);
const b = R(() => 2);

// Create a dependent value
const c = R(() => a() + b());

// React to changes in `c`
R(() => console.log(`c: ${c()}`));

// Initial output:
// c: 3

// Change `a`
a(() => 10);

// Outputs:
// c: 12
```

## Demo

### Simple

<https://xtompie.github.io/rensenjs/simple.html>

Example from Usage section, open console to see result

### Excell

<https://xtompie.github.io/rensenjs/excell.html>

Empty excell, in console type:

```javascript
A1(() => 1);
B1(() => 2);
C1(() => A1() + B1());
```

### Cart

<https://xtompie.github.io/rensenjs/cart.html>
