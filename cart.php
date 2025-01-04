<?php require __DIR__ . '/excell.php' ?>
<script>
A1(() => 'Name');
B1(() => 'Quantity');
C1(() => 'Price');
D1(() => 'Total price');

A2(() => 'Duck');
B2(() => 1);
C2(() => 50);
D2(() => B2() * C2());

A3(() => 'Horse');
B3(() => 100);
C3(() => 5000);
D3(() => B3() * C3());

D10(() => cells('D2:D9').reduce((acc, cell) => acc + Number(cell()), 0));

</script>
