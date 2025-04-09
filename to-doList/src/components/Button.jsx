export default function Button ({children, ...props}) {
    return(
        <button 
            className="px-4 py-2 text-xl md:text-base rounded-md bg-white text-indigo-600 hover:bg-indigo-600 border-2 hover:text-white"
            {...props}
        >
            {children}
        </button>
    )
}