"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // Add features needed for sorting, filtering, and pagination
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn table components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

// --- Component Props Interface ---

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  
  // Pagination State and Handlers
  pageIndex: number;
  pageSize: number;
  pageCount: number; // Total number of pages from API metadata
  totalRecords: number; // Total number of records from API metadata
  onPaginationChange: (paginationState: { pageIndex: number; pageSize: number }) => void;
  
  // Filtering/Search State and Handlers
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  
  // Status
  isLoading: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  pageCount,
  totalRecords,
  onPaginationChange,
  globalFilter,
  setGlobalFilter,
  isLoading,
}: DataTableProps<TData, TValue>) {
  
  // Internal Pagination State object required by useReactTable
  const pagination: PaginationState = { pageIndex, pageSize };

  // 1. Initialize the table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // We use server-side pagination, so we only need to pass the state/metadata
    getPaginationRowModel: getPaginationRowModel(),
    
    // Manual overrides for server-side control
    manualPagination: true,
    pageCount: pageCount, // Total pages from the server
    
    // Global Filtering (we let the server handle the filtering, 
    // but the state is managed here and sent to the server via props)
    state: {
      pagination,
      globalFilter,
      // You can add columnFiltersState here if needed for client-side filtering UI
    },
    onPaginationChange: (updater) => {
      // Updater can be a function or the new state. We use it to call the prop handler.
      const newPaginationState = typeof updater === 'function' ? updater(pagination) : updater;
      onPaginationChange(newPaginationState);
    },
    // We use the same handler for search state
    onGlobalFilterChange: setGlobalFilter,
  });

  // Helper function to render Skeleton rows
  const renderSkeletonRows = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <TableRow key={index} className="animate-pulse">
        {columns.map((column, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton className="h-4 w-full bg-gray-200" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  
  // Determine if we should show skeleton rows
  const shouldShowSkeletons = isLoading && !table.getRowModel().rows.length;


  // 2. Render the Table UI
  return (
    <div className="space-y-4">
      
      {/* Search Input (Moved up into ProductTable, but kept here for completeness) */}
      {/* <Input
        placeholder="Tìm kiếm..."
        value={globalFilter ?? ''}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="max-w-sm"
      /> 
      */}

      {/* Table Container */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {shouldShowSkeletons ? (
              renderSkeletonRows(pageSize) // Show skeletons while loading data
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không tìm thấy sản phẩm nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 3. Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Đang hiển thị {table.getRowModel().rows.length} trong tổng số {totalRecords} sản phẩm.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          Trang trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoading}
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
}