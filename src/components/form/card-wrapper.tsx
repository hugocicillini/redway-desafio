"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardWrapperProps {
  children: React.ReactNode,
  title: string
}

const CardWrapper = ({ children, title }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default CardWrapper;