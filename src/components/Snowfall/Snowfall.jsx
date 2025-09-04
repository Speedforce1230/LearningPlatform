import { useCallback } from "react";
import styles from "./Snowfall.module.css";
import SnowfallCanvas from "./SnowfallCanvas";
function Snowfall() {
    return (
        <div className={`${styles["snowflake-container"]}`}>
            <SnowfallCanvas></SnowfallCanvas>
        </div>
    );
}
export default Snowfall;
