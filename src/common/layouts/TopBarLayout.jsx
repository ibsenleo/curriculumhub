import { ToastContainer } from "react-toastify"
import { TopBar } from "../components/TopBar"

// import { SideBar } from "../../dashboard/components/SideBar"

export const TopBarLayout = ({children, className}) => {
    return (
        <>
            <ToastContainer />
            <div className="flex min-h-screen dark:bg-zinc-800 bg-zinc-200 ">
                {/* <SideBar></SideBar> */}
                <div className="flex flex-col flex-1">
                    <TopBar></TopBar>
                    
                    <main className={`flex-1 p-6 ${className || ''}`}>
                        {children}
                    </main>
                </div>
                    {/* <div className="grid grid-cols-4 gap-4 items-center justify-center min-h-screen ">
                        <div className="flex min-h-screen bg-gray-900 p-2">Menu</div>
                        <div className="col-span-3 bg-gray-700 min-h-screen p-2">{children}</div>
                        
                    </div> */}
            </div>
        </>
    )
}
