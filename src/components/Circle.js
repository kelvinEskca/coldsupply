const Circle = ({number,classNames}) => {
    return (
        <div className={`round  ${classNames}`}>
            <div className="inner">
                <h3 className="heading">{number}</h3>
            </div>
        </div>
    );
}
 
export default Circle;