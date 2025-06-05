// FeaturedBlogs.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import useBlogApi from "./../../api/useBlogApi";

const FeaturedBlogs = () => {
  const [sorting, setSorting] = useState([]);
  const { getAllBlogsApi } = useBlogApi();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: async () => {
      const res = await getAllBlogsApi();
      return res.data;
    },
  });

  const topBlogs = useMemo(() => {
    return blogs
      .sort(
        (a, b) => b.longDesc.split(" ").length - a.longDesc.split(" ").length
      )
      .slice(0, 10);
  }, [blogs]);

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Word Count",
        accessorFn: (row) => row.longDesc.split(" ").length,
      },
    ],
    []
  );

  const table = useReactTable({
    data: topBlogs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen px-4 py-8 bg-base-200 text-base-content">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📈 Top Featured Blogs
      </h2>
      {isLoading ? (
        <p className="text-center">
          <span className="loading loading-bars loading-xl"></span>
        </p>
      ) : (
        <div className="overflow-x-auto neumorphic rounded-lg p-4">
          <table className="table w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeaturedBlogs;

/*
Neumorphism class suggestion:
.neumorphic {
  background: #e0e0e0;
  border-radius: 1rem;
  box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
}
*/
