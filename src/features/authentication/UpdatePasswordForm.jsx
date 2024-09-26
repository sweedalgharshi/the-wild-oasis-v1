import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function UpdatePasswordForm() {
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { errors } = formState;

  const { isUpdating, updateUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Passwords needs to be 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm Password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues().password === value || "Passwords needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" $variations="secondary" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update Password</Button>
      </FormRow>
    </Form>
  );
}
export default UpdatePasswordForm;
