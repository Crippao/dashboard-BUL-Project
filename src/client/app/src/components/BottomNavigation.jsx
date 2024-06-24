import { Button } from "antd";

const BottomNavigation = ({ menuItems }) => {

    return (
        <div className="fixed z-50 w-[95%] h-16 max-w-lg -translate-x-1/2 bg-[#04142c] border border-gray-200 rounded-3xl bottom-2 left-1/2 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
                {menuItems.map((i) => (
                    <div className="flex flex-col  items-center" key={i.key}>
                        <Button className="text-white mb-0!" type="text" icon={i.icon} title={i.label} onClick={i.onClick} />
                        <span className="text-white font-semibold">{i.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BottomNavigation;