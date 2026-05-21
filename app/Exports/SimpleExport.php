<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SimpleExport implements FromArray, WithHeadings, WithStyles, ShouldAutoSize
{
    public function __construct(
        protected array $rows,
        protected array $heads
    ) {}

    public function array(): array
    {
        return $this->rows;
    }

    public function headings(): array
    {
        return $this->heads;
    }

    public function styles(Worksheet $sheet)
    {
        // Bold + dark navy header row
        $sheet->getStyle('1')->applyFromArray([
            'font' => [
                'bold'  => true,
                'color' => ['argb' => 'FFFFFFFF'],
                'size'  => 10,
            ],
            'fill' => [
                'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['argb' => 'FF1E4C89'],
            ],
        ]);

        // Thin borders on the whole used range
        $lastRow = count($this->rows) + 1;
        $lastCol = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($this->heads));
        $sheet->getStyle("A1:{$lastCol}{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color'       => ['argb' => 'FFDDDDDD'],
                ],
            ],
        ]);

        return [];
    }
}
