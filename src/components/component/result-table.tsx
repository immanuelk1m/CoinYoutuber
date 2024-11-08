'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

interface Result {
    title: string;
    upload_date: string;
    price_changes: {
        [coin: string]: {
            change_percentage_3_days: number | null;
            change_percentage_7_days: number | null;
            change_percentage_2_weeks: number | null;
        };
    };
}

interface ResultTableProps {
    results: Result[];
    loading: boolean;
    error?: string | null; // error를 선택적 속성으로 변경
}

function formatChangePercentage(value: number | null): string {
    if (value === null || value === undefined || isNaN(value)) {
        return 'N/A';
    }
    return `${value.toFixed(2)}%`;
}

export default function ResultTable({ results, loading, error }: ResultTableProps) {
    return (
        <div className="p-4">
            {loading && <div className="flex justify-center items-center"><div className="loader">Loading...</div></div>}
            {error && <div>{error}</div>} {/* error가 있을 때만 표시 */}
            {!loading && !error && results.length === 0 && <div>No Data Available</div>}

            {results.length > 0 && results.map((result, index) => (
                <div key={index} className="mb-4">
                    <h1 className="text-xl font-bold mb-2">{result.title}</h1>
                    <p className="text-sm text-muted-foreground mb-4">
                        Upload Date: {new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(result.upload_date))}
                    </p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Coin</TableHead>
                                    <TableHead>3일 수익률</TableHead>
                                    <TableHead>1주 수익률</TableHead>
                                    <TableHead>2주 수익률</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(result.price_changes).map(([coin, changes]) => (
                                    <TableRow key={coin}>
                                        <TableCell className="font-medium">{coin}</TableCell>
                                        <TableCell className={changes.change_percentage_3_days && changes.change_percentage_3_days < 0 ? "text-blue-500" : "text-red-500"}>
                                            {formatChangePercentage(changes.change_percentage_3_days)}
                                        </TableCell>
                                        <TableCell className={changes.change_percentage_7_days && changes.change_percentage_7_days < 0 ? "text-blue-500" : "text-red-500"}>
                                            {formatChangePercentage(changes.change_percentage_7_days)}
                                        </TableCell>
                                        <TableCell className={changes.change_percentage_2_weeks && changes.change_percentage_2_weeks < 0 ? "text-blue-500" : "text-red-500"}>
                                            {formatChangePercentage(changes.change_percentage_2_weeks)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ))}
        </div>
    );
}
