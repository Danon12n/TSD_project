import { FC } from "react";
import { MyInput } from "../../components/ui/input/myinput";
import { MyButton } from "../../components/ui/button/mybutton";
import styles from "./login-page.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../utils/user-api";
import { useFormik } from "formik";

const LoginPage: FC = () => {
    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
        },
        onSubmit: (values) => {
            auth(values);
        },
    });
    return (
        <form
            className={styles.LoginPageContent}
            onSubmit={formik.handleSubmit}
        >
            <p>Авторизация</p>
            <MyInput
                id='login'
                name='login'
                type='text'
                placeholder='Логин'
                onChange={formik.handleChange}
                value={formik.values.login}
            />
            <MyInput
                id='password'
                name='password'
                type='password'
                placeholder='Пароль'
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <div className={styles.buttonsWrapper}>
                <MyButton type='submit' skin='primary'>
                    Вход
                </MyButton>
                <Link className={styles.Link} to={"/register"}>
                    <MyButton skin='primary'>Регистрация</MyButton>
                </Link>
            </div>
        </form>
    );
};
export { LoginPage };
