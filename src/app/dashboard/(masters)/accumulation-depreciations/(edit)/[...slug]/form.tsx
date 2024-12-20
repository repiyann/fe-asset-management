'use client'

import api from '@/app/api/api'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { masterDataSchema } from '@/schema/masters'

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
import { toast } from 'sonner'

import { MasterData } from '@/types/types'

export default function EditAccuDepreciationForm({ data }: { data: MasterData }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof masterDataSchema>>({
    resolver: zodResolver(masterDataSchema),
    defaultValues: {
      name: data.name,
    },
  })

  async function onSubmit(values: z.infer<typeof masterDataSchema>) {
    toast.dismiss()
    api
      .put(`accu-depreciations/${data.id}`, values)
      .then(() => {
        toast.success('Accumulation depreciation successfully edited')
        router.back()
        router.refresh()
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to edit accumulation depreciation')
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
                  <FormLabel>Accumulation Depreciation Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter accumulation depreciation name" {...field} />
                  </FormControl>
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
