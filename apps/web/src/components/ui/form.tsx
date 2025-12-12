import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

const Form = FormProvider;

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />;
};
FormField.displayName = 'FormField';

const FormItemContext = React.createContext<{ id: string } | undefined>(undefined);

const useFormItemContext = () => {
  const context = React.useContext(FormItemContext);
  if (!context) {
    throw new Error('Form compound components must be used within a FormField');
  }
  return context;
};

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div className={cn('space-y-2 text-right', className)} ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return <Slot ref={ref} id={formItemId} aria-invalid={!!error} {...props} />;
  },
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useFormField();

    return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} id={descriptionId} {...props} />;
  },
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, messageId } = useFormField();
    const body = children ?? error?.message;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} id={messageId} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

interface FormFieldContextValue {
  name: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('Form compound components must be used within a FormField');
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const labelId = itemContext?.id ? `${itemContext.id}-label` : undefined;
  const errorId = itemContext?.id ? `${itemContext.id}-error` : undefined;
  const descriptionId = itemContext?.id ? `${itemContext.id}-description` : undefined;

  return {
    id: itemContext?.id,
    name: fieldContext.name,
    formItemId: itemContext?.id,
    formDescriptionId: descriptionId,
    formMessageId: errorId,
    labelId,
    descriptionId,
    messageId: errorId,
    error: fieldState.error,
  };
};

const FormFieldWrapper = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  render,
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <FormField name={name} render={render} />
    </FormFieldContext.Provider>
  );
};
FormFieldWrapper.displayName = 'FormFieldWrapper';

export { Form, FormControl, FormDescription, FormFieldWrapper as FormField, FormItem, FormLabel, FormMessage, useFormField };
