<script>
<?= file_get_contents(__DIR__ . '/Rensen.js') ?>
</script>
<?php
$lastCol = 'J';
$lastRow = 10;
?>
<table border="1">
    <tr>
        <td></td>
        <?php foreach (range('A', $lastCol) as $col): ?>
            <th align="left"><?= $col ?></th>
        <?php endforeach ?>
    </tr>
    <?php foreach (range(1, 10) as $row): ?>
        <tr>
            <th><?= $row ?></th>
            <?php foreach (range('A', $lastCol) as $col): ?>
                <td  id="<?= $col ?><?= $row ?>"></td>
            <?php endforeach ?>
        </tr>
    <?php endforeach ?>
</table>
<script>
const table = {};
</script>
<?php foreach (range(1, $lastRow) as $row): ?>
    <?php foreach (range('A', $lastCol) as $col): ?>
        <?php $id = $col . $row ?>
        <script>
        const <?= $id ?> = R(() => '');
        table['<?= $id ?>'] = <?= $id ?>;
        R(() => document.getElementById('<?= $id ?>').innerText = <?= $id ?>());
        </script>
    <?php endforeach ?>
<?php endforeach ?>
<script>
function cells(range) {
    const [start, end] = range.split(':');
    const [startCol, startRow] = [start[0], parseInt(start.slice(1))];
    const [endCol, endRow] = [end[0], parseInt(end.slice(1))];
    const result = [];
    for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
        for (let row = startRow; row <= endRow; row++) {
            result.push(table[String.fromCharCode(col) + row]);
        }
    }
    return result;
}
</script>