const InputBox = ({ icon: Icon, className, ...props }) => {
    return (
        <div
            className={` ${className} font-semibold text-lg flex items-center gap-3 bg-white py-3 px-5 w-full rounded-full`}
        >
            {Icon && <Icon />}
            <input {...props} className={` outline-none`} />
        </div>
    );
};

export default InputBox;
