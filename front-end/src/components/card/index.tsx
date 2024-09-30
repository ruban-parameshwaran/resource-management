import { FC, ReactNode } from "react";

type CardProps = {
    children: ReactNode,
    classes?: any
}
const Card:FC<CardProps> = ({children, classes = ''}) => {
    return (
        <div className={classes + 'card border'}>
            {children}
        </div>
    )
}

export default Card;