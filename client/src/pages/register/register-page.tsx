import { FC } from "react";
import styles from "./register-page.module.css";
import { MyInput } from "../../components/ui/input/myinput";
import { MyButton } from "../../components/ui/button/mybutton";
import { Link } from "react-router-dom";
import { register } from "../../utils/user-api";
import { useFormik } from "formik";

const RegisterPage: FC = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            telephone: "",
            login: "",
            password: "",
        },
        onSubmit: (values) => {
            register(values);
        },
    });
    return (
        <form
            onSubmit={formik.submitForm}
            className={styles.RegisterPageContent}
        >
            <p>Регистрация</p>
            <div className={styles.inputsWrapper}>
                <MyInput
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Имя'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <MyInput
                    id='surname'
                    name='surname'
                    type='text'
                    placeholder='Фамилия'
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                />
                <MyInput
                    id='telephone'
                    name='telephone'
                    type='tel'
                    placeholder='Телефон'
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                />
                <MyInput
                    id='login'
                    name='login'
                    type='email'
                    placeholder='Логин'
                    value={formik.values.login}
                    onChange={formik.handleChange}
                />
                <MyInput
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </div>
            <div className={styles.buttonsWrapper}>
                <MyButton type='submit' skin='primary'>
                    Зарегистрироваться
                </MyButton>
                <Link className={styles.Link} to={"/login"}>
                    <MyButton skin='primary'>Назад</MyButton>
                </Link>
            </div>
        </form>
    );
};
export { RegisterPage };
