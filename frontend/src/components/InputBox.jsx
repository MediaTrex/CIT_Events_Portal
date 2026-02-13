const InputBox = ({ icon: Icon, className, ...props }) => {
    return (
        <div
            className={` ${className} font-semibold text-lg flex items-center gap-3 bg-white py-3 px-5 w-full rounded-full`}
        >
            {Icon && <Icon className="max-sm:h-5 max-sm:w-5" />}
            <input {...props} className={` outline-none w-full`} />
        </div>
    );
};

export default InputBox;
