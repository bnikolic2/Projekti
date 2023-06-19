import { useContext } from "react";
import ErrorAlertContext from "../contexts/ErrorAlertContext";


const useErrorAlert = () => {
    const errorAlert = useContext(ErrorAlertContext);
    return errorAlert;
};

export default useErrorAlert;