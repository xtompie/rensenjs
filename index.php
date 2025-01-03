<script>
<?= file_get_contents(__DIR__ . '/Rensen.js') ?>
</script>
<script>
// Define reactive values
const a = R(() => 1);
const b = R(() => 2);

// Create a dependent reactive value
const c = R(() => a() + b());

// React to changes in `c`
R(() => console.log(`c: ${c()}`));

// Initial output:
// c: 3

// Change `a`
a(() => 10);

// Outputs:
// c: 12
</script>