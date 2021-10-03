export const listVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
        stiffness: 100,
        staggerChildren: 0.15
      }
    },
    exit: {
        opacity: 0
    }
}

export const itemVariant = {
    hidden: { opacity: 0, x: -15 },
    show: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.15
        }
    },
    exit: {
        opacity: 0
    }
}