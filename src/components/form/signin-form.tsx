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

const FormSchema = z.object({
  email: z.string().min(1, 'Email inválido!').email('Email inválido!'),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch(`/api/user?email=${values.email}`);

      if (response.ok) {
        toast({
          title: 'Logado',
          description: 'Seja bem-vindo!',
        })
        router.push('/');
      } else {
        toast({
          title: 'Email inválido!',
          description: 'Verifique seu email e tente novamente!',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <CardWrapper title='Entrar'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
            Entrar
          </Button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          <Link className='text-blue-500 hover:underline' href='/sign-up'>
            Criar uma conta
          </Link>
        </p>
      </Form>
    </CardWrapper>
  );
};

export default SignInForm;