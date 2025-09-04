export const createStaggerVariant = (staggerChildren, delayChildren = 0) => ({
    initial: {},
    final: {
        transition: {
            staggerChildren: staggerChildren,
            delayChildren: delayChildren,
        },
    },
});
export const createFadeInVariantSpring = (damping = 10, stiffness = 300) => ({
    initial: { opacity: 0, y: 20 },
    final: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping,
            stiffness,
        },
    },
});
export const createEmptyVariant = () => ({
    initial: {},
    final: {},
});
export const createBarSlideVariant = (damping = 10, stiffness = 300) => ({
    initial: { x: 0 },
    final: {
        x: "150%",
        transition: { type: "spring", damping, stiffness },
        transitionEnd: { display: "none" },
    },
});
export const createFadeInYTransformVariant = (y = -10, duration = 0.3) => ({
    initial: { opacity: 0, y },
    final: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: "easeOut" },
    },
});
export const createFadeInXTransformVariant = (x = -10, duration = 0.3) => ({
    initial: { opacity: 0, x },
    final: {
        opacity: 1,
        x: 0,
        transition: { duration, ease: "easeOut" },
    },
});
export const createFadeInVariant = (duration = 0.3) => ({
    initial: { opacity: 0 },
    final: {
        opacity: 1,
        x: 0,
        transition: { duration, ease: "easeOut" },
    },
});
