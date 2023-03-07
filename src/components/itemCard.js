
const Item = ({image,desc,title,price}) => {
    return (
        <div className="box">
            <div className="image-box">
                <img src={image} alt={desc} />
            </div>

            <div className="price-box">
                <p className="paragraph">{title} -----</p>
                <h3 className="heading">{price}</h3>
            </div>
        </div>
    );
}
 
export default Item;