'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

function formatChangePercentage(value:any) {
    if (value === null || value === undefined) {
        return 'N/A';
    }
    return isNaN(value) ? 'N/A' : `${value.toFixed(2)}%`;
}

export default function ResultTable({ results, loading, error }:any) {
    return (
        <div className="p-4">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {results.length > 0 && results.map((result:any, index:any) => (
                <div key={index} className="mb-4">
                    <h1 className="text-xl font-bold mb-2">{result.title}</h1>
                    <p className="text-sm text-muted-foreground mb-4">Upload Date: {new Date(result.upload_date).toLocaleDateString()}</p>
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
                            {Object.entries(result.price_changes).map(([coin, changes]:any) => (
                                <TableRow key={coin}>
                                    <TableCell className="font-medium">{coin}</TableCell>
                                    <TableCell className={`${changes.change_percentage_3_days < 0 ? "text-blue-500" : "text-red-500"}`}>
                                        {formatChangePercentage(changes.change_percentage_3_days)}
                                    </TableCell>
                                    <TableCell className={`${changes.change_percentage_7_days < 0 ? "text-blue-500" : "text-red-500"}`}>
                                        {formatChangePercentage(changes.change_percentage_7_days)}
                                    </TableCell>
                                    <TableCell className={`${changes.change_percentage_2_weeks < 0 ? "text-blue-500" : "text-red-500"}`}>
                                        {formatChangePercentage(changes.change_percentage_2_weeks)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </div>
    );
}
