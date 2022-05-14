import { actions, kea, path, useActions, useValues } from 'kea'
import { Field, Form, forms } from 'kea-forms'

import type { loginLogicType } from './LoginFormType'

export const loginLogic = kea<loginLogicType>([
  path(['App', 'LoginForm', 'LoginForm']),
  forms({
    loginForm: {
      defaults: { user: '', pass: '' },
      errors: ({ user, pass }) => ({
        user: !user ? 'Please enter a user' : '',
        pass: !pass ? 'Please enter a password' : '',
      }),
      submit: async (values, breakpoint) => {
        await breakpoint(1000)
        console.log('submitting form', values)
      },
    },
  }),
])

export function LoginForm() {
  const {} = useActions(loginLogic)
  const { isLoginFormSubmitting } = useValues(loginLogic)
  return (
    <div>
      Login Form
      <Form logic={loginLogic} formKey="loginForm" enableFormOnSubmit>
        <Field name="user" label="Username">
          <input />
        </Field>
        <Field name="pass" label="Password">
          <input type="password" />
        </Field>
        <button type="submit" disabled={isLoginFormSubmitting}>
          Submit
        </button>
      </Form>
    </div>
  )
}
