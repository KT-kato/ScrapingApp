import { Spinner as RowSpinner } from "reactstrap";
import styles from "./Spinner.module.scss";
import { useSelector } from "../../slices/store";
import { selectSpinnerStatus } from "../../slices/spinnerSlices";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";

export const Spinner = () => {
  const { show } = useSelector(selectSpinnerStatus, shallowEqual);
  useEffect(() => {
    console.log("Spinner show: ", show);
  }, [show]);

  return (
    <>
      {show
        ? (
          <div className={styles.spinnerContainer}>
            <RowSpinner>
              Loading...
            </RowSpinner>
          </div>
        )
        : <></>}
    </>
  );
};
