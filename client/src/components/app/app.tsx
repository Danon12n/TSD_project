import { FC } from "react";
import styles from "./app.module.css";
import { Route, Switch } from "react-router-dom";
import { MyHeader } from "../header/myheader";
import { MyFooter } from "../footer/myfooter";
import { HomePage } from "../../pages/home/home-page";

const App: FC = () => {

    return (
        <div className={styles.app}>
            <MyHeader />
            <div className={styles.appContent}>
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                </Switch>
            </div>
            <MyFooter type='admin' />
        </div>
    );
};

export default App;
