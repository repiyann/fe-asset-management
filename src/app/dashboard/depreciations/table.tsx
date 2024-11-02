'use client'

import { useState } from 'react'
import api from '@/app/api/api'
import { useRouter } from 'next/navigation'

import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

import { generateSlug } from '@/lib/utils'
import { MasterDataTableProps } from '@/types/types'

export default function DepreciationsTable({ datas, currentPage, perPage }: MasterDataTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function handleEdit(id: string, name: string) {
    const slug = generateSlug(name)
    router.push(`/dashboard/depreciations/${slug}&id=${id}/edit`)
  }

  function handleShow(id: string, name: string) {
    const slug = generateSlug(name)
    router.push(`/dashboard/depreciations/${slug}&id=${id}`)
  }

  async function handleDelete(id: string) {
    toast.dismiss()
    api
      .delete(`depreciations/${id}`)
      .then(() => {
        toast.success('Depreciation successfully deleted')
        router.refresh()
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to delete depreciation')
      })
      .finally(() => {
        setDeleteId(null)
      })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas.map((data, index) => {
            const rowIndex = (currentPage - 1) * perPage + index + 1 // Calculate the actual index
            return (
              <TableRow key={data.id}>
                <TableCell>{rowIndex}</TableCell>
                <TableCell>{data.code}</TableCell>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleShow(data.id, data.name)}
                      >
                        Show
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleEdit(data.id, data.name)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeleteId(data.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this depreciation and
              remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(deleteId!)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
