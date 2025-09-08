import { useId } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./OrderForm.module.css";

interface OrderFormValues {
  username: string;
  email: string;
  delivery: string;
  restrictions: string[];
  deliveryTime: string;
  message: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  delivery: "pickup",
  restrictions: [],
  deliveryTime: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  delivery: Yup.string()
    .oneOf(["pickup", "courier", "drone"], "Invalid delivery method")
    .required("Delivery method is required"),
  restrictions: Yup.array().of(Yup.string()),
  deliveryTime: Yup.string().required("Select delivery time"),
  message: Yup.string()
    .min(5, "Message too short")
    .max(300, "Message too long"),
});

export default function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log("Form submitted:", values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>

          <label htmlFor={`${fieldId}-username`}>Name</label>
          <Field
            type="text"
            name="username"
            id={`${fieldId}-username`}
            className={css.input}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />

          <label htmlFor={`${fieldId}-email`}>Email</label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            className={css.input}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Delivery Method</legend>

          <label className={css.radioLabel}>
            <Field type="radio" name="delivery" value="pickup" />
            Pickup
          </label>
          <label className={css.radioLabel}>
            <Field type="radio" name="delivery" value="courier" />
            Courier
          </label>
          <label className={css.radioLabel}>
            <Field type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
          <ErrorMessage
            name="delivery"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Dietary Restrictions</legend>

          <label className={css.checkboxLabel}>
            <Field type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label className={css.checkboxLabel}>
            <Field type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label className={css.checkboxLabel}>
            <Field type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
        </fieldset>

        <label htmlFor={`${fieldId}-deliveryTime`}>
          Preferred delivery time
        </label>
        <Field
          as="select"
          name="deliveryTime"
          id={`${fieldId}-deliveryTime`}
          className={css.input}
        >
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </Field>
        <ErrorMessage
          name="deliveryTime"
          component="span"
          className={css.error}
        />

        <label htmlFor={`${fieldId}-message`}>Additional notes</label>
        <Field
          as="textarea"
          name="message"
          id={`${fieldId}-message`}
          rows={5}
          className={css.textarea}
        />
        <ErrorMessage name="message" component="span" className={css.error} />

        <button type="submit" className={css.button}>
          Place order
        </button>
      </Form>
    </Formik>
  );
}
