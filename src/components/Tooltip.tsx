export default function Tooltip({children, title}) {
    return (
        <div className="relative group cursor-pointer">
            {children}
            <div className="hidden group-hover:block absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="bg-dark-0 py-1 px-4 rounded-md whitespace-nowrap text-lg text-gray-300">
                    {title}
                </div>
            </div>
        </div>
    )
}