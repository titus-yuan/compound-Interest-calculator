"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CompoundInterestInputs } from "@/lib/types";

const formSchema = z.object({
  principal: z.number().min(1, "Principal amount must be greater than 0"),
  years: z.number().min(1, "Years must be between 1 and 50").max(50),
  interestRate: z.number().min(0, "Interest rate must be between 0 and 100").max(100),
});

interface CompoundInterestFormProps {
  onCalculate: (data: CompoundInterestInputs) => void;
  isLoading?: boolean;
}

export function CompoundInterestForm({ onCalculate, isLoading }: CompoundInterestFormProps) {
  const form = useForm<CompoundInterestInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      principal: 10000,
      years: 10,
      interestRate: 7,
    },
  });

  const onSubmit = (data: CompoundInterestInputs) => {
    onCalculate(data);
  };

  const handleReset = () => {
    form.reset();
    onCalculate(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="principal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Principal ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="years"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Period (Years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Interest Rate (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min={0}
                  max={100}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            Calculate
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}