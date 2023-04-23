import { useEffect } from "react";
import styles from "./modal.module.css";
import { FC } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modals") as HTMLElement;

interface IModalProps {
    onClose: () => void;
    children?: JSX.Element;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return createPortal(
        <div className={styles.wrapper} onClick={onClose}>
            <div
                className={styles.modalWrapper}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export { Modal };
