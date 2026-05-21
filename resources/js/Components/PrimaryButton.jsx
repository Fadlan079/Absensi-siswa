export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-primary-light focus:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-primary-dark shadow-sm ${
                    disabled && 'opacity-50 pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
