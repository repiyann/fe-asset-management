'use client'

import api from '@/app/api/api'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assetSchema } from '@/schema/asset'
import { format } from 'date-fns'

import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { EditAssetFormProps } from '@/types/types'

export default function EditAssetForm({
  data,
  locations,
  categories,
  depreciations,
  fixedAssets,
  accuDepreciations,
}: EditAssetFormProps) {
  const router = useRouter()

  console.log('data', data)

  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: data.name,
      locationId: data.location.id,
      categoryId: data.category.id,
      fixedAssetId: data.fixedAsset.id,
      description: data.description,
      acquisitionCost: data.acquisitionCost,
      acquisitionDate: new Date(data.acquisitionDate),
      nonDepreciation: data.nonDepreciation
        ? {
            method: data.method,
            usagePeriod: data.transaction?.usagePeriod,
            usageValuePerYear: data.transaction?.usageValuePerYear,
            depreciationId: data.depreciation.id,
            accuDepreciationId: data.accuDepreciation.id,
          }
        : false,
    },
  })

  const nonDepreciation = form.watch('nonDepreciation')

  async function onSubmit(values: z.infer<typeof assetSchema>) {
    console.log('value', values)
    toast.dismiss()
    api
      .put(`assets/${data.id}`, values)
      .then(() => {
        toast.success('Asset successfully edited')
        router.back()
        router.refresh()
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to edit asset')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter asset name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select locations" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="fixedAssetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fixed Asset</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fixed assets" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fixedAssets.map((fixedAsset) => (
                        <SelectItem key={fixedAsset.id} value={fixedAsset.id}>
                          {fixedAsset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="acquisitionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1">
                  <FormLabel>Acquisition Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd MMMM yyyy')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="acquisitionCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acquisition Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter acquisition cost"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value ? parseFloat(value) : 0)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="nonDepreciation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value === true} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="pt-0.5">Non-Depreciation</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="nonDepreciation.method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depreciation Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={nonDepreciation === true}>
                        <SelectValue placeholder="Select depreciation method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Straight Line">Straight Line</SelectItem>
                      <SelectItem value="Reducing Balance">Reducing Balance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="nonDepreciation.usagePeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Period</FormLabel>
                  <FormControl>
                    <Input
                      disabled={nonDepreciation === true}
                      type="number"
                      placeholder="Enter usage period"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value ? parseFloat(value) : 0)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="nonDepreciation.usageValuePerYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Value Per Year</FormLabel>
                  <FormControl>
                    <Input
                      disabled={nonDepreciation === true}
                      type="number"
                      placeholder="Enter usage value per year"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value ? parseFloat(value) : 0)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="nonDepreciation.depreciationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depreciation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={nonDepreciation === true}>
                        <SelectValue placeholder="Select depreciations" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {depreciations.map((depreciation) => (
                        <SelectItem key={depreciation.id} value={depreciation.id}>
                          {depreciation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="nonDepreciation.accuDepreciationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accumulation Depreciation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={nonDepreciation === true}>
                        <SelectValue placeholder="Select accumulation depreciations" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accuDepreciations.map((accuDepreciation) => (
                        <SelectItem key={accuDepreciation.id} value={accuDepreciation.id}>
                          {accuDepreciation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
