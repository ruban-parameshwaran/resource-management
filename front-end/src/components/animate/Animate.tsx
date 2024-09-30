import { motion } from "framer-motion";
import { ReactNode } from "react";

interface animationProps {
    children: ReactNode,
    duration?: number
}

const Animate = ({ children, duration = 0.5 }: animationProps) => {
    return(
        <motion.div
            initial={{ y:-10, opacity: 0 }}
            animate={{ y:0 }}
            exit="out"
            transition={{ duration }}
            whileInView={{ opacity: 1 }}>
            {children}
        </motion.div>
    )
}

export default Animate;