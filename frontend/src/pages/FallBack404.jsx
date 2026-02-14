import img from "../assets/png/404.png";

const FallBack404 = () => {
    return (
        <div className="mx-auto max-w-lg">
            <img src={img} alt="404 page not" />
        </div>
    );
};

export default FallBack404;
