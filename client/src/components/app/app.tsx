import { FC } from "react";
import styles from "./app.module.css";
import { Route, Switch } from "react-router-dom";
import { MyHeader } from "../header/myheader";
import { MyFooter } from "../footer/myfooter";
import { HomePage } from "../../pages/home/home-page";
import ProtectedRoute from "../protected-route/protected-route";

const App: FC = () => {
    return (
        <div className={styles.app}>
            <MyHeader />
            <div className={styles.appContent}>
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <ProtectedRoute path='/customer' exact isRequiredAuthed>
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute
                        path='/customer/orders'
                        exact
                        isRequiredAuthed
                    >
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute path='/vendor' exact isRequiredAuthed>
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute
                        path='/vendor/orders'
                        exact
                        isRequiredAuthed
                    >
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute path='/vendor/pets' exact isRequiredAuthed>
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute
                        path='/vendor/petsCreation'
                        exact
                        isRequiredAuthed
                    >
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute path='/admin' exact isRequiredAuthed>
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute path='/register' exact>
                        <></>
                    </ProtectedRoute>
                    <ProtectedRoute path='/login' exact>
                        <></>
                    </ProtectedRoute>
                </Switch>
            </div>
            <MyFooter type='admin' />
        </div>
    );
};

export default App;
