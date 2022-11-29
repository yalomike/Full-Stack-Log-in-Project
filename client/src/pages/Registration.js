import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15),
    password: Yup.string().min(4).max(20),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
    navigate("/login");
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formArea gap-4 w-50 pt-5 pb-5">
          <label className="row text-white mb-2 ms-0">Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            type="username"
            id="inputCreatePost"
            name="username"
            placeholder="Ex. John123..."
          />
          <label className="row text-white ms-0 mt-4">Password:</label>

          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            id="passwordCreatePost"
            name="password"
            placeholder="Your Password..."
          />
          <button className="btn btn-primary mt-5 ms-5" type="submit">
            Register
          </button>
          <hr />

          <Link className="pt-3 text-primary h5 ps-3 ms-5" to="/">
            Home
          </Link>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
