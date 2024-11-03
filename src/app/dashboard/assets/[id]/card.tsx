'use client'

import api from '@/app/api/api'
import { useRouter } from 'next/navigation'

import { ArrowLeft, Building2, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

import { Asset } from '@/types/types'
import { generateSlug } from '@/lib/utils'

export default function AssetCard({ data }: { data: Asset }) {
  const router = useRouter()

  function handleEdit(id: string, name: string) {
    const slug = generateSlug(name)
    router.push(`/dashboard/assets/${slug}&id=${id}/edit`)
  }

  async function handleDelete(id: string) {
    toast.dismiss()
    api
      .delete(`assets/${id}`)
      .then(() => {
        toast.success('Asset successfully deleted')
        router.back()
        router.refresh()
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to delete asset')
      })
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(data.id, data.name)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this asset and remove
                    its data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(data.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Asset Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Code</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.customNumber}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Name</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.name}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Location</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.location.name}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Category</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.category.name}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Fixed Aset</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.fixedAsset.name}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Description</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.description}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Acquisition Cost</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.acquisitionCost}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Acquisiton Date</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.acquisitionDate}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">Asset Non Depreciation</div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.nonDepreciation ? 'true' : 'false'}
            </div>
          </div>
          {!data.nonDepreciation && (
            <>
              <div className="grid gap-2">
                <div className="text-sm font-medium text-muted-foreground">Asset Method</div>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  {data.method}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium text-muted-foreground">Asset Depreciation</div>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  {data.depreciation.name}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Asset Accumulation Depreciation
                </div>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  {data.accuDepreciation.name}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
