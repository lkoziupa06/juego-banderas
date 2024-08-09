export const Boton = ({onClick, label, style}) =>{
    return <button className={style} onClick={onClick}>{label}</button>
}