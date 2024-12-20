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

export default function CreateCategoryForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof masterDataSchema>>({
    resolver: zodResolver(masterDataSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof masterDataSchema>) {
    toast.dismiss()
    api
      .post('categories', values)
      .then(() => {
        toast.success('Category successfully created')
        router.back()
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to create category')
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
