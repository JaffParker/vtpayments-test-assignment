import React, { FC } from 'react'
import { useFormState } from 'informed'
import { Button, ButtonProps } from 'reactstrap'

interface SubmitButtonProps extends ButtonProps {
  submitting: boolean
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  disabled = false,
  submitting = false,
  children,
  ...props
}) => {
  const { pristine, invalid } = useFormState()

  return (
    <Button
      type="submit"
      color="success"
      disabled={pristine || invalid || submitting || disabled}
      className={submitting ? 'progress-bar-striped progress-bar-animated' : ''}
      {...props}
    >
      {children}
    </Button>
  )
}
