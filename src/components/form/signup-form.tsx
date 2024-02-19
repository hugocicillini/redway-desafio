'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import CardWrapper from '@/components/form/card-wrapper';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Nome inválido!').max(30),
    email: z.string().min(1, 'Email inválido!').email('Email inválido!'),
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email
      }),
    })

    if (response.ok) {
      toast({
        title: 'Usuário cadastrado!',
        description: 'Faça seu login!',
      })
      router.push('/')
    } else {
      toast({
        title: 'Email já cadastrado!',
        description: 'Tente novamente com outro email!',
      })
    }
  };

  return (
    <CardWrapper title='Cadastrar'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='johndoe' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email@exemplo.com' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className='w-full mt-6' type='submit'>
            Criar conta
          </Button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          <Link className='text-blue-500 hover:underline' href='/sign-in'>
            Já tenho uma conta
          </Link>
        </p>
      </Form>
    </CardWrapper>
  );
};

export default SignUpForm;