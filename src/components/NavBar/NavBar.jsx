import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import getFontClasses from "../../utility/getFont";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { links } from "../../data/links/links";
import { createFadeInVariant } from "../../data/variants/variants";

function NavBar() {
    const [scrollDirectionY, setScrollDirectionY] = useState("up");
    const prevScrollY = useRef(window.scrollY);
    const font = getFontClasses("raleway");

    const linkVariants = createFadeInVariant();
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > prevScrollY.current) {
                setScrollDirectionY("down");
            } else if (currentScrollY < prevScrollY.current) {
                setScrollDirectionY("up");
            }
            prevScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollDirectionY]);
    return (
        <motion.nav
            className={styles.navbar}
            style={{ transition: "background-color 0.3s" }}
            initial={{ y: 0 }}
            animate={scrollDirectionY === "down" ? { y: "-100%" } : { y: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.5,
            }}
        >
            {links.map((element, index) => (
                <motion.div variants={linkVariants} key={index}>
                    <NavLink
                        to={element.to}
                        className={`${font} ${styles["text"]}`}
                        style={({ isActive }) => ({
                            color: isActive
                                ? "var(--default-dark-gray)"
                                : "var(--default-white)",
                        })}
                    >
                        {element.title}
                    </NavLink>
                </motion.div>
            ))}
        </motion.nav>
    );
}

export default NavBar;
